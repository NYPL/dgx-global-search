const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const cleanBuild = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');
const kms = require('./lib/kms-helper.js');
const appConfig = require('./appConfig');
// References the applications root path
const ROOT_PATH = path.resolve(__dirname);

// Sets the variable as either development or production
const ENV = process.env.NODE_ENV || 'development';

// Sets the API_ROOT

let encryptedRoot;
console.log('apconfig:', appConfig)
if (ENV === 'development') {
  encryptedRoot = appConfig.default.searchApi.development;
} else if (ENV === 'production') {
  encryptedRoot = appConfig.default.searchApi.production;
}
kms.setProfile(process.env.AWS_PROFILE)
kms.decrypt(encryptedRoot).then(result => {console.log('decrypted:', result); process.env.API_ROOT = result.slice(1, result.length-1)})
console.log('API_ROOT: ', process.env.API_ROOT)

// Sets appEnv so the the header component will point to the search app on either Dev or Prod
const appEnv = process.env.APP_ENV ? process.env.APP_ENV : 'production';

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
