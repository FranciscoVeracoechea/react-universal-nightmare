// @flow
import type { Component } from 'react';
import type { Observable } from 'rxjs';
import type { Dispatch } from 'redux';
import type {
  Action, ThunkAction,
} from './configureStore';
// Containers
import About from '../client/containers/AboutContainer';
import Blog from '../client/containers/BlogContainer';
// Components
import Home from '../client/components/HomePage/Home';


type Props = {};
type State = {};

export interface Pageable {
  initialAction(distpatch: Dispatch<Action>): Observable<mixed>
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
