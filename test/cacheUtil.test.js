import sinon from 'sinon';
import cacheUtil from '../src/server/ApiRoutes/cacheUtil';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const {
  expect,
} = chai;

describe('cacheUtil', () => {

  const mockDataFunction = (url) => {
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
    console.log(resolveTo);
    return Promise.resolve(resolveTo);
  };

  const values = {};

  const mockClient = {
    get: (key, cb) => {
      const value = values[key] || null;
      cb(null, value);
      return !!value;
    },
    set: (key, value) => {
      values[key] = value;
    },
  };

  const {
    checkForKeyInRedis,
    getDataAndSetKeyInClient,
    useCachedOrGetData,
    getSearchData,
  } = cacheUtil(mockDataFunction, false, mockClient);

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
      expect(values.elephant).to.equal('{"loxodonta":"africana"}');
    });
  });

  describe('useCachedOrGetData', () => {
    const spy = sinon.spy(mockDataFunction);
    it('should not call the data function for an old key', () => {
      return expect(useCachedOrGetData('elephant')
        .then(() => spy.calledWith('elephant')))
        .to
        .eventually
        .equal(false);
    });

    it('should call the data function for a new key', () => {
      return expect(useCachedOrGetData('turtle')
        .then(() => spy.calledWith('turtle')))
        .to
        .eventually
        .equal(true);
    });
  });


});
