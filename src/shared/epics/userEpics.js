import { ofType } from 'redux-observable';
import {
  mergeMap, tap,
} from 'rxjs/operators';
import request from '../utils/Request';
import { actionTypes } from '../actions/blogActions';


export const fetchUserEpic = action$ => action$.pipe(
  ofType(actionTypes.fetchUser),
  mergeMap(action => request({
    useBaseUrl: false,
    url: `https://api.github.com/users/${action.payload}`,
  }).pipe(
    tap(console.log)
  ))
);
