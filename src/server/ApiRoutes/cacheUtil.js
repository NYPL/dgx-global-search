import appConfig from '../../../appConfig';
import kms from '../../app/utils/kms-helper';
import ClientWrapper from './clientWrapper';

const { redisHosts } = appConfig;

/**
 Takes a list of params and returns a string which will be used as a key
 in the caching client.
 @param {array} params
 */

const getKeyFromParams = (params) => params.map((x) => JSON.stringify(x)).join(',');

/**
 * checkForKeyInRedis(client)
 * Takes a caching client (e.g. redis). Returns a function which takes a key and
 * returns a promise that either resolves to the stored value for that key, or null
 * if there is no stored value.
 *
 * @param {object} client
 */
const checkForKeyInRedis = (client) => (key) => new Promise((resolve) => client
  .get(key, (err, cachedResponse) => resolve(cachedResponse)));

/**
 * getDataAndSetKeyInClient(dataFunction, client)
 * Takes a dataFunction, which fetches new data (e.g. a function which calls axios)
 * and a caching client (e.g. redis). Returns a function which takes some params
 * and a key, fetches the corresponding data for those params, and caches that
 * data under the given key
 *
 * @param {function} dataFunction
 * @param {object} client
 */
const getDataAndSetKeyInClient = (dataFunction, client) => (params, key) => dataFunction(...params)
  .then((response) => {
    // Remove the 'request' object from the response added by axios. The included
    // request object can cause circular reference errors.
    delete response.request;
    const stringifiedResponse = JSON.stringify(response);
    // Note that this is asynchronous, but shouldn't matter in this simplest case
    client.set(key, stringifiedResponse, 'EX', 3600);
    return stringifiedResponse;
  });

/**
 * useCachedOrGetData(dataFunction, client)
 * Takes a dataFunction, which fetches new data (e.g. a function which calls axios)
 * and a caching client (e.g. redis). Returns a function which takes params, checks
 * to see if those params are cached, and then either returns the cached value or gets
 * a new value for those params if none is cached
 *
 * @param {function} dataFunction
 * @param {object} client
 */

const useCachedOrGetData = (dataFunction, client) => (params) => {
  const key = getKeyFromParams(params);
  return checkForKeyInRedis(client)(key)
    .then(
      (redisResponse) => (redisResponse === null
        ? getDataAndSetKeyInClient(dataFunction, client)(params, key)
        : redisResponse),
    );
};

/**
 * generateClient(customClient, appEnv, region)
 * If not customClient is provided, returns a ClientWrapper instance pointing
 * to the redis server specified in appConfig, or else pointing to a default
 * server if none is specified. appEnv and region are used for decrypting the
 * endpoint of the redis client.
 * @param {object} customClient
 * @param {string} appEnv
 * @param {string} region
 */
const generateClient = (customClient = null, appEnv = null, region = 'us-east-1') => {
  if (customClient) {
    return Promise.resolve(customClient);
  }
  return appEnv
    ? kms.decrypt(redisHosts[appEnv], null, region)
      .then((data) => new ClientWrapper(data))
      .catch((error) => {
        console.log(
          'error decrypting redis host with: ',
          'redisHosts: ', JSON.stringify(redisHosts, null, 2),
          'appEnv: ', appEnv,
          'region: ', region,
        );
        console.log('generateCLient decryption error: ', JSON.stringify(error, null, 2));
        return new ClientWrapper();
      })
    : Promise.resolve(new ClientWrapper());
};

/**
 * addCaching(dataFunction, useClient, customClient, appEnv, region)
 * Returns a promise which will resolve to a function that wraps the given
 * datafunction. The wrapper will call useCachedOrGetData with the given datafunction
 * and to ensure the value is cached, and then return the value.
 * addCaching will also generate the dataclient if a custom client is not given and
 * useClient is not set to false. appEnv and region are passed to generateClient.
 *
 * @param {function} dataFunction
 * @param {boolean} useClient - Controls whether or not to use caching
 *                              (in practice, set to !process.env.USE_CACHING)
 * @param {object} customClient
 * @param {string} appEnv
 * @param {string} region
 */
const addCaching = (dataFunction, useClient = true, customClient = null, appEnv, region = 'us-east-1') => {
  if (!useClient) {
    return Promise.resolve(dataFunction);
  }

  return generateClient(customClient, appEnv, region)
    .then((client) => (...params) => useCachedOrGetData(dataFunction, client)(params)
      .then((stringifiedData) => JSON.parse(stringifiedData)));
};

export default {
  addCaching, getDataAndSetKeyInClient, useCachedOrGetData, checkForKeyInRedis, getKeyFromParams,
};
