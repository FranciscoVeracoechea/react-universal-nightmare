export const actionTypes = {
  start: 'BLOG_FETCH_POST_START',
  success: 'BLOG_FETCH_POST_SUCCESS',
  error: 'BLOG_FETCH_POST_ERROR',
};

export const fetchPost = text => (dispatch) => {
  dispatch({
    type: actionTypes.start,
  });
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.success,
        payload: text,
      });
      resolve(text);
    }, 2000);
  });
};
