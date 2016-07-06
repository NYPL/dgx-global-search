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

export { createAppHistory };
