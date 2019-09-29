import path from 'path';
// middlewares
import gzip from '../middlewares/gzip';
import errorHandler from '../middlewares/errorHandler';


export default (app, isDev) => {
  if (!isDev) {
    app.get('bundle.*.js', gzip());
    const SSR_PATH = path.join(__dirname, '..', '..', '..', 'dist', 'serverSideRender.js');
    const STATS_PATH = path.join(__dirname, '..', '..', '..', 'compilationStats.json');
    Promise.all([import(SSR_PATH), import(STATS_PATH)])
      .then(([{ default: serverRenderer }, { default: clientStats }]) => {
        app.use(
          serverRenderer(
            { browserEnv: app.get('browserEnv'), clientStats }
          )
        );
      });
    app.use(errorHandler(isDev));
  }
};
