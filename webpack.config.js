var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    application: ['./src/javascript/client'],
  },

  output: {
    filename: 'javascript/[name].js',
    path: './build/client/',
  },

  resolve: {
    extensions: ['', '.js'],
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },

  devtool: 'source-map',

  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/static',
      to: 'static',
    }, {
      from: 'src/html',
      to: '.',
    }]),
  ],
};
