import helmet from 'helmet';


export default app => app.use([
  helmet.dnsPrefetchControl(),
  helmet.frameguard(),
  helmet.hsts({
    maxAge: 5184000,
    includeSubDomains: true,
  }),
  helmet.ieNoOpen(),
  helmet.noSniff(),
  helmet.xssFilter(),
]);
