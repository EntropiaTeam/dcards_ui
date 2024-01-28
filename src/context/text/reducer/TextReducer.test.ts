import reducer from './TextReducer';
import {
  SET_CUSTOM_TEXT,
  VALIDATE_TEXT_LENGTH,
  SET_MAX_TEXTAREA_HEIGHT,
  SET_CURRENT_TEXTAREA_HEIGHT,
  RESET_TEXT_CONTEXT
} from '../constants/TextConstants';
import { TextInitialState, TextActionTypes } from '../types/TextTypes';

describe('Text Reducer', () => {
  const initialState: TextInitialState = {
    text: '',
    isTextHeightValid: true,
    maxTextareaHeight: 200,
    currentTextareaHeight: 0
  };

  it('should return the initial state', () => {
    expect(reducer(initialState, {} as TextActionTypes)).toEqual(initialState);
  });

  it('should handle SET_CUSTOM_TEXT', () => {
    const payload = 'Happy birthday!';

    const setCustomText: TextActionTypes = {
      type: SET_CUSTOM_TEXT,
      payload
    };

    expect(reducer(initialState, setCustomText)).toEqual({ ...initialState, text: payload });
  });

  it('should handle VALIDATE_TEXT_LENGTH', () => {
    const payload = false;

    const validateText: TextActionTypes = {
      type: VALIDATE_TEXT_LENGTH,
      payload
    };

    expect(reducer(initialState, validateText)).toEqual({
      ...initialState,
      isTextHeightValid: payload
    });
  });

  it('should handle SET_MAX_TEXTAREA_HEIGHT', () => {
    const payload = 250;

    const validateTextareaHeight: TextActionTypes = {
      type: SET_MAX_TEXTAREA_HEIGHT,
      payload
    };

    expect(reducer(initialState, validateTextareaHeight)).toEqual({
      ...initialState,
      maxTextareaHeight: payload
    });
  });

  it('should handle SET_CURRENT_TEXTAREA_HEIGHT', () => {
    const payload = 150;

    const setTextareaHeight: TextActionTypes = {
      type: SET_CURRENT_TEXTAREA_HEIGHT,
      payload
    };

    expect(reducer(initialState, setTextareaHeight)).toEqual({
      ...initialState,
      currentTextareaHeight: payload
    });
  });

  it('should handle RESET_TEXT_CONTEXT', () => {
    const resetTextState: TextActionTypes = {
      type: RESET_TEXT_CONTEXT
    };

    expect(reducer(initialState, resetTextState)).toEqual(initialState);
  });
});
