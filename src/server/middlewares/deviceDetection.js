//  GET DEVICE\
function isBot(ua) {
  return /curl|bot|googlebot|google|baidu|bing|msn|duckduckgo|teoma|slurp|crawler|spider|robot|crawling/i.test(ua);
}
function isMobile(ua) {
  return /mobile/i.test(ua);
}

export default () => (req, res, next) => {
  req.isMobile = isMobile(req.get('user-agent'));
  req.isBot = isBot(req.get('user-agent'));
  next();
};
