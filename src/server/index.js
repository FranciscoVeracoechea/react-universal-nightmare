import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import webpackDevServer from './webpackDevServer';
import gzip from './middlewares/gzip';
import Routes from './routes';


dotenv.config();
const app = express();
const isAnalyzer = process.env.ANALYZER === 'true';
const isDev = process.env.NODE_ENV === 'development';

app.set('port', process.env.NODE_PORT || 3333);
app.set('node_env', process.env.NODE_ENV);
app.set('browserEnv', {
  appTitle: process.env.APP_TITLE,
  appUrl: process.env.APP_URL,
  facebookId: process.env.FACEBOOK_APP_ID,
  defaultDescription: process.env.DEFAULT_DESCRIPTION,
  defaultTwitter: process.env.DEFAULT_TWITTER,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public')));
Routes(app);

global.browserEnv = app.get('browserEnv');

if (isDev) {
  webpackDevServer(app);
} else {
  app.get('*.js', gzip());
  /* eslint-disable */
  const { default: serverRenderer } = require(path.join(__dirname, '../../dist/server.js'));
  const clientStats = require(path.join(__dirname, '../../compilationStats.json'));
  /* eslint-enable */
  app.use(serverRenderer({ browserEnv: app.get('browserEnv'), clientStats }));
}

app.listen(app.get('port'), (err) => {
  if (!err && !isAnalyzer) {
    /* eslint-disable */
    console.log(`Server listening on ${process.env.APP_URL}`);
    /* eslint-enable */
    if (isDev) {
      import('open')
        .then(open => open(`http://localhost:${app.get('port')}/blog`));
    }
  }
});
