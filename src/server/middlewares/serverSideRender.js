// Dependencies
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { ServerStyleSheets } from '@material-ui/styles';
import { Provider } from 'react-redux';
import {
  from, isObservable, of, Subject, iif, forkJoin,
} from 'rxjs';
import isPromise from 'is-promise';
import {
  filter, mergeMap, map, tap, withLatestFrom, mapTo, toArray, defaultIfEmpty,
} from 'rxjs/operators';
// actions
import { setUADevice } from '../../shared/actions/deviceActions';
import { saveUserFromServer } from '../../shared/actions/authActions';
// Store
import configureStore from '../../shared/configureStore';
import Root from '../../shared/RootComponent';
import htmlTemplate from '../htmlTemplate';
// Routes
import routes from '../../shared/routes';


const routes$ = from(routes);
const ssr$ = new Subject();
const serverData$ = new Subject();
const dispatch$ = new Subject();

const routesStream = ({ req, res, store }) => routes$.pipe(
  filter(route => route.component && route.component.initialAction),
  map(route => ({ ...route, match: matchPath(req.url, route) })),
  filter(route => route.match),
  map(({ component, match }) => component.initialAction(store, match, req, res)),
  map(action => (
    isObservable(action) || isPromise(action)
      ? action
      : of(dispatch$.next({ store, action, isInitialAction: true }) || null)
  )),
  toArray(),
  mergeMap(values => forkJoin(...values)),
  mapTo({ req, res, store }),
  defaultIfEmpty({ req, res, store })
);

dispatch$.pipe(
  mergeMap(data => iif(
    () => data.isInitialAction,
    of(data).pipe(
      map(({ store: { dispatch }, action }) => ({ dispatch, action }))
    ),
    of(data).pipe(
      map(({ store: { dispatch }, action, req }) => ({ dispatch, action: action(req) }))
    )
  ))
).subscribe(({ dispatch, action }) => dispatch(action));

ssr$.pipe(
  tap(({ store, req }) => dispatch$.next({ store, req, action: setUADevice })),
  tap(({ store, req }) => (
    req.session && req.session.isAuthenticated && req.session.user
      ? dispatch$.next({ store, req, action: saveUserFromServer })
      : null
  )),
  mergeMap(ssr => routesStream(ssr)),
  // tap(console.log),
  withLatestFrom(serverData$),
).subscribe(([{ req, res, store }, { browserEnv, hash }]) => {
  if (res.headersSent) return;

  const context = {};
  const sheets = new ServerStyleSheets();
  const markup = renderToString(
    sheets.collect(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Root />
        </StaticRouter>
      </Provider>
    )
  );
  if (context.url) {
    res.redirect(302, context.url);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
      htmlTemplate({
        state: store.getState(),
        markup,
        browserEnv,
        hash,
        css: sheets.toString(),
      })
    );
  }
});

export default ({ browserEnv, clientStats: { hash } }) => {
  serverData$.next({ browserEnv, hash });
  return (req, res) => {
    ssr$.next({ req, res, store: configureStore({ location: req.url, server: true }).store });
  };
};
