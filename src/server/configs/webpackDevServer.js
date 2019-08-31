const modules = [
  'webpack',
  'webpack-dev-middleware',
  'webpack-hot-middleware',
  'webpack-hot-server-middleware',
  '../../../webpack/webpack.config.js',
];

const reporter = (middlewareOptions, options) => {
  const { log, state, stats } = options;
  let message = 'Compiled successfully.';
  if (state) {
    const displayStats = middlewareOptions.stats !== false;
    const statsString = stats.toString(middlewareOptions.stats);
    log.info('Universal React Nightmare');
    // displayStats only logged
    if (displayStats && statsString.trim().length) {
      if (stats.hasErrors()) {
        log.error(statsString);
      } else if (stats.hasWarnings()) {
        log.warn(statsString);
      }
    }
    if (stats.hasErrors()) {
      message = 'Failed to compile.';
    } else if (stats.hasWarnings()) {
      message = 'Compiled with warnings.';
    }
    log.info(message);
  } else {
    log.info('Compiling...');
  }
};

export default (app) => {
  Promise.all([
    ...modules.map(module => import(module)),
  ]).then(([
    { default: webpack },
    { default: webpackDevMiddleware },
    { default: webpackHotMiddleware },
    { default: webpackHotServerMiddleware },
    { default: config },
  ]) => {
    const compiler = webpack(config);
    const devMiddleware = webpackDevMiddleware(compiler, {
      serverSideRender: true,
      reporter,
    });
    app.use(devMiddleware);
    // devMiddleware.waitUntilValid(() => {
    //   if (isAnalyzer) {
    //     open(`${app.get('browserEnv').appUrl}/static/clientReport.html`);
    //     open(`${app.get('browserEnv').appUrl}/static/serverReport.html`);
    //   } else {
    //     open(`${app.get('browserEnv').appUrl}`);
    //   }
    // });
    app.use(webpackHotMiddleware(compiler.compilers.find(c => c.name === 'client')));
    app.use(webpackHotServerMiddleware(compiler, {
      serverRendererOptions: {
        browserEnv: app.get('browserEnv'),
      },
    }));
  });
};
