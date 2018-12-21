const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const cleanBuild = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const aws = require('./lib/kms-helper.js');
const pkg = require('./package.json');
const { default: { api: { development, production } } }  = require('./appConfig.js')

// References the applications root path
const ROOT_PATH = path.resolve(__dirname);

// Sets the variable as either development or production
const ENV = process.env.NODE_ENV || 'development';

// Sets appEnv so the the header component will point to the search app on either Dev or Prod
const appEnv = process.env.APP_ENV ? process.env.APP_ENV : 'production';

// set API_ROOT to the correct encrypted value
process.env.API_ROOT = appEnv === 'development' || process.env.AWS_PROFILE === 'nypl-sandbox' ? development : production;

aws.setProfile(process.env.AWS_PROFILE);
aws.decrypt(process.env.API_ROOT).then(result => {process.env.API_ROOT = result.slice(1, result.length-1)});

// Holds the common settings for any environment
const commonSettings = {
  // path.resolve - resolves to an absolute path
  // This is the path and file of our top level
  // React App that is to be rendered.
  entry: [
    'babel-polyfill',
    path.resolve(ROOT_PATH, 'src/client/App.jsx'),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    // Sets the output path to ROOT_PATH/dist
    path: path.resolve(ROOT_PATH, 'dist'),
    // Sets the name of the bundled application files
    // Additionally we can isolate vendor files as well
    filename: 'bundle.js',
  },
  plugins: [
    // Cleans the Dist folder after every build.
    // Alternately, we can run rm -rf dist/ as
    // part of the package.json scripts.
    new cleanBuild(['dist']),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'loadA11y': process.env.loadA11y || false,
      appEnv: JSON.stringify(appEnv),
    }),
  ],
};

/**
 * DEVELOPMENT ENVIRONMENT CONFIG
 * ------------------------------
 * Uses the webpack-merge plugin to merge
 * the common app configuration with the
 * additional development specific settings.
 *
**/
// Need to configure webpack-dev-server and hot-reload
// module correctly.
if (ENV === 'development') {
  module.exports = merge(commonSettings, {
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      path.resolve(ROOT_PATH, 'src/client/App.jsx'),
    ],
    output: {
      publicPath: 'http://localhost:3000/',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loaders: ['react-hot', 'babel'],
        },
        {
          test: /\.scss?$/,
          loader: 'style!css!sass',
          include: path.resolve(ROOT_PATH, 'src'),
        },
      ],
    },
  });
}

/**
 * PRODUCTION ENVIRONMENT CONFIG
 * ------------------------------
 * Uses the webpack-merge plugin to merge
 * the common app configuration with the
 * additional production specific settings.
 *
**/
if (ENV === 'production') {
  module.exports = merge(commonSettings, {
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: ['babel'],
          query: {
            presets: ['es2015', 'react']
          }
        },
        {
          test: /\.scss$/,
          include: path.resolve(ROOT_PATH, 'src'),
          loader: ExtractTextPlugin.extract(
            // activate source maps via loader query
            'css?sourceMap!' +
            'sass?sourceMap'
          ),
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      // Minification (Utilized in Production)
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
  });
}
