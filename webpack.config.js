const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackRxjsExternals = require('webpack-rxjs-externals');

module.exports = {
  output: {
    filename: 'activity-checker.umd.js',
    library: 'ac',
    libraryTarget: 'umd'
  },

  externals: [
    webpackRxjsExternals()
  ],

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },

  devtool: 'source-map',

  plugins: [
    new CleanWebpackPlugin()
  ]
};

