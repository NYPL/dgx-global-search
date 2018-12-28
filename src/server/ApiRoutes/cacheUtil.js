import redis from 'redis';

const getKeyFromParams = params => params.map(x => JSON.stringify(x)).join('');

const checkForKeyInRedis = client => key => new Promise(resolve => client
  .get(key, (err, cachedResponse) => resolve(cachedResponse)));

const getDataAndSetKeyInClient = (dataFunction, client) => (params, key) => dataFunction(...params)
  .then((response) => {
    const stringifiedResponse = JSON.stringify(response);
    // Note that this is asynchronous, but shouldn't matter in this simplest case
    client.set(key, stringifiedResponse, 'EX', 3600);
    return stringifiedResponse;
  });

const useCachedOrGetData = (dataFunction, client) => (params) => {
  const key = getKeyFromParams(params);
  return checkForKeyInRedis(client)(key)
    .then(
      redisResponse => (redisResponse === null
        ? getDataAndSetKeyInClient(dataFunction, client)(params, key)
        : redisResponse),
    );
};


const addCaching = (dataFunction, useClient = true, customClient = null) => {
  if (!useClient) {
    return dataFunction;
  }

  const client = customClient || redis.createClient();

  return (...params) => useCachedOrGetData(dataFunction, client)(params)
    .then(stringifiedData => JSON.parse(stringifiedData));
};

export default {
  addCaching, getDataAndSetKeyInClient, useCachedOrGetData, checkForKeyInRedis, getKeyFromParams,
};
