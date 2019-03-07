import { actionTypes } from '../actions/deviceActions';


const initialState = {
  // isTouch: 'ontouchstart' in window || 'ontouchstart' in document.documentElement,
  isTouch: false,
  pagination: 9,
  resolutionKind: '',
  isMobile: false,
  isBot: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.resolutionKind:
      return {
        ...state,
        pagination: action.payload.pagination,
        resolutionKind: action.payload.resolutionKind,
        isTouch: action.payload.isTouch,
      };
    case actionTypes.setUADevice:
      return {
        ...state,
        isMobile: action.payload.isMobile,
        isBot: action.payload.isBot,
      };
    default:
      return state;
  }
};
