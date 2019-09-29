const clearSession = (req, next) => {
  req.session = null;
  next();
};

export default () => (req, res, next) => (
  req?.session?.user && req?.session?.isAuthenticated
    ? clearSession(req, next)
    : next()
);
