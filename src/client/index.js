// dependencies
import React, { useEffect } from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// Device detection
import {
  setInitialDevice, resolution$,
} from '../shared/utils/deviceDetection';
// Root
import RootComponent from '../shared/RootComponent';
// Configuroing Store
import configureStore from '../shared/configureStore';


// Create a store and get back itself and its history object
const { store, history } = configureStore({ state: window.__STATE__ });

// Device detection
setInitialDevice(store.dispatch);
resolution$.subscribe(store.dispatch);

// Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
const Main = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RootComponent />
      </ConnectedRouter>
    </Provider>
  );
};

hydrate(
  <Main />,
  document.querySelector('div#root')
);

if ('serviceWorker' in navigator) {
  /* eslint-disable */
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.info('SW registered: ', registration);
    }).catch((registrationError) => {
      console.error('SW registration failed: ', registrationError);
    });
  });
  /* eslint-enable */
}
