// @flow
import type {
  $Request, $Response, Middleware, NextFunction,
} from 'express';


type Request = {
  ...$Request,
  get: (string) => string,
  isMobile: boolean,
  isBot: boolean,
};

//  GET DEVICE\
function isBot(ua) {
  return /curl|bot|googlebot|google|baidu|bing|msn|duckduckgo|teoma|slurp|crawler|spider|robot|crawling/i.test(ua);
}
function isMobile(ua) {
  return /mobile/i.test(ua);
}

export default (): Middleware => (req: Request, res: $Response, next: NextFunction) => {
  req.isMobile = isMobile(req.get('user-agent'));
  req.isBot = isBot(req.get('user-agent'));
  next();
};
