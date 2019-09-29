// Dependencies
import { combineEpics } from 'redux-observable';
// epics
import * as blogEpic from './blogEpic';
import * as authEpic from './authEpic';


export default combineEpics(
  ...Object.values(blogEpic),
  ...Object.values(authEpic),
);
