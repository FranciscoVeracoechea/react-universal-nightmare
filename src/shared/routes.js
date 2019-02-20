// Components
import Blog from '../client/components/BlogPage/Blog';
import About from '../client/components/AboutPage/About';
import Home from '../client/components/HomePage/Home';


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
