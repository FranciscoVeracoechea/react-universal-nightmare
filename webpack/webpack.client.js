require('dotenv').config();
const path = require('path');

const commonConfig = require('./webpack.common');
const getPlugins = require('./getPlugins');


const isDev = process.env.NODE_ENV === 'development';
const type = 'client';

module.exports = {
  ...commonConfig(isDev, type),
  context: path.resolve(__dirname, '../src/client'),
  entry: {
    main: [
      ...(
        isDev
          ? ['webpack-hot-middleware/client', 'react-hot-loader/patch']
          : []
      ),
      './index.js',
    ],
  },
  name: type,
  target: 'web',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/',
    chunkFilename: '[id].[chunkhash].bundle.js',
  },
  plugins: getPlugins(isDev, type),
};
