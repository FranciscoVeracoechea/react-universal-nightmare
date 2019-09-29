export default (app, isDev) => {
  if (isDev) {
    Promise.all([
      import('morgan'),
      import('../middlewares/errorHandler'),
      import('./webpackDevServer.js'),
    ]).then(([
      { default: morgan }, { default: errorhandler }, { default: webpackDevServer },
    ]) => {
      app.use(morgan('dev'));
      webpackDevServer(app);
      app.use(errorhandler(isDev));
    }).catch(e => console.error(e.stack));
  }
};
