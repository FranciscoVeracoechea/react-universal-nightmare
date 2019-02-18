// dependencies
import React from 'react';
import { hydrate } from 'react-dom';
// Root
import RootComponent from '../shared/RootComponent';


hydrate(
  <RootComponent />,
  document.getElementById('root')
);
