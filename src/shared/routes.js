// Components
import Blog from '../client/components/Blog';
import About from '../client/components/About';
import Home from '../client/components/Home';


export default [
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
