import redis from 'redis';

export default (dataFunction, skipCaching) => {
  if (skipCaching) {
    return dataFunction;
  }

  const client = redis.createClient();

  const redisClientWithPromise = key => new Promise((resolve) => {
    client.get(key, (err, cachedResponse) => resolve(cachedResponse));
  });

  const getDataAndSetClientKey = url => dataFunction(url).then((apiResponse) => {
    const stringifiedResponse = JSON.stringify(apiResponse);
    client.set(url, stringifiedResponse, 'EX', 3600);
    return stringifiedResponse;
  });

  const useCachedOrGetData = url => redisClientWithPromise(url)
    .then(redisResponse => (redisResponse === null ? getDataAndSetClientKey(url) : redisResponse));

  return url => useCachedOrGetData(url)
    .then(stringifiedSearchData => JSON.parse(stringifiedSearchData));
};
