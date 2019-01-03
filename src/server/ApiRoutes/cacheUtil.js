import appConfig from '../../../appConfig';
import kms from '../../app/utils/kms-helper';
import ClientWrapper from './clientWrapper';

const {
  redisHosts,
} = appConfig;

/**
 Takes a list of params and returns a string which will be used as a key
 in the caching client.
 @param {array} params
 */

const getKeyFromParams = params => params.map(x => JSON.stringify(x)).join('');

/**
 checkForKeyInRedis(client)
 Takes a caching client (e.g. redis). Returns a function which takes a key and
 returns a promise that either resolves to the stored value for that key, or null
 if there is no stored value.

 @param {object} client
 @param {string} key
 */

const checkForKeyInRedis = client => key => new Promise(resolve => client
  .get(key, (err, cachedResponse) => resolve(cachedResponse)));

/**
 getDataAndSetKeyInClient(dataFunction, client)
 Takes a dataFunction, which fetches new data (e.g. a function which calls axios)
 and a caching client (e.g. redis). Returns a function which takes some params
 and a key, fetches the corresponding data for those params, and caches that
 data under the given key

 @param {function} dataFunction
 @param {object} client
 @param {array} params
 @param {string} key
 */

const getDataAndSetKeyInClient = (dataFunction, client) => (params, key) => dataFunction(...params)
  .then((response) => {
    const stringifiedResponse = JSON.stringify(response);
    // Note that this is asynchronous, but shouldn't matter in this simplest case
    client.set(key, stringifiedResponse, 'EX', 3600);
    return stringifiedResponse;
  });

/**
 useCachedOrGetData(dataFunction, client)
 Takes a dataFunction, which fetches new data (e.g. a function which calls axios)
 and a caching client (e.g. redis). Returns a function which takes params, checks
 to see if those params are cached, and then either returns the cached value or gets
 a new value for those params if none is cached

 @param {function} dataFunction
 @param {object} client
 @param {array} params
 */

const useCachedOrGetData = (dataFunction, client) => (params) => {
  const key = getKeyFromParams(params);
  return checkForKeyInRedis(client)(key)
    .then(
      redisResponse => (redisResponse === null
        ? getDataAndSetKeyInClient(dataFunction, client)(params, key)
        : redisResponse),
    );
};

/**
 addCaching(dataFunction, useClient, customClient)
 Returns a promise which will resolve to a function that wraps the given
 datafunction. The wrapper will call useCachedOrGetData with the given datafunction
 and to ensure the value is cached, and then return the value.
 addCaching will also generate the dataclient if a custom client is not given and
 useClient is not set to false.

 @param {function} datafunction
 @param {boolean} useClient
 @param {object} customClient
 */

const addCaching = (dataFunction, useClient = true, customClient = null) => {
  if (!useClient) {
    return dataFunction;
  }

  kms.setProfile();

  return (process.env.APP_ENV
    ? kms.decrypt(redisHosts[process.env.APP_ENV])
      .then(data => new ClientWrapper(data))
    : Promise.resolve(new ClientWrapper()))
    .then((clientWrapper) => {
      const client = customClient || clientWrapper;
      return (...params) => useCachedOrGetData(dataFunction, client)(params)
        .then(stringifiedData => JSON.parse(stringifiedData));
    });
};

export default {
  addCaching, getDataAndSetKeyInClient, useCachedOrGetData, checkForKeyInRedis, getKeyFromParams,
};
