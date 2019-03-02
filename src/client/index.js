// dependencies
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// Root
import RootComponent from '../shared/RootComponent';
// Configuroing Store
import configureStore from '../shared/configureStore';
import './assets/img/favicon.ico';


// Create a store and get back itself and its history object
/* eslint-disable */
const { store, history } = configureStore({ state: window.__STATE__ });
/* eslint-enable */

// Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootComponent />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('div#root')
);
