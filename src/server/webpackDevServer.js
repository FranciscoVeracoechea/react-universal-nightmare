import path from 'path';
import { of, forkJoin } from 'rxjs';
import {
  mergeMap,
} from 'rxjs/operators';


const modules = [
  'open',
  'webpack',
  'webpack-dev-middleware',
  'webpack-hot-middleware',
  'webpack-hot-server-middleware',
  '../../webpack/webpack.config.js',
];

const dynamicImport = moduleName => import(moduleName);
const execute = process.env.ONCE === 'true';

export default (app, { isAnalyzer }) => {
  of(modules).pipe(
    mergeMap(m => forkJoin(...m.map(dynamicImport)))
  ).subscribe(([
    open, webpack, webpackDevMiddleware, webpackHotMiddleware, webpackHotServerMiddleware, config,
  ]) => {
    const compiler = webpack(config);
    const devMiddleware = webpackDevMiddleware(compiler, {
      serverSideRender: true,
    });
    app.use(devMiddleware);
    devMiddleware.waitUntilValid(() => {
      if (isAnalyzer) {
        open(path.join(__dirname, '../../public/report.html'));
        open(path.join(__dirname, '../../dist/report.html'));
      } else if (execute) {
        process.env.ONCE = 'false';
        open(`http://localhost:${app.get('port')}`);
      }
    });
    app.use(webpackHotMiddleware(compiler.compilers.find(c => c.name === 'client')));
    app.use(webpackHotServerMiddleware(compiler, {
      serverRendererOptions: {
        browserEnv: app.get('browserEnv'),
      },
    }));
  });
};
