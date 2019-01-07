import chai from 'chai';
import cacheMethods from '../src/server/ApiRoutes/cacheUtil';

const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const {
  expect,
} = chai;

describe('cacheUtil', () => {
  let calledWith;
  let mockClient;
  let mockDataFunction;
  let checkForKeyInRedis;
  let getDataAndSetKeyInClient;
  let useCachedOrGetData;
  let addCaching;
  let getSearchData;
  let getKeyFromParams;

  function MockClient() {
    this.values = {};
    this.get = (key, cb) => {
      const value = this.values[key] || null;
      cb(null, value);
      return !!value;
    };
    this.set = (key, value) => {
      this.values[key] = value;
    };
  }

  beforeEach(() => {
    calledWith = [];
    mockDataFunction = (url) => {
      calledWith.push(url);
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


    mockClient = new MockClient();

    checkForKeyInRedis = cacheMethods.checkForKeyInRedis(mockClient);
    getDataAndSetKeyInClient = cacheMethods.getDataAndSetKeyInClient(mockDataFunction, mockClient);
    useCachedOrGetData = cacheMethods.useCachedOrGetData(mockDataFunction, mockClient);
    addCaching = cacheMethods.addCaching;
    addCaching(mockDataFunction, true, mockClient)
      .then((cacheAdded) => {
        getSearchData = cacheAdded;
      });
    getKeyFromParams = cacheMethods.getKeyFromParams;
  });

  describe('checkForKeyInRedis', () => {
    it('should resolve to a value that has been set', () => {
      mockClient.set('hello', 'world');
      return expect(checkForKeyInRedis('hello'))
        .to
        .eventually
        .equal('world');
    });

    it('should resolve to null for a value that has not been set', () => {
      return expect(checkForKeyInRedis('goodbye'))
        .to
        .eventually
        .equal(null);
    });
  });

  describe('getDataAndSetKeyInClient', () => {
    it('should return a stringified version of the response', () => {
      const params = ['elephant'];
      const key = getKeyFromParams(params);
      return expect(getDataAndSetKeyInClient(params, key))
        .to
        .eventually
        .equal('{"loxodonta":"africana"}');
    });

    it('should assign the stringified response to the key of the url', () => {
      const params = ['elephant'];
      const key = getKeyFromParams(params);
      return expect(getDataAndSetKeyInClient(params, key)
        .then(() => mockClient.values[key]))
        .to
        .eventually
        .equal('{"loxodonta":"africana"}');
    });
  });

  describe('useCachedOrGetData', () => {
    it('should call the data function for a new key', () => {
      return expect(useCachedOrGetData(['elephant'])
        .then(() => calledWith.length === 1))
        .to
        .eventually
        .equal(true);
    });

    it('should return the correct value for a new key', () => {
      return expect(useCachedOrGetData(['elephant']))
        .to
        .eventually
        .equal('{"loxodonta":"africana"}');
    })

    it('should not call the data function for an old key', () => {
      return expect(useCachedOrGetData(['elephant'])
        .then(() => useCachedOrGetData(['elephant']))
        .then(() => calledWith.length === 1))
        .to
        .eventually
        .equal(true);
    });

    it('should return the correct value for an old key', () => {
      return expect(useCachedOrGetData(['elephant'])
        .then(() => useCachedOrGetData(['elephant'])))
        .to
        .eventually
        .equal('{"loxodonta":"africana"}');
    });
  });

  describe('addCaching', () => {
    it('should return a promise resolving to the dataFunction if useClient is false', () => {
      return addCaching(mockDataFunction, false, mockClient)
        .then((datafunction) => {
          expect(datafunction)
            .to
            .equal(mockDataFunction);
        });
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
