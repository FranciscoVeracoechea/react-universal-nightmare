const path = require('path');

const commonConfig = require('./webpack.common');
const getPlugins = require('./getPlugins');


const type = 'client';

module.exports = isDev => ({
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
});
