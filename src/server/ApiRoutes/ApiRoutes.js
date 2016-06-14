import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import { extend as _extend } from 'underscore';

import Model from 'dgx-model-data';
import {
  fetchResultLength,
  fetchResultItems,
  fetchSearchKeyword,
  fetchSearchFacets,
} from '../../app/utils/SearchModel.js';

import appConfig from '../../../appConfig.js';

// Syntax that both ES6 and Babel 6 support
const { HeaderItemModel } = Model;
const { api, searchApi, headerApi } = appConfig;

const router = express.Router();
const appEnvironment = process.env.APP_ENV || 'production';
const apiRoot = api.root[appEnvironment];

const createOptions = (apiValue) => ({
  endpoint: `${apiRoot}${apiValue.endpoint}`,
  includes: apiValue.includes,
  filters: apiValue.filters,
});

const headerOptions = createOptions(headerApi);
const searchOptions = createOptions(searchApi);
const headerApiUrl = parser.getCompleteApi(headerOptions);

const fetchApiData = (url) => axios.get(url);

const getHeaderData = () => fetchApiData(headerApiUrl);
const getSearchData = (url) => fetchApiData(url);

const requestSearchResult = (req, res, next) => {
  const searchFilter = (req.params.searchFilter) ? ` more:${req.params.searchFilter}` : '';
  const searchRequest = `${req.params.searchKeyword}${searchFilter}`;
  searchOptions.filters = {
    q: searchRequest,
    start: 0,
  };
  const searchApiUrl = parser.getCompleteApi(searchOptions);

  axios.all([getSearchData(searchApiUrl), getHeaderData()])
    .then(axios.spread((searchData, headerData) => {
      const searchParsed = parser.parse(searchData.data, searchOptions);
      const headerParsed = parser.parse(headerData.data, headerOptions);
      const headerModelData = HeaderItemModel.build(headerParsed);

      res.locals.data = {
        HeaderStore: {
          headerData: headerModelData,
        },
        SearchStore: {
          searchKeyword: req.params.searchKeyword,
          searchData: fetchResultItems(searchParsed),
          searchDataLength: fetchResultLength(searchParsed),
          isKeywordValid: true,
          searchFacets: fetchSearchFacets(),
        },
        completeApiUrl: searchApiUrl,
      };

      next();
    }))
    .catch(error => {
      console.log(`error calling API : ${error}`);
      console.log(`from the endpoint: ${searchApiUrl}`);
      console.log(`search keyword is ${searchOptions.filters.q}`);

      res.locals.data = {
        HeaderStore: {
          headerData: [],
        },
        SearchStore: {
          searchKeyword: '',
          searchData: [],
          searchDataLength: 0,
          searchFacets: fetchSearchFacets(),
        },
      };

      next();
    });
};

const requestResultsFromClient = (req, res) => {
  searchOptions.filters = {
    q: req.params.searchKeyword,
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
      const searchModeled = _extend({}, {
        searchKeyword: fetchSearchKeyword(searchParsed),
        searchResultsItems: fetchResultItems(searchParsed),
        resultLength: fetchResultLength(searchParsed),
      });

      res.json(searchModeled);
    })
    .catch(error => {
      console.log(`error calling API : ${error}`);
      console.log(`from the endpoint: ${searchApiUrl}`);
      console.log(`search keyword is ${searchOptions.filters.q}`);
    });
};

const requestHeaderOnly = (req, res, next) => {
  if (req.path !== '/search/apachesolr_search/') {
    res.redirect('/search/apachesolr_search/');
    return;
  }

  getHeaderData()
    .then((headerData) => {
      const headerParsed = parser.parse(headerData.data, headerOptions);
      const headerModelData = HeaderItemModel.build(headerParsed);

      res.locals.data = {
        HeaderStore: {
          headerData: headerModelData,
        },
      };

      next();
    })
    .catch(error => {
      console.log(`error calling API for the header: ${error}`);
      console.log(`from the endpoint: ${headerApiUrl}`);

      res.locals.data = {
        HeaderStore: {
          headerData: [],
        },
      };

      next();
    });
};

// The route with valid pattern but no keyword will show no result
router
  .route('/search/apachesolr_search/')
  .get(requestHeaderOnly);

// The route with valid pattern and the keyword will request the search results
router
  .route('/search/apachesolr_search/:searchKeyword/:searchFilter')
  .get(requestSearchResult);

router
  .route('/search/apachesolr_search/:searchKeyword/')
  .get(requestSearchResult);

// The route is specific for client side ajax call. It returns a json file
router
  .route('/api/:searchKeyword/')
  .get(requestResultsFromClient);

// All the other router will show no result
router
  .route(/^((?!\/search\/apachesolr_search).)*$/)
  .get(requestHeaderOnly);

export default router;
