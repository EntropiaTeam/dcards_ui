import {
  SET_CUSTOM_TEXT,
  VALIDATE_TEXT_LENGTH,
  SET_CURRENT_TEXTAREA_HEIGHT,
  SET_MAX_TEXTAREA_HEIGHT,
  RESET_TEXT_CONTEXT
} from '../constants/TextConstants';
import { TextInitialState, TextActionTypes } from '../types/TextTypes';

// Initial State
export const initialState: TextInitialState = {
  text: '',
  isTextHeightValid: true,
  maxTextareaHeight: 200,
  currentTextareaHeight: 0
};

export default (state = initialState, action: TextActionTypes): TextInitialState => {
  switch (action.type) {
    case SET_CUSTOM_TEXT:
      return {
        ...state,
        text: action.payload
      };
    case VALIDATE_TEXT_LENGTH:
      return {
        ...state,
        isTextHeightValid: action.payload
      };
    case SET_MAX_TEXTAREA_HEIGHT:
      return {
        ...state,
        maxTextareaHeight: action.payload
      };
    case SET_CURRENT_TEXTAREA_HEIGHT:
      return {
        ...state,
        currentTextareaHeight: action.payload
      };
    case RESET_TEXT_CONTEXT:
      return { ...initialState };
    default:
      return state;
  }
};
