// Routers
import UserRouter from './UserRouter';
import BlogRouter from './BlogRouter';


export default (app) => {
  app.use('/api/user', UserRouter());
  app.use('/api/blog', BlogRouter());
};
