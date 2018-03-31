const path = require('path');

module.exports = {
  entry: {
    account: './client/account/main.js'
  },
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|JPG|GIF|PNG|JPEG|jpeg)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 819200
          }
        }
      },
    ],
  },
  watch: true,
  devtool: 'source-map',
};