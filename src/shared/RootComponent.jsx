// Dependencies
import React from 'react';
import { hot } from 'react-hot-loader';
import {
  Switch, Route,
} from 'react-router-dom';
// Client App
import App from '../client/components/App';
// Routes
import routes from './routes';


const Root = () => (
  <App>
    <Switch>
      { routes.map(props => <Route key={props.path} {...props} />) }
    </Switch>
  </App>
);

export default hot(module)(Root);
