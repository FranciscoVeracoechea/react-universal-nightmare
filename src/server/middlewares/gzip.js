// @flow
import type {
  $Request, $Response, Middleware, NextFunction,
} from 'express';


export default (): Middleware => (req: $Request, res: $Response, next: NextFunction) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  next();
};
