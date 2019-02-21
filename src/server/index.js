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
app.use(express.static(path.join(__dirname, '../../public')));
if (isDev) {
  webpackDevServer(app);
} else {
  const { default: serverRenderer } = require(path.join(__dirname, '../../dist/server.js'));
  const clientStats = require(path.join(__dirname, '../../compilationStats.json'));
  app.use(serverRenderer({ browserEnv: app.get('browserEnv'), clientStats }));
}

app.listen(app.get('port'), (err) => {
  if (!err) {
    console.log(path.join(__dirname, '../../public'));
    console.log(`Server listen on ${process.env.APP_URL}`);
    if (isDev) {
      import('open')
        .then(open => open(`http://localhost:${app.get('port')}/blog`));
    }
  }
});
