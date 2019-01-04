import appConfig from '../../appConfig';
import aws from '../app/utils/kms-helper';

/**
 * generateAwsProfile(appEnv)
 * A helper method for setting the AWS profile. There is only a profile if app is
 * running locally, in which case it depends on whether we are running in development
 * or production mode.
 * @param {string} appEnv
 */
const generateAwsProfile = (appEnv) => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  return appEnv === 'development' ? 'nypl-sandbox' : 'nypl-digital-dev';
};

/**
 * getApiRoot(req, res, next)
 * It returns the method to be called for generating the valid API root for search requesting.
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @return {function} - The returned function takes parameters as below,
 * app - The Express instance
 * apiRootEnv {string} - The environment variable of API_ROOT
 * appEnv {string} - The environment variable of APP_ENV
 * regionEnv {string} - The environment variable of REGION_ENV
 */
const getApiRoot = (req, res, next) => (
  app, apiRootEnv, appEnv = 'production', regionEnv = 'us-east-1',
) => {
  // Skips calling AWS if we already have API root
  if (app.locals.apiRoot) {
    next();
  } else if (apiRootEnv) {
    // Assigns API_ROOT env variable to the API root if the app receives it
    app.locals.apiRoot = apiRootEnv;
    next();
  } else {
    // If we do not have API_ROOT env variable or existing API root, call AWS to decrypt the one
    // in appConfig.js
    // We have to have valid AWS crendentials locally to do that
    const encryptApiUrl = appEnv === 'development'
      ? appConfig.developmentUrl : appConfig.productionUrl;
    const awsProfile = generateAwsProfile(appEnv);
    const region = regionEnv;

    // set API_ROOT to the correct encrypted value
    aws.decrypt(encryptApiUrl, awsProfile, region)
      .then((decryptApiRoot) => {
        app.locals.apiRoot = decryptApiRoot.slice(1, decryptApiRoot.length - 1);
        next();
      })
      .catch((error) => {
        console.log(`error getting API root: ${error}`);
        app.locals.apiRoot = undefined;
        next();
      });
  }
};

export default getApiRoot;
