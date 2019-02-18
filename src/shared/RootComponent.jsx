// Dependencies
import React from 'react';
import {
  BrowserRouter, StaticRouter, Switch, Route,
} from 'react-router-dom';
// Client App
import App from '../client/components/App';
// Routes
import routes from './routes';


const Root = ({ server, location, context }) => {
  if (server) {
    return (
      <StaticRouter location={location} context={context}>
        <App>
          <Switch>
            { routes.map(props => <Route key={props.path} {...props} />) }
          </Switch>
        </App>
      </StaticRouter>
    );
  }
  return (
    <BrowserRouter>
      <App>
        <Switch>
          { routes.map(props => <Route key={props.path} {...props} />) }
        </Switch>
      </App>
    </BrowserRouter>
  );
};

export default Root;
