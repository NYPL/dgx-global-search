import sinon from 'sinon';
import cacheUtil from '../src/server/ApiRoutes/cacheUtil';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const {
  expect,
} = chai;

describe('cacheUtil', () => {
  let calledWith;
  let values;
  let mockClient;
  let checkForKeyInRedis;
  let getDataAndSetKeyInClient;
  let useCachedOrGetData;
  let getSearchData;
  let cache;

  beforeEach(() => {
    calledWith = [];

    function mockDataFunction(url) {
      calledWith.push(url);
      console.log(url);
      let resolveTo;
      switch (url) {
        case 'elephant':
          resolveTo = { loxodonta: 'africana' };
          break;
        case 'turtle':
          resolveTo = { terrapene: 'carolina' };
          break;
        default:
          resolveTo = '';
      }
      // console.log(resolveTo);
      return Promise.resolve(resolveTo);
    }

    values = {};

    mockClient = {
      get: (key, cb) => {
        const value = values[key] || null;
        cb(null, value);
        return !!value;
      },
      set: (key, value) => {
        values[key] = value;
      },
    };

    cache = cacheUtil(mockDataFunction, false, mockClient);
    checkForKeyInRedis = cache.checkForKeyInRedis;
    // cache.checkForKeyInRedis = key => {
    //   console.log(key);
    //   return checkForKeyInRedis(key).then(res => console.log(res))
    // }
    getDataAndSetKeyInClient = cache.getDataAndSetKeyInClient;
    useCachedOrGetData = cache.useCachedOrGetData;
    getSearchData = cache.getSearchData;
  });

  describe('checkForKeyInRedis', () => {
    it('should resolve to a value that has been set', () => {
      mockClient.set('hello', 'world');
      return expect(checkForKeyInRedis('hello')).to.eventually.equal('world');
    });

    it('should resolve to null for a value that has not been set', () => {
      return expect(checkForKeyInRedis('goodbye')).to.eventually.equal(null);
    });
  });

  describe('getDataAndSetKeyInClient', () => {
    it('should return a stringified version of the response', () => {
      return expect(getDataAndSetKeyInClient('elephant')).to.eventually.equal('{"loxodonta":"africana"}');
    });

    it('should assign the stringified response to the key of the url', () => {
      return expect(getDataAndSetKeyInClient('elephant')
        .then(() => values.elephant))
        .to
        .eventually
        .equal('{"loxodonta":"africana"}');
    });
  });

  describe('useCachedOrGetData', () => {
    it('should call the data function for a new key', () => {
      return expect(useCachedOrGetData('elephant')
        .then(() => calledWith.includes('elephant')))
        .to
        .eventually
        .equal(true);
    });

    it('should return the correct value for a new key', () => {
      return expect(useCachedOrGetData('elephant'))
        .to
        .eventually
        .equal('{"loxodonta":"africana"}');
    })

    it.only('should not call the data function for an old key', () => {
      return expect(useCachedOrGetData('elephant')
        // .then(() => cache.checkForKeyInRedis('elephant'))
        // .then((response) => {
        //   console.log(112, response);
        //   return response === null
        //     ? cache.getDataAndSetKeyInClient('elephant')
        //     : response
        // }))
        .then(useCachedOrGetData('elephant'))
        .then(() => calledWith.length === 2))
        .to
        .eventually
        .equal(false);
    });

    it('should return the correct value for an old key', () => {
      return expect(useCachedOrGetData('elephant')
        .then(useCachedOrGetData('elephant')))
        .to
        .eventually
        .equal('{"loxodonta":"africana"}');
    });
  });
});
