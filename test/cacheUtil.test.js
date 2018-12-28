import sinon from 'sinon';
import cacheUtil from '../src/server/ApiRoutes/cacheUtil';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const {
  expect,
} = chai;

describe('cacheUtil', () => {
  let values;
  let mockClient;
  let checkForKeyInRedis;
  let getDataAndSetKeyInClient;
  let useCachedOrGetData;
  let getSearchData;
  let cache;
  let mockDataFunction;

  beforeEach(() => {
    mockDataFunction = (url) => {
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
      const spy = sinon.spy(cache, 'getDataAndSetKeyInClient');
      return expect(useCachedOrGetData('elephant')
        .then(() => spy.called))
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

    it('should not call the data function for an old key', () => {
      const spy = sinon.spy(cache, 'getDataAndSetKeyInClient');
      return expect(useCachedOrGetData('elephant')
        .then(() => useCachedOrGetData('elephant'))
        .then(() => spy.calledOnce))
        .to
        .eventually
        .equal(true);
    });

    it('should return the correct value for an old key', () => {
      return expect(useCachedOrGetData('elephant')
        .then(useCachedOrGetData('elephant')))
        .to
        .eventually
        .equal('{"loxodonta":"africana"}');
    });
  });

  describe('getSearchData', () => {
    it('should return the correct object', () => {
      return expect(getSearchData('elephant'))
        .to
        .eventually
        .deep
        .equal({ loxodonta: 'africana' });
    });
  });
});
