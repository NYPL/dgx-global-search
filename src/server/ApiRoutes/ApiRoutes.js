import express from 'express';
import axios from 'axios';
import appConfig from '../../../appConfig'

import {
  fetchResultLength,
  fetchResultItems,
  fetchSearchFacetsList,
} from '../../app/utils/SearchModel';

// Syntax that both ES6 and Babel 6 support

const router = express.Router();

const getSearchData = (url) => axios.get(url);


const generateQueryString = (req) => {
  const searchFilter = (req.params.searchFilter) ? ` more:${req.params.searchFilter}` : '';
  return req.params.searchRequest + searchFilter;
}

const generateApiUrl = (req) => {
  const start = req.query.start && req.query.start != 0 ? `&start=${req.query.start}` : '' ;
  return `${appConfig.apiRoot}&q=${generateQueryString(req)}${start}`
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
