// Initial State
import { SET_IFRAME_PARAMS, SHOW_BACK_BUTTON } from '../constants/NavigationConstants';
import { NavigationActions, NavigationInitialState } from '../types/NavigationTypes';

export const initialState: NavigationInitialState = {
  isBackButtonVisible: true,
  iframeParams: {
    token: '',
    locale: '',
    occasion: ''
  }
};

export default (state = initialState, action: NavigationActions): NavigationInitialState => {
  switch (action.type) {
    case SHOW_BACK_BUTTON:
      return {
        ...state,
        isBackButtonVisible: action.payload
      };
    case SET_IFRAME_PARAMS:
      return {
        ...state,
        iframeParams: action.payload
      };
    default:
      return state;
  }
};
