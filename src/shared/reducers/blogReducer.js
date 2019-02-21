import { actionTypes } from '../actions/blogActions';


const initialState = {
  posts: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.success:
      return {
        ...state,
        posts: state.posts + action.payload,
      };

    default:
      return state;
  }
};
