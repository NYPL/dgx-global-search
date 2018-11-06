import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

import {
  fetchResultLength,
  fetchResultItems,
  fetchSearchFacetsList,
} from '../../app/utils/SearchModel.js';

import appConfig from '../../../appConfig.js';

// Syntax that both ES6 and Babel 6 support
const { api, searchApi } = appConfig;

const router = express.Router();
const appEnvironment = process.env.APP_ENV || 'production';
const apiRoot = api.root[appEnvironment];

const createOptions = (apiValue) => ({
  endpoint: `${apiRoot}${apiValue.endpoint}`,
  includes: apiValue.includes,
  filters: apiValue.filters,
});

const searchOptions = createOptions(searchApi);
const getSearchData = (url) => axios.get(url);

const requestSearchResult = (req, res, next) => {
  const searchFilter = (req.params.searchFilter) ? ` more:${req.params.searchFilter}` : '';
  const searchRequest = `${req.params.searchKeyword}${searchFilter}`;
  searchOptions.filters = {
    q: searchRequest,
    start: 0,
  };
  const searchApiUrl = parser.getCompleteApi(searchOptions);
  const queriesForGA = {
    searchedFrom: req.query.searched_from || '',
    timestamp: req.query.timestamp || '',
  };

  getSearchData(searchApiUrl)
    .then((searchData) => {
      const searchParsed = parser.parse(searchData.data, searchOptions);

      res.locals.data = {
        SearchStore: {
          searchKeyword: req.params.searchKeyword,
          searchData: fetchResultItems(searchParsed, searchRequest),
          searchDataLength: fetchResultLength(searchParsed),
          isKeywordValid: true,
          selectedFacet: req.params.searchFilter,
          resultsStart: 0,
          searchFacets: fetchSearchFacetsList(),
          queriesForGA,
        },
        completeApiUrl: searchApiUrl,
      };

      next();
    })
    .catch(error => {
      console.log(`error calling API : ${error}`);
      console.log(`from the endpoint: ${searchApiUrl}`);
      console.log(`search keyword is ${searchOptions.filters.q}`);

      res.locals.data = {
        SearchStore: {
          searchKeyword: '',
          searchData: [],
          searchDataLength: 0,
          searchFacets: fetchSearchFacetsList(),
          queriesForGA,
        },
      };

      next();
    });
};

const requestResultsFromClient = (req, res) => {
  searchOptions.filters = {
    q: req.params.searchRequest,
    start: req.query.start || '0',
  };
  const searchApiUrl = parser.getCompleteApi(searchOptions);

  if (!req.query.start) {
    res.json({});
    return;
  }

  getSearchData(searchApiUrl)
    .then((searchData) => {
      const searchParsed = parser.parse(searchData.data, searchOptions);
      const searchModeled = {
        searchResultsItems: fetchResultItems(searchParsed, req.params.searchRequest),
        resultLength: fetchResultLength(searchParsed),
      };

      res.json(searchModeled);
    })
    .catch(error => {
      console.log(`error calling API : ${error}`);
      console.log(`from the endpoint: ${searchApiUrl}`);
      console.log(`search keyword is ${searchOptions.filters.q}`);
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
  .route('/:searchKeyword/:searchFilter?')
  .get(requestSearchResult);

// The route here is for local development
router
  .route('/search/:searchKeyword/:searchFilter?')
  .get(requestSearchResult);

// For reverse proxy client side API call
router
  .route('/request/api/:searchRequest/')
  .get(requestResultsFromClient);

router
  .route('/search/request/api/:searchRequest/')
  .get(requestResultsFromClient);

export default router;
