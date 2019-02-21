// dependencies
import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// Root
import RootComponent from '../shared/RootComponent';
// Configuroing Store
import configureStore from '../shared/configureStore';
import './assets/img/favicon.ico';

// Create a store and get back itself and its history object
const { store, history } = configureStore({ state: window.__STATE__ });

// Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
const App = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootComponent />
    </ConnectedRouter>
  </Provider>
);

const root = document.querySelector('div#root');

if (root.hasChildNodes()) {
  // If it's an SSR, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  hydrate(App, root);
} else {
  // If we're not running on the server, just render like normal
  render(App, root);
}
