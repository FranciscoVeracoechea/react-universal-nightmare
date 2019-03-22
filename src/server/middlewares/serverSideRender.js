// @flow
// Dependencies
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter, type Match } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  from, forkJoin, isObservable, of,
} from 'rxjs';
import isPromise from 'is-promise';
import {
  filter, mergeMap, defaultIfEmpty, map, toArray,
} from 'rxjs/operators';
import type { $Request, $Response } from 'express';
// actions
import { setUADevice } from '../../shared/actions/deviceActions';
// Store
import configureStore from '../../shared/configureStore';
import Root from '../../shared/RootComponent';
import htmlTemplate from '../htmlTemplate';
// Routes
import routes, { type Route, Pageable } from '../../shared/routes';


type Request = $Request & {
  get: (string) => string,
  session: {},
  isMobile: boolean,
  isBot: boolean,
  url: string,
};
type ServerRenderStats = {
  browserEnv: {},
  clientStats: {
    hash: string,
  },
};
type Props = {};
type State = {};
type MatchedRoute = {
  ...Route,
  component: Pageable & Component<Props, State>,
  match: Match,
};

const getAction = ({ dispatch, getState }) => (route: MatchedRoute) => {
  const { component, match } = route;
  const action = component.initialAction(dispatch, getState, match);
  return isObservable(action) || isPromise(action)
    ? action
    : of(dispatch(action) || null);
};

const deviceDispatcher = ({ dispatch }, req: Request) => {
  const { isMobile, isBot } = req;
  dispatch(setUADevice({ isMobile, isBot }));
};

export default (stats: ServerRenderStats) => (req: Request, res: $Response) => {
  const {
    browserEnv,
    clientStats: { hash },
  } = stats;
  const { store } = configureStore({ location: req.url, server: true });
  deviceDispatcher(store, req);
  const context = {};

  from(routes).pipe(
    filter(route => Boolean(route.component?.initialAction)),
    map(route => ({ ...route, match: matchPath(req.url, route) })),
    filter((route: MatchedRoute) => Boolean(route.match)),
    map((route: MatchedRoute) => getAction(store)(route)),
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
