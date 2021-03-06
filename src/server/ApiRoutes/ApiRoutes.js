import express from 'express';
import axios from 'axios';
import cache from './cacheUtil';
import logger from '../../../logger';

import {
  fetchResultLength,
  fetchResultItems,
  fetchSearchFacetsList,
} from '../../app/utils/SearchModel';

const router = express.Router();
const { addCaching } = cache;
let getSearchData;
addCaching((url) => axios.get(url), !process.env.SKIP_CACHING, null, process.env.APP_ENV)
  .then((cacheAdded) => {
    getSearchData = cacheAdded;
  })
  .catch((error) => {
    logger.error('error adding caching with: ', 'SKIP_CACHING: ', process.env.SKIP_CACHING, 'APP_ENV: ', process.env.APP_ENV);
    logger.error('addCaching error: ', JSON.stringify(error, null, 2));
    getSearchData = (url) => axios.get(url);
  });

const generateQueryString = (req) => {
  const searchFilter = (req.params.searchFilter) ? ` more:${req.params.searchFilter}` : '';
  return req.params.searchRequest + searchFilter;
};

const generateApiQueries = (req) => {
  const start = req.query.start && req.query.start !== '0' ? `&start=${req.query.start}` : '';
  const queryString = generateQueryString(req);

  return `&q=${queryString}${start}`;
};

const requestSearchResult = (req, res, next) => {
  const queriesForGA = {
    searchedFrom: req.query.searched_from || '',
    timestamp: req.query.timestamp || '',
  };

  const searchApiUrl = `${req.app.locals.apiRoot}${generateApiQueries(req)}`;

  getSearchData(searchApiUrl)
    .then((searchData) => {
      const { data } = searchData;
      res.locals.data = {
        SearchStore: {
          searchKeyword: req.params.searchRequest,
          searchData: fetchResultItems(data, generateQueryString(req)),
          searchDataLength: fetchResultLength(data),
          isKeywordValid: true,
          selectedFacet: req.params.searchFilter,
          resultsStart: 0,
          searchFacets: fetchSearchFacetsList(),
          queriesForGA,
        },
      };

      next();
    })
    .catch((error) => {
      logger.error(`error calling API from server : ${JSON.stringify(error, null, 2)}`);
      logger.error(`from the endpoint: ${searchApiUrl}`);

      res.locals.data = {
        SearchStore: {
          searchRequest: '',
          searchData: [],
          searchDataLength: '0',
          searchFacets: fetchSearchFacetsList(),
          queriesForGA,
        },
      };

      next();
    });
};

const requestResultsFromClient = (req, res) => {
  if (!req.query.start) {
    res.json({});
    return;
  }

  const searchApiUrl = `${req.app.locals.apiRoot}${generateApiQueries(req)}`;

  getSearchData(searchApiUrl)
    .then((searchData) => {
      const { data } = searchData;
      const searchModeled = {
        searchResultsItems: fetchResultItems(data, req.params.searchRequest),
        resultLength: fetchResultLength(data),
      };

      res.json(searchModeled);
    })
    .catch((error) => {
      logger.error(`error calling API from client : ${JSON.stringify(error, null, 2)}`);
      logger.error(`from the endpoint: ${searchApiUrl}`);
    });
};

const requestNoResultApp = (req, res, next) => {
  next();
};

router
  .route('/')
  .get(requestNoResultApp);

router
  .route('/search')
  .get(requestNoResultApp);

// For reverse proxy URLs
router
  .route('/:searchRequest/:searchFilter?')
  .get(requestSearchResult);

// The route here is for local development
router
  .route('/search/:searchRequest/:searchFilter?')
  .get(requestSearchResult);

// For reverse proxy client side API call
router
  .route('/request/api/:searchRequest/')
  .get(requestResultsFromClient);

router
  .route('/search/request/api/:searchRequest/')
  .get(requestResultsFromClient);

export default router;
