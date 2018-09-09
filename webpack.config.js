const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var data = require('./data.js');

module.exports = {
  entry: './src/router',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    libraryTarget: 'umd', // this is super important,
    globalObject: "this" // https://github.com/markdalgleish/static-site-generator-webpack-plugin/issues/130
  },
  module: {
    rules: [
        {
            test: /\.js/,
            use: [{ loader: 'babel-loader' }],
            include: __dirname + '/src',
        },
        {
            test: /\.css/,
            loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
            include: __dirname + '/src'
        }
    ],
  },
  plugins: [
    new StaticSiteGeneratorPlugin('main', data.routes, data),
    new ExtractTextPlugin("styles.css"),
  ]
};