import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

import Model from 'dgx-model-data';

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

const searchOptions = createOptions(searchApi);
const headerOptions = createOptions(headerApi);
const searchApiUrl = parser.getCompleteApi(searchOptions);
const headerApiUrl = parser.getCompleteApi(headerOptions);

const fetchApiData = (url) => axios.get(url);

const getSearchData = () => fetchApiData(searchApiUrl);

const getHeaderData = () => fetchApiData(headerApiUrl);

const mainApp = (req, res, next) => {
  // This is promised based call that will wait until all promises are resolved.
  // Add the app API calls here.
  axios.all([getHeaderData()])
    .then(axios.spread((headerData) => {
      // We neeed a model for search result later
      const headerParsed = parser.parse(headerData.data, headerOptions);
      const headerModelData = HeaderItemModel.build(headerParsed);

      res.locals.data = {
        HeaderStore: {
          headerData: headerModelData,
        },
      };

      next();
    }))
    .catch(error => {
      console.log(`error calling API for the header: ${error}`);
      console.log(error.data.errors[0].title);
      console.log(`from the endpoint: ${headerApiUrl}`);

      res.locals.data = [];

      next();
    }); /* end Axios call */
};

const requestSearchResult = (req, res, next) => {
  // This is promised based call that will wait until all promises are resolved.
  // Add the app API calls here.
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
          searchData: searchParsed.items,
        },
        // Set the API URL here so we can access it when we
        // render in the EJS file.
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
        SearchStore: {
          searchData: undefined,
        },
      };

      next();
    }); /* end Axios call */
};

router
  .route('/')
  .get(mainApp);

router
  .route('/search/apachesolr_search/:query')
  .get(requestSearchResult);

export default router;
