// Webpack Configuration (Client & Server)
const clientConfig = require('./webpack/webpack.client');
const serverConfig = require('./webpack/webpack.server');


module.exports = [
  clientConfig,
  serverConfig,
];
