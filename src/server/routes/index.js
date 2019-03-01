import BlogRouter from './BlogRouter';


export default (app) => {
  app.use('/api/blog', BlogRouter());
};
