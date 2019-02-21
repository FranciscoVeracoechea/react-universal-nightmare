import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from './reducers';


export default ({
  location = '',
  state = {},
  server = false,
}) => {
  const history = server
    ? createMemoryHistory({
      initialEntries: [location],
    })
    : createBrowserHistory();

  const middlewares = [
    thunk,
    routerMiddleware(history),
    reduxImmutableStateInvariant(),
  ];

  return {
    store: createStore(
      rootReducer(history),
      state,
      applyMiddleware(...middlewares)
    ),
    history,
  };
};
