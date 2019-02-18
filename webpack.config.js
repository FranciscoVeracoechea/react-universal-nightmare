// Webpack Configuration (Client & Server)
require('dotenv').config();
const clientConfig = require('./webpack/webpack.client');
const serverConfig = require('./webpack/webpack.server');


const isDev = process.env.NODE_ENV === 'development';

module.exports = [
  clientConfig(isDev),
  serverConfig(isDev),
];
