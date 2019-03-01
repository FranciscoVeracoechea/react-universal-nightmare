import { actionTypes } from '../actions/blogActions';


const initialState = {
  posts: '',
  loading: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.start:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.success:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        message: 'Post list',
      };

    case actionTypes.cancel:
      return {
        ...state,
        post: [],
      };

    default:
      return state;
  }
};
