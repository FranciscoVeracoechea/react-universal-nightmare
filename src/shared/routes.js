// Pages
import About from '../client/pages/About';
import Blog from '../client/pages/Blog';
import Home from '../client/pages/Home';


const routes = [
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
