// dependencies
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
// Root
import RootComponent from '../shared/RootComponent';
// Configuroing Store
import configureStore from '../shared/configureStore';


hydrate(
  <Provider store={configureStore(window.initialState)}>
    <RootComponent />
  </Provider>,
  document.getElementById('root')
);
