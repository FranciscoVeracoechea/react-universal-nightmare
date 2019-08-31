// @flow
import type { Component } from 'react';
import type { Observable } from 'rxjs';
import type { Store } from 'redux';
import type { Match } from 'react-router-dom';
import type { Request, Response } from 'express';
import type {
  Action, ThunkAction,
} from './co[nfigureStore';
// Pages
import About from '../client/pages/About';
import Blog from '../client/pages/Blog';
import Home from '../client/pages/Home';


type Props = {};
type State = {};

export interface Pageable {
  initialAction(store: Store, match: Match, req: Request, res: Response): Observable<mixed>
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
