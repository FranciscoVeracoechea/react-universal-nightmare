// @flows
import {
  createStore, applyMiddleware, type Store, compose,
} from 'redux';
import root from 'window-or-global';
import { createBrowserHistory, createMemoryHistory } from 'history';
// redux middlewares
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createEpicMiddleware } from 'redux-observable';
// Epics
import rootEpic from './epics';
// Reducers
import rootReducer from './reducers';

// Flow Types
export type Action = {
  type: string,
  payload?: mixed,
};

export type ThunkAction = (
  dispatch: (Action) => mixed,
  getState: (void) => {}
) => void | mixed;

type ConfigureStoreParams = {
  location?: string,
  state?: {},
  server: boolean,
};

type ConfigureStoreResponse = {
  store: Store<{}>,
  history: {},
};

/* eslint-disable */
const composeEnhancers = root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
export default (params: ConfigureStoreParams): ConfigureStoreResponse => {
  const {
    location = '',
    state = {},
    server = false,
  } = params;

  const history = server
    ? createMemoryHistory({
      initialEntries: [location],
    })
    : createBrowserHistory();

  const epicMiddleware = createEpicMiddleware();

  const middlewares = [
    thunk,
    routerMiddleware(history),
    epicMiddleware,
    reduxImmutableStateInvariant(),
  ];

  const result = {
    store: createStore(
      rootReducer(history),
      state,
      composeEnhancers(applyMiddleware(...middlewares)),
    ),
    history,
  };
  epicMiddleware.run(rootEpic);
  return result;
};
