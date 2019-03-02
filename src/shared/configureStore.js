// @flows
import { createStore, applyMiddleware, type Store } from 'redux';
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
      applyMiddleware(...middlewares)
    ),
    history,
  };
  epicMiddleware.run(rootEpic);
  return result;
};
