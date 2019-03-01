export const actionTypes = {
  start: 'BLOG_FETCH_POST_START',
  success: 'BLOG_FETCH_POST_SUCCESS',
  error: 'BLOG_FETCH_POST_ERROR',
  fetchUser: 'FETCH_USER',
  cancel: 'BLOG_CANCEL_FETCH',
  fetchSinglePost: 'FETCH_SINGLE_POST_START',
  singlePost: 'FETCH_SINGLE_POST_SUCEESS',
};


export const fetchSinglePost = id => ({
  type: actionTypes.postStart,
  payload: { id },
});

export const setPosts = blogs => ({
  type: actionTypes.success,
  payload: blogs,
});

export const fetchPosts = () => ({
  type: actionTypes.start,
});

export const cancelFetch = () => ({
  type: actionTypes.cancel,
});
