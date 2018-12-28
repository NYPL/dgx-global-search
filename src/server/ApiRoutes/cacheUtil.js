import redis from 'redis';

const client = redis.createClient();

const getKeyFromParams = params => params.map(x => JSON.stringify(x)).join('');

const checkForKeyInRedis = key => new Promise(resolve => {
  client.get(key, (err, cachedResponse) => resolve(cachedResponse));
});

const useCachedOrGetData = (dataFunction, params) => {
  const key = getKeyFromParams(params);
  return checkForKeyInRedis(key)
    .then(
      redisResponse => (redisResponse === null ? getDataAndSetClientKey(dataFunction, params, key) : redisResponse)
    );
};

const getDataAndSetClientKey = (dataFunction, params, key) => dataFunction(...params)
  .then(response => {
    console.log('here', params);
    const stringifiedResponse = JSON.stringify(response);
    // Note that this is asynchronous, but shouldn't matter in this simplest case
    client.set(key, stringifiedResponse, 'EX', 3600);
    return stringifiedResponse;
  });

export default (dataFunction, useClient) => {

  if (!useClient) {
    return dataFunction;
  }

  return (...params) => useCachedOrGetData(dataFunction, params)
    .then(stringifiedData => JSON.parse(stringifiedData));
};
