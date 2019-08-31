export default () => (error, req, res, next) => {
  const message = error.message || 'An error has occurred, please try again and make sure the data is correct';

  res.status(error.status || 500).json({
    message,
    status: error.status || 500,
  });
};
