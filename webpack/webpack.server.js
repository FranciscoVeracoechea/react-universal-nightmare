const path = require('path');
const nodeExternals = require('webpack-node-externals');

const commonConfig = require('./webpack.common');
const getPlugins = require('./getPlugins');


const type = 'server';

module.exports = isDev => ({
  ...commonConfig(isDev, type),
  entry: path.resolve(__dirname, '../src/server/middlewares/render.js'),
  externals: nodeExternals({
    whitelist: [/^redux\/(store|modules)/],
  }),
  name: type,
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist/'),
    libraryTarget: 'commonjs2',
    chunkFilename: '[name].bundle.js',
  },
  plugins: getPlugins(isDev),
});
