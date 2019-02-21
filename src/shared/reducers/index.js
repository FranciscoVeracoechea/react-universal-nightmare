import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import blog from './blogReducer';
import device from './deviceReducer';


export default history => combineReducers({
  router: connectRouter(history),
  blog,
  device,
});
