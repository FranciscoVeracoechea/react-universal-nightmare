require('dotenv').config();
const path = require('path');

const commonConfig = require('./webpack.common');
const getPlugins = require('./getPlugins');


const isDev = process.env.NODE_ENV === 'development';
const type = 'client';

module.exports = {
  ...commonConfig(isDev, type),
  entry: {
    main: [
      ...(
        isDev
          ? ['webpack-hot-middleware/client', 'react-hot-loader/patch']
          : []
      ),
      path.resolve(__dirname, '../src/client'),
    ],
  },
  name: type,
  target: 'web',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/public',
    chunkFilename: '[name].bundle.js',
  },
  plugins: getPlugins(isDev),
};
