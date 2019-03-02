import { ofType } from 'redux-observable';
import {
  mergeMap, map, takeUntil, delay,
} from 'rxjs/operators';
import request from '../utils/Request';
import {
  actionTypes, setPosts,
} from '../actions/blogActions';


export const fetchBlogEpic = action$ => action$.pipe(
  ofType(actionTypes.start),
  mergeMap(() => request({ url: '/api/blog' }).pipe(
    delay(1000),
    map(result => result.response),
    map(res => setPosts(res.data))
  )),
  takeUntil(action$.pipe(
    ofType(actionTypes.cancel)
  ))
);

export const fetchSinglePostEpic = action$ => action$.pipe(
  ofType(actionTypes.post),
  mergeMap(action => request({
    url: `api/blog/${action.payload.id}`,
  }).pipe(
    map(result => result.response),
    map(res => setPosts(res.data))
  )),
);
