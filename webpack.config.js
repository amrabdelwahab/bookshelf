var path = require('path');
var webpack = require('webpack');
var bourbon = require('bourbon').includePaths;
var neat = require('bourbon-neat').includePaths

module.exports = {
  entry: './src/index.js',
  output: { path: 'dist', publicPath: '/', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
     {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      { test: /\.png$/, loader: 'file-loader?limit=100000' },
      { test: /\.woff(2)?(\?v=.+)?$/, loader: "file-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=.+)?$/, loader: 'file-loader' },
      { test: /\.html$/, loader: 'html' },
      { test: /\.json$/, loader: 'json' }
      
    ]
  },
  sassLoader: {
    includePaths: [bourbon, neat]
  }
};   