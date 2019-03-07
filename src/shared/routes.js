// @flow
import type { Component } from 'react';
import type { Observable } from 'rxjs';
import type { Dispatch } from 'redux';
import type { Match } from 'react-router-dom';
import type {
  Action, ThunkAction,
} from './configureStore';
// Pages
import About from '../client/containers/AboutContainer';
import Blog from '../client/containers/BlogContainer';
import Home from '../client/pages/Home';


type Props = {};
type State = {};
type GetState = () => {};

export interface Pageable {
  initialAction(distpatch: Dispatch<Action>, getState: GetState, match: Match): Observable<mixed>
  | Promise<mixed>
  | Action
  | ThunkAction;
  render(void): Element<any>;
}

export type Route = {
  path: string,
  component: Pageable & Component<Props, State>,
  exact?: boolean,
  sensitive?: boolean,
  strict?: boolean,
};

const routes: Array<Route> = [
  {
    path: '/',
    component: Home,
    exact: true,
  }, {
    path: '/about',
    component: About,
  }, {
    path: '/blog',
    component: Blog,
  },
];

export default routes;
