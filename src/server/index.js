// dependencies
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
// settings
import gzip from './middlewares/gzip';
import errorHandler from './middlewares/errorHandler';
import Routes from './routes';
import deviceDetection from './middlewares/deviceDetection';


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
global.browserEnv = app.get('browserEnv');

app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(deviceDetection());
Routes(app);


if (isDev) {
  import('./webpackDevServer')
    .then(({ default: webpackDevServer }) => webpackDevServer(app, { isAnalyzer }));
} else {
  app.get('bundle.\*.js', gzip());
  const SSR_PATH = path.join(__dirname, '..', '..', 'dist', 'serverSideRender.js');
  const STATS_PATH = path.join(__dirname, '..', '..', 'compilationStats.json');
  Promise.all([import(SSR_PATH), import(STATS_PATH)])
    .then(([{ default: serverRenderer }, clientStats]) => {
      app.use(
        serverRenderer(
          { browserEnv: app.get('browserEnv'), clientStats }
        )
      );
    });
}

app.use(errorHandler({ isDev }));

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
