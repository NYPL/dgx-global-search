import {
  createHistory,
  useQueries,
  createMemoryHistory,
} from 'history';

const createAppHistory = () => {
  if (typeof(window) !== 'undefined') {
    return useQueries(createHistory)();
  }

  return useQueries(createMemoryHistory)();
};

const manageHistory = (opts = {}, history, reset = false) => {
  const {
    filters,
    availabilityType,
    publicationType,
    pageNum,
  } = opts;
  let query = '?';

  if (!reset) {
    _mapObject(filters, (val, key) => {
      if (val) {
        query += `&${key}=${val}`;
      }
    });

    if (availabilityType === 'On Order' && query.indexOf('availability') !== -1) {
      query += '&availability=On%20Order';
    }

    if (publicationType === 'anyYear') {
      query += '&publishYear=anyYear';
    }
    if (parseInt(pageNum, 10) !== 1) {
      query += `&pageNum=${pageNum}`;
    }
  }

  if (availabilityType === 'On Order') {
    query += '&availability=On%20Order';
  }

  query = (query === '?') ? '' : query;

  history.push({
    search: query,
    state: { newArrivals: true }
  });
};

export { createAppHistory, manageHistory };