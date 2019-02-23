// @flow
// Dependencies
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { from, forkJoin, isObservable } from 'rxjs';
import isPromise from 'is-promise';
import {
  filter, mergeMap, defaultIfEmpty, map, toArray,
} from 'rxjs/operators';
// Flow Types
import type { $Request, $Response, Middleware } from 'express';
// Store
import configureStore from '../../shared/configureStore';
import Root from '../../shared/RootComponent';
import htmlTemplate from '../htmlTemplate';
// Routes
import routes, { type Route } from '../../shared/routes';


type ServerRender = {
  browserEnv: {},
  clientStats: {
    hash: string,
  },
};

const wrap = obj => (isPromise(obj) ? obj : Promise.resolve(obj));
const getAction = store => (route: Route) => {
  const action = route.component.initialAction(store.dispatch);
  return isObservable(action)
    ? action
    : wrap(action && store.dispatch(action));
};

export default (stats: ServerRender): Middleware => (req: $Request, res: $Response) => {
  const {
    browserEnv,
    clientStats: { hash },
  } = stats;
  const { store } = configureStore({ location: req.url, server: true });
  const context = {};

  from(routes).pipe(
    filter(route => Boolean(matchPath(req.url, route) && route.component?.initialAction)),
    map((route: Route) => getAction(store)(route)),
    toArray(),
    mergeMap(values => forkJoin(...values)),
    defaultIfEmpty(),
  ).subscribe(() => {
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Root />
        </StaticRouter>
      </Provider>
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
        })
      );
    }
  });
};
