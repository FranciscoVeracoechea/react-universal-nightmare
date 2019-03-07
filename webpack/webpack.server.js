require('dotenv').config();
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const commonConfig = require('./webpack.common');
const getPlugins = require('./getPlugins');


const isDev = process.env.NODE_ENV === 'development';
const type = 'server';

module.exports = {
  ...commonConfig(isDev, type),
  context: path.resolve(__dirname, '../src/server'),
  entry: './middlewares/serverSideRender.js',
  externals: nodeExternals({
    whitelist: [/^redux\/(store|modules)/, /^react-helmet/, /^window-or-global/],
  }),
  name: type,
  target: 'node',
  output: {
    filename: 'serverSideRender.js',
    path: path.resolve(__dirname, '../dist/'),
    libraryTarget: 'commonjs2',
    chunkFilename: '[name].bundle.js',
  },
  plugins: getPlugins(isDev, type),
};
