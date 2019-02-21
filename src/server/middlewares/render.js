// Dependencies
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { from as observableFrom, forkJoin } from 'rxjs';
import {
  filter, mergeMap, scan, defaultIfEmpty,
} from 'rxjs/operators';
// Store
import configureStore from '../../shared/configureStore';
import Root from '../../shared/RootComponent';
import htmlTemplate from '../htmlTemplate';
// Routes
import routes from '../../shared/routes';


export default ({
    browserEnv,
    // serverStats,
    clientStats: { hash },
}) => (req, res) => {
  const store = configureStore();
  const context = {};

  observableFrom(routes).pipe(
    filter(route => matchPath(req.url, route) && route.component && route.component.initialAction),
    scan((acc, { component }) => [
      ...acc,
      store.dispatch(component.initialAction()),
    ], []),
    defaultIfEmpty([Promise.resolve()]),
    mergeMap(values => forkJoin(...values))
  ).subscribe(() => {
    const markup = renderToString(
      <Provider store={store}>
        <Root
          server
          location={req.url}
          context={context}
        />
      </Provider>
    );
    if (context.url) {
      res.redirect(301, context.url);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(
        htmlTemplate({
          initialState: store.getState(),
          markup,
          browserEnv,
          hash,
        })
      );
    }
  });
};
