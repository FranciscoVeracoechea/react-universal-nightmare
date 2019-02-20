import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


export default (initialState = {}) => {
  const middlewares = [
    thunk,
  ];
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
};
