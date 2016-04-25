import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

import Model from 'dgx-model-data';

import appConfig from '../../../appConfig.js';

// Syntax that both ES6 and Babel 6 support
const { HeaderItemModel } = Model;
const { api, headerApi } = appConfig;

const router = express.Router();
const appEnvironment = process.env.APP_ENV || 'production';
const apiRoot = api.root[appEnvironment];
const headerOptions = createOptions(headerApi);

function createOptions(apiValue) {
  return {
    endpoint: `${apiRoot}${apiValue.endpoint}`,
    includes: apiValue.includes,
    filters: apiValue.filters,
  };
}

function fetchApiData(url) {
  return axios.get(url);
}

function getHeaderData() {
  const headerApiUrl = parser.getCompleteApi(headerOptions);
  return fetchApiData(headerApiUrl);
}

function MainApp(req, res, next) {
  // This is promised based call that will wait until all promises are resolved.
  // Add the app API calls here.
  axios.all([getHeaderData()])
    .then(axios.spread((headerData) => {
      const headerParsed = parser.parse(headerData.data, headerOptions);
      const headerModelData = HeaderItemModel.build(headerParsed);

      res.locals.data = {
        HeaderStore: {
          headerData: headerModelData,
        },
        Store: {
          _angularApps: ['Locations', 'Divisions', 'Profiles'],
          _reactApps: ['Staff Picks', 'Header', 'Book Lists'],
        },
      };

      next();
    }))
    .catch(error => {
      console.log(`error calling API : ${error}`);

      res.locals.data = {
        HeaderStore: {
          headerData: [],
        },
        Store: {
        }
      };
      next();
    }); /* end Axios call */
}


router
  .route('/')
  .get(MainApp);

export default router;
