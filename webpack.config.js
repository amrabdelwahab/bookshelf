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
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
     {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
      
    ]
  },
  sassLoader: {
    includePaths: [bourbon, neat]
  }
};   