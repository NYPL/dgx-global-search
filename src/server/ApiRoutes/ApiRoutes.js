import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

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
const headerApiUrl = parser.getCompleteApi(headerOptions);

const fetchApiData = (url) => axios.get(url);

const getHeaderData = () => fetchApiData(headerApiUrl);

const requestSearchResult = (req, res, next) => {
  const searchOptions = createOptions(searchApi);
  searchOptions.filters = {
    q: req.params.searchKeyword,
  };
  const searchStart = req.query.start || 0;
  const searchApiUrl = parser.getCompleteApi(searchOptions) + `&filter[start]=${searchStart}`;
  const getSearchData = () => fetchApiData(searchApiUrl);

  // If the search api calls with a start point filter that is not from the
  // beginning, it will call requestMoreResult(req, res, api, apiOptions)
  if (searchStart > 0) {
    requestMoreResult(req, res, searchApiUrl, searchOptions);
  } else {
    axios.all([getSearchData(), getHeaderData()])
      .then(axios.spread((searchData, headerData) => {
        const searchParsed = parser.parse(searchData.data, searchOptions);
        const headerParsed = parser.parse(headerData.data, headerOptions);
        const headerModelData = HeaderItemModel.build(headerParsed);

        res.locals.data = {
          HeaderStore: {
            headerData: headerModelData,
          },
          SearchStore: {
            searchKeyword: fetchSearchKeyword(searchParsed),
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
            searchFacets: fetchSearchFacets(),
          },
        };

        next();
      });
  }
};

const requestMoreResult = (req, res, api, apiOptions) => {
  const getSearchData = () => fetchApiData(api);

  getSearchData()
    .then((searchData) => {
      const searchParsed = parser.parse(searchData.data, apiOptions);

      res.json(searchData);
    })
    .catch(error => {
      console.log(`error calling API : ${error}`);
      console.log(error.data.errors[0].title);
      console.log(`from the endpoint: ${searchApiUrl}`);
      console.log(`search keywords is ${api.filters}`);
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
