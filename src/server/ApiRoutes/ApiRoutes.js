import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';
import redis from 'redis';

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

const client = redis.createClient()

const redisClientWithPromise = key => new Promise((resolve) => {
  client.get(key, (err, cachedResponse) => resolve(cachedResponse))
});

const getDataAndSetClientKey = (url) => {
  return axios.get(url).then((apiResponse) => {
    const stringifiedResponse = JSON.stringify(apiResponse);
    client.set(url, stringifiedResponse, 'EX', 3600);
    return stringifiedResponse;
  });
}

const getSearchData = url => redisClientWithPromise(url)
  .then(redisResponse => (redisResponse === null ? getDataAndSetClientKey(url) : Promise.resolve(redisResponse)))
  .then(stringifiedSearchData => JSON.parse(stringifiedSearchData));
  
const generateQueryString = (req) => {
  const searchFilter = (req.params.searchFilter) ? ` more:${req.params.searchFilter}` : '';
  return req.params.searchRequest + searchFilter;
}

const generateApiUrl = (req) => {
  const start = req.query.start && req.query.start != 0 ? `&start=${req.query.start}` : '' ;
  return `${process.env.API_ROOT}&q=${generateQueryString(req)}${start}`
}

const requestSearchResult = (req, res, next) => {
  const searchApiUrl = generateApiUrl(req);
  const queriesForGA = {
    searchedFrom: req.query.searched_from || '',
    timestamp: req.query.timestamp || '',
  };

  getSearchData(searchApiUrl)
    .then((searchData) => {
      const data = searchData.data;

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
        completeApiUrl: searchApiUrl,
      };

      next();
    })
    .catch(error => {
      console.log(`error calling API : ${error}`);
      console.log(`from the endpoint: ${searchApiUrl}`);

      res.locals.data = {
        SearchStore: {
          searchRequest: '',
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
  const searchApiUrl = generateApiUrl(req);

  if (!req.query.start) {
    res.json({});
    return;
  }

  getSearchData(searchApiUrl)
    .then((searchData) => {
      const data = searchData.data;
      const searchModeled = {
        searchResultsItems: fetchResultItems(data, req.params.searchRequest),
        resultLength: fetchResultLength(data),
      };

      res.json(searchModeled);
    })
    .catch(error => {
      console.log(`error calling API : ${JSON.stringify(error)}`);
      console.log(`from the endpoint: ${searchApiUrl}`);
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
