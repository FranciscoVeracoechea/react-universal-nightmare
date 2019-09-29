import { getErrors } from '../utils/functional';
import { actionTypes } from '../actions/authActions';


const initialState = {
  user: null,
  token: '',
  errors: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.saveData:
      return {
        errors: null,
        loading: false,
        user: payload.user,
        token: payload.token,
      };

    case actionTypes.saveUserInfo:
      return {
        ...state,
        loading: false,
        errors: null,
        user: payload.user,
      };

    case actionTypes.getToken:
      return {
        ...state,
        token: payload.token,
      };

    case actionTypes.fetchRegister:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.fetchLogin:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.clearErrors:
      return {
        ...state,
        errors: null,
      };

    case actionTypes.fetchRegisterRejected:
      return getErrors(initialState)(payload);

    case actionTypes.loginRejected:
      return getErrors(initialState)(payload);

    case actionTypes.fetchRegisterCancelled:
      return initialState;

    case actionTypes.logout:
      return initialState;

    case actionTypes.clearAuth:
      return initialState;

    default:
      return state;
  }
};
