const webpack = require('webpack');
const FlowBabelPlugin = require('flow-babel-webpack-plugin');
const fromRoot = rest => '../' + rest;

module.exports = () => {
  return {
    context: __dirname,
    entry: fromRoot('src/index.js'),
    output: {
      filename: 'app.js',
      publicPath: 'http://localhost:8080/'
    },
    module: {
      loaders: [
        {
          test: /js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      new FlowBabelPlugin()
    ]
  };
};