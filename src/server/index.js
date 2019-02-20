import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import webpackDevServer from './webpackDevServer';


dotenv.config();
const app = express();
const isDev = process.env.NODE_ENV === 'development';

app.set('port', process.env.NODE_PORT);
app.set('node_env', process.env.NODE_ENV);
app.set('browserEnv', {
  appTitle: process.env.APP_TITLE,
  appUrl: process.env.APP_URL,
  facebookId: process.env.FACEBOOK_APP_ID,
  defaultDescription: process.env.DEFAULT_DESCRIPTION,
  defaultTwitter: process.env.DEFAULT_TWITTER,
});
global.browserEnv = app.get('browserEnv');
app.use(express.json());

if (isDev) {
  webpackDevServer(app);
} else {
  // const CLIENT_ASSETS_DIR = path.join(__dirname, '../public/client');
  // const CLIENT_STATS_PATH = path.join(CLIENT_ASSETS_DIR, 'stats.json');
  const SERVER_RENDERER_PATH = path.join(__dirname, '../../dist/server.js');
  const serverRenderer = require(SERVER_RENDERER_PATH).default;
  // const stats = require(CLIENT_STATS_PATH);
  app.use(serverRenderer({ browserEnv: app.get('browserEnv') }));
}

app.use(express.static('public'));

app.listen(app.get('port'), (err) => {
  if (!err) {
    console.log(`Server listen on ${process.env.APP_URL}`);
    if (isDev) {
      import('open')
        .then(open => open(`http://localhost:${app.get('port')}/blog`));
    }
  }
});
