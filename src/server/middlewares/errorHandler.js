export default ({ isDev }) => (error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  if (isDev) {
    console.error('ERROR -> ', error);
  }
  res.json(error);
};
