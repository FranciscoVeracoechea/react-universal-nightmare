// Dependencies
import React from 'react';
import { setConfig, hot } from 'react-hot-loader';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
// Client App
import App from '../client/components/App';
// Routes
import routes from './routes';


const Root = () => (
  <App>
    <Switch>
      { routes.map(props => <Route key={props.path} {...props} />) }
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </App>
);

setConfig({
  ignoreSFC: true,
  pureRender: true,
});

export default hot(module)(Root);
