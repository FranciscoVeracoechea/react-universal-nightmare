// Dependencies
import { combineEpics } from 'redux-observable';
// epics
import * as blogEpic from './blogEpic';


export default combineEpics(
  ...Object.values(blogEpic),
);
