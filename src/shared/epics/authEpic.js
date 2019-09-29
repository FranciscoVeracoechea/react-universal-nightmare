// dependencies
import root from 'window-or-global';
import { ofType } from 'redux-observable';
import {
  mergeMap, map, filter, catchError, tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { push } from 'connected-react-router';
// request helper
import request from '../utils/Request';
// actions
import {
  actionTypes, saveUserInfo, saveData, fetchRegisterRejected, loginRejected,
} from '../actions/authActions';


const grantType = 'COOKIE';

export const fetchUserInfoEpic = action$ => action$.pipe(
  ofType(actionTypes.fetchUserInfo),
  map(action => ({ ...action, token: root.localStorage.getItem('token') })),
  filter(action => action.token),
  mergeMap(() => request({
    url: '/api/user/userInfo',
    method: 'GET',
  }).pipe(
    map(({ response }) => saveUserInfo(response)),
    catchError(error => of(fetchRegisterRejected(error))),
  )),
);

export const fetchRegisterEpic = action$ => action$.pipe(
  ofType(actionTypes.fetchRegister),
  mergeMap(action => request({
    url: '/api/user/register',
    method: 'POST',
    body: { ...action.payload, grantType },
  }).pipe(
    mergeMap(({ response }) => of(
      saveData(response),
      push('/dashboard')
    )),
    catchError(error => of(fetchRegisterRejected(error))),
  ))
);

export const fetchLoginEpic = action$ => action$.pipe(
  ofType(actionTypes.fetchLogin),
  mergeMap(action => request({
    url: '/api/user/login',
    method: 'POST',
    body: { ...action.payload, grantType },
  }).pipe(
    mergeMap(({ response }) => of(
      saveData(response),
      push('/dashboard')
    )),
    catchError(error => of(loginRejected(error)))
  ))
);

export const fetchLogoutEpic = action$ => action$.pipe(
  ofType(actionTypes.logout),
  mergeMap(() => request({
    url: '/api/user/logout',
    method: 'POST',
    headers: {
      grantType,
    },
  }).pipe(
    tap(console.info),
    catchError(error => of(error.response)),
    map(() => ({ type: 'null' })),
  ))
);
