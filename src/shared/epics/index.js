// Dependencies
import { combineEpics } from 'redux-observable';
// epics
import * as usersEpics from './userEpics';


export default combineEpics(
  ...Object.values(usersEpics),
);
