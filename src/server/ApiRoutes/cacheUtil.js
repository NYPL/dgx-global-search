import redis from 'redis';

export default (dataFunction, skipCaching, customClient = null) => {
  if (skipCaching) {
    return {
      getSearchData: dataFunction,
    };
  }

  const client = customClient || redis.createClient();

  const cacheUtil = {};

  // This wraps the redis client's get method in a promise, so we can avoid
  // nested callbacks
  cacheUtil.checkForKeyInRedis = key => new Promise((resolve) => {
    client.get(key, (err, cachedValue) => resolve(cachedValue));
  });

  cacheUtil.getDataAndSetKeyInClient = url => dataFunction(url).then((apiResponse) => {
    const stringifiedResponse = JSON.stringify(apiResponse);
    client.set(url, stringifiedResponse, 'EX', 3600);
    return stringifiedResponse;
  });

  cacheUtil.useCachedOrGetData = url => cacheUtil.checkForKeyInRedis(url)
    .then(redisResponse => (redisResponse === null
      ? cacheUtil.getDataAndSetKeyInClient(url)
      : redisResponse));

  cacheUtil.getSearchData = url => cacheUtil.useCachedOrGetData(url)
    .then(stringifiedSearchData => JSON.parse(stringifiedSearchData));

  return cacheUtil;
};
