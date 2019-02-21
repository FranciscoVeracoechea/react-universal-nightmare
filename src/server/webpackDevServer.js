import { of, forkJoin } from 'rxjs';
import {
  mergeMap,
} from 'rxjs/operators';


const modules = [
  'webpack',
  'webpack-dev-middleware',
  'webpack-hot-middleware',
  'webpack-hot-server-middleware',
  '../../webpack.config.js',
];

const dynamicImport = moduleName => import(moduleName);

export default (app) => {
  of(modules).pipe(
    mergeMap(m => forkJoin(...m.map(dynamicImport)))
  ).subscribe(([
    webpack, webpackDevMiddleware, webpackHotMiddleware, webpackHotServerMiddleware, config,
  ]) => {
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
      serverSideRender: true,
    }));
    app.use(webpackHotMiddleware(compiler.compilers.find(comp => comp.name === 'client')));
    app.use(webpackHotServerMiddleware(compiler, {
      serverRendererOptions: {
        browserEnv: app.get('browserEnv'),
      },
    }));
  });
};
