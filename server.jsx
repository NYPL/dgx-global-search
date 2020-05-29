import path from 'path';
import express from 'express';
import compress from 'compression';
import colors from 'colors';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Iso from 'iso';
import alt from 'dgx-alt-center';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import appConfig from './appConfig';
import webpackConfig from './webpack.config';

import Application from './src/app/components/Application/Application';
import apiRoutes from './src/server/ApiRoutes/ApiRoutes';
import getApiRoot from './src/server/GetApiRoot';
import logger from './logger';

const ROOT_PATH = __dirname;
const INDEX_PATH = path.resolve(ROOT_PATH, 'src/client');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const VIEWS_PATH = path.resolve(ROOT_PATH, 'src/views');
const WEBPACK_DEV_PORT = appConfig.webpackDevServerPort || 3000;
const appEnv = process.env.APP_ENV || 'production';
const isProduction = process.env.NODE_ENV === 'production';
const regionEnv = process.env.REGION_ENV || 'us-east-1';

const app = express();

app.use(compress());

// Disables the Server response from
// displaying Express as the server engine
app.disable('x-powered-by');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', VIEWS_PATH);

app.set('port', process.env.PORT || 3001);

app.use(express.static(DIST_PATH));
app.use('/search/', express.static(DIST_PATH));

// For images
app.use('*/src/client', express.static(INDEX_PATH));

// Gets the valid API root for requesting search results
app.use('/', (req, res, next) => {
  const callGetApiRoot = getApiRoot(req, res, next);
  callGetApiRoot(app, process.env.API_ROOT, appEnv, regionEnv);
});

app.use('/', apiRoutes);

app.use('/', (req, res) => {
  // Change the page title based on having results or not. For accessibility purposes.
  const pageTitle = req.originalUrl === '/' ? 'Search NYPL.org' : 'Search Results | NYPL.org';

  alt.bootstrap(JSON.stringify(res.locals.data || {}));

  const iso = new Iso();
  const application = ReactDOMServer.renderToString(<Application />);

  iso.add(application, alt.flush());

  // First parameter references the ejs filename
  res.render('index', {
    application: iso.render(),
    appTitle: pageTitle,
    favicon: appConfig.favIconPath,
    webpackPort: WEBPACK_DEV_PORT,
    appEnv,
    isProduction,
  });
});

const server = app.listen(app.get('port'), (error) => {
  if (error) {
    console.log(colors.red(error));
  }

  console.log(colors.yellow.underline(appConfig.appName));
  console.log(
    colors.green('Express server is listening at'),
    colors.cyan(`localhost:${app.get('port')}`),
  );
});

// This function is called when you want the server to die gracefully
// i.e. wait for existing connections
const gracefulShutdown = () => {
  logger.info('Received kill signal, shutting down gracefully.');
  server.close(() => {
    logger.info('Closed out remaining connections.');
    process.exit(0);
  });
  // if after
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit();
  }, 1000);
};
// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);
// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);


/* Development Environment Configuration
 * -------------------------------------
 * - Using Webpack Dev Server
*/
if (!isProduction) {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: false,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With',
    },
    sockPort: 3000,
  }).listen(3000, 'localhost', (error, result) => {
    if (error) {
      console.log(colors.red(error));
    }
    console.log(colors.magenta('Webpack Dev Server listening at'), colors.cyan('localhost:3000'));
  });
}
