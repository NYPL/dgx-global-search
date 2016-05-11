import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

import Model from 'dgx-model-data';
import {
  fetchResultLength,
  fetchResultItem,
  fetchSearchKeyword,
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
const headerApiUrl = parser.getCompleteApi(headerOptions);

const fetchApiData = (url) => axios.get(url);

const getHeaderData = () => fetchApiData(headerApiUrl);

const requestSearchResult = (req, res, next) => {
  const searchOptions = createOptions(searchApi);
  searchOptions.filters = {
    q: req.params.searchKeyword,
  };
  const searchApiUrl = parser.getCompleteApi(searchOptions);
  const getSearchData = () => fetchApiData(searchApiUrl);

  axios.all([getSearchData(), getHeaderData()])
    .then(axios.spread((searchData, headerData) => {
      const searchParsed = parser.parse(searchData.data, searchOptions);
      // We neeed a model for search result later
      const headerParsed = parser.parse(headerData.data, headerOptions);
      const headerModelData = HeaderItemModel.build(headerParsed);

      res.locals.data = {
        HeaderStore: {
          headerData: headerModelData,
        },
        SearchStore: {
          searchKeyword: fetchSearchKeyword(searchParsed),
          searchData: fetchResultItem(searchParsed),
          searchDataLength: fetchResultLength(searchParsed),
        },
        completeApiUrl: searchApiUrl,
      };

      next();
    }))
    .catch(error => {
      console.log(`error calling API : ${error}`);
      console.log(error.data.errors[0].title);
      console.log(`from the endpoint: ${searchApiUrl}`);
      console.log(`search keywords is ${api.filters}`);

      res.locals.data = {
        HeaderStore: {
          headerData: [],
        },
        SearchStore: {
          searchKeyword: '',
          searchData: [],
          searchDataLength: 0,
        },
      };

      next();
    });
};

const requestEmptyResult = (req, res, next) => {
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
      console.log(error.data.errors[0].title);
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
  .get(requestEmptyResult);

// The route with valid pattern and the keyword will request the search results
router
  .route('/search/apachesolr_search/:searchKeyword')
  .get(requestSearchResult);

// All the other router will show no result
router
  .route(/^((?!\/search\/apachesolr_search).)*$/)
  .get(requestEmptyResult);

export default router;
