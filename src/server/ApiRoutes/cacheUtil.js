import redis from 'redis';

export default (dataFunction, skipCaching) => {
  if (skipCaching) {
    return dataFunction;
  }

  const client = redis.createClient();

  // This wraps the redis client's get method in a promise, so we can avoid
  // nested callbacks
  const checkForKeyInClient = key => new Promise((resolve) => {
    client.get(key, (err, cachedValue) => resolve(cachedValue));
  });

  const getDataAndSetKeyInClient = url => dataFunction(url).then((apiResponse) => {
    const stringifiedResponse = JSON.stringify(apiResponse);
    client.set(url, stringifiedResponse, 'EX', 3600);
    return stringifiedResponse;
  });

  const useCachedOrGetData = url => checkForKeyInClient(url)
    .then(redisResponse => (redisResponse === null ? getDataAndSetKeyInClient(url) : redisResponse));

  return url => useCachedOrGetData(url)
    .then(stringifiedSearchData => JSON.parse(stringifiedSearchData));
};
