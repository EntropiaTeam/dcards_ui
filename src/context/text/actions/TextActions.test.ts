import {
  SET_CUSTOM_TEXT,
  VALIDATE_TEXT_LENGTH,
  SET_MAX_TEXTAREA_HEIGHT,
  SET_CURRENT_TEXTAREA_HEIGHT,
  RESET_TEXT_CONTEXT
} from '../constants/TextConstants';
import { TextActions } from './TextActions';
import { TextActionTypes } from '../types/TextTypes';

describe('Text action creators', () => {
  it('should create an action to set custom text', () => {
    const text = 'This is a custom text';

    const expectedAction: TextActionTypes = {
      type: SET_CUSTOM_TEXT,
      payload: text
    };

    expect(TextActions.setText(text)).toEqual(expectedAction);
  });

  it('should create an action to validate text length', () => {
    const isTextHeightValid = false;

    const expectedAction: TextActionTypes = {
      type: VALIDATE_TEXT_LENGTH,
      payload: isTextHeightValid
    };

    expect(TextActions.validateText(isTextHeightValid)).toEqual(expectedAction);
  });

  it('should create an action to reset text state', () => {
    const expectedAction: TextActionTypes = {
      type: RESET_TEXT_CONTEXT
    };

    expect(TextActions.resetTextState()).toEqual(expectedAction);
  });

  it('should create an action to set max textarea height', () => {
    const maxTextareaHeight = 200;

    const expectedAction: TextActionTypes = {
      type: SET_MAX_TEXTAREA_HEIGHT,
      payload: maxTextareaHeight
    };

    expect(TextActions.validateTextareaHeight(maxTextareaHeight)).toEqual(expectedAction);
  });

  it('should create an action to set current textarea height', () => {
    const textareaHeight = 80;

    const expectedAction: TextActionTypes = {
      type: SET_CURRENT_TEXTAREA_HEIGHT,
      payload: textareaHeight
    };

    expect(TextActions.setTextareaHeight(textareaHeight)).toEqual(expectedAction);
  });
});
