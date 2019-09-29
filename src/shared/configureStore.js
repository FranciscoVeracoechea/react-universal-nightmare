import {
  createStore, applyMiddleware, compose,
} from 'redux';
import root from 'window-or-global';
import { createBrowserHistory, createMemoryHistory } from 'history';
// redux middlewares
import { routerMiddleware } from 'connected-react-router';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createEpicMiddleware } from 'redux-observable';
// import thunk from 'redux-thunk';
// import { createPromise } from 'redux-promise-middleware';
// Epics
import rootEpic from './epics';
// Reducers
import rootReducer from './reducers';


// const composeEnhancers = root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = root?.browserEnv?.env === 'development'
  ? root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

export default (params) => {
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
    // thunk,
    // createPromise({
    //   promiseTypeDelimiter: '/',
    // }),
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
