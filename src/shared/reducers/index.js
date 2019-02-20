import { combineReducers } from 'redux';
import blog from './blogReducer';
import device from './deviceReducer';


export default combineReducers({
  blog,
  device,
});
