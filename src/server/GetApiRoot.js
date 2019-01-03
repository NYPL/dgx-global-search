import appConfig from '../../appConfig';
import aws from './../app/utils/kms-helper.js';

/**
 * getApiRoot(req, res, next)
 * It returns the method to be called for generating the valid API root for search requesting.
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @return {function} - The returned function takes parameters as below,
 * app - The Express instance
 * api_root_env {string} - The environment variable of API_ROOT
 * app_env {string} - The environment variable of APP_ENV
 * region_env {string} - The environment variable of REGION_ENV
 */
const getApiRoot = (req, res, next) => {
  return (app, api_root_env, app_env, region_env) => {
    // Skips calling AWS if we already have API root
    if (app.locals.apiRoot) {
      next();
    } else {
      // Assigns API_ROOT env variable to the API root if the app receives it
      if (api_root_env) {
        app.locals.apiRoot = api_root_env;
        next();
      // If we do not have API_ROOT env variable or existing API root, call AWS to decrypt the one
      // in appConfig.js
      // We have to have valid AWS crendentials locally to do that
      } else {
          const encryptApiUrl = app_env === 'development'
            ? appConfig.developmentUrl : appConfig.productionUrl;
          const awsProfile = app_env === 'development'
            ? 'nypl-sandbox' : 'nypl-digital-dev';
          const region = region_env || 'us-east-1';

          // set API_ROOT to the correct encrypted value
          aws.decrypt(encryptApiUrl, awsProfile, region)
            .then((decryptApiRoot) => {
              app.locals.apiRoot = decryptApiRoot.slice(1, decryptApiRoot.length - 1);
              next();
            })
            .catch(error => {
              console.log(`error getting API root: ${error}`);
              app.locals.apiRoot = undefined;
              next();
            });
      }
    }
  };
};

export default getApiRoot;
