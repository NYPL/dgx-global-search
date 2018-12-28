import express from 'express';
import axios from 'axios';
import appConfig from '../../../appConfig'
import aws from './../../app/utils/kms-helper.js';

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

const generateApiQueries = (req) => {
  const start = req.query.start && req.query.start != 0 ? `&start=${req.query.start}` : '' ;
  const queryString = generateQueryString(req);

  return `&q=${queryString}${start}`;
};

const getApiRoot = (env) => (env === 'development'? appConfig.developmentUrl : appConfig.productionUrl);

const awsProfile = process.env.APP_ENV === 'development' ? 'nypl-sandbox' : 'nypl-digital-dev';
// set API_ROOT to the correct encrypted value
aws.setProfile(awsProfile);

const requestSearchResult = (req, res, next) => {
  const queriesForGA = {
    searchedFrom: req.query.searched_from || '',
    timestamp: req.query.timestamp || '',
  };

  aws.decrypt(getApiRoot(process.env.APP_ENV))
    .then((decryptApiRoot) => {
      decryptApiRoot = decryptApiRoot.slice(1, decryptApiRoot.length - 1);
      const searchApiUrl = `${decryptApiRoot}${generateApiQueries(req)}`;

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
    })
    .catch(error => {
      console.log(`error getting API ROOT : ${error}`);

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
  if (!req.query.start) {
    res.json({});
    return;
  }

  aws.decrypt(getApiRoot(process.env.APP_ENV))
    .then((decryptApiRoot) => {
      decryptApiRoot = decryptApiRoot.slice(1, decryptApiRoot.length - 1);
      const searchApiUrl = `${decryptApiRoot}${generateApiQueries(req)}`;

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
    })
    .catch(error => {
       console.log(`error getting API ROOT : ${error}`);
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
