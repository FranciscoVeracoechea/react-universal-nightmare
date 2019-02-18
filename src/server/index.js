import express from 'express';
import path from 'path';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const port = process.env.NODE_PORT;
const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  const modules = [
    'webpack',
    'webpack-dev-middleware',
    'webpack-hot-middleware',
    'webpack-hot-server-middleware',
    '../../webpack.config.js',
  ];
  Promise
    .all(modules.map(name => import(name)))
    .then((importedModules) => {
      const [
        webpack, webpackDevMiddleware, webpackHotMiddleware, webpackHotServerMiddleware, config,
      ] = importedModules;
      const compiler = webpack(config);
      app.use(webpackDevMiddleware(compiler, {
        serverSideRender: true,
      }));
      app.use(webpackHotMiddleware(compiler.compilers.find(comp => comp.name === 'client')));
      app.use(webpackHotServerMiddleware(compiler, {
        serverRendererOptions: {
          title: process.env.APP_TITLE,
        },
      }));
    })
    .catch(console.error);
} else {
  const CLIENT_ASSETS_DIR = path.join(__dirname, '../public/client');
  const CLIENT_STATS_PATH = path.join(CLIENT_ASSETS_DIR, 'stats.json');
  const SERVER_RENDERER_PATH = path.join(__dirname, '../../dist/server.js');
  const serverRenderer = require(SERVER_RENDERER_PATH);
  const stats = require(CLIENT_STATS_PATH);
  app.use(serverRenderer(stats));
}

app.use(express.static(path.join(__dirname, '../../public')));

app.listen(port, (err) => {
  if (!err) {
    console.log(`${process.env.APP_URL}:${port}`);
    if (isDev) {
      import('open')
        .then(open => open(`${process.env.APP_URL}:${port}`))
        .catch(console.error);
    }
  }
});
