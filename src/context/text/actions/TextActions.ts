import { Dispatch } from 'react';
import {
  SET_CUSTOM_TEXT,
  VALIDATE_TEXT_LENGTH,
  SET_MAX_TEXTAREA_HEIGHT,
  SET_CURRENT_TEXTAREA_HEIGHT,
  RESET_TEXT_CONTEXT
} from '../constants/TextConstants';
import { TextActionTypes } from '../types/TextTypes';

const setText = (text: string): TextActionTypes => ({
  type: SET_CUSTOM_TEXT,
  payload: text
});

const validateText = (isTextHeightValid: boolean): TextActionTypes => ({
  type: VALIDATE_TEXT_LENGTH,
  payload: isTextHeightValid
});

const resetTextState = (): TextActionTypes => ({
  type: RESET_TEXT_CONTEXT
});

const validateTextareaHeight = (maxTextareaHeight: number): TextActionTypes => ({
  type: SET_MAX_TEXTAREA_HEIGHT,
  payload: maxTextareaHeight
});

const setTextareaHeight = (textareaHeight: number): TextActionTypes => ({
  type: SET_CURRENT_TEXTAREA_HEIGHT,
  payload: textareaHeight
});

const setCustomText = (dispatch: Dispatch<TextActionTypes>) => (
  text: string
): void => {
  dispatch(setText(text));
};

const validateTextHeight = (dispatch: Dispatch<TextActionTypes>) => (
  isTextHeightValid: boolean
): void => {
  dispatch(validateText(isTextHeightValid));
};

const setMaxTextareaHeight = (
  dispatch: Dispatch<TextActionTypes>
) => (maxTextareaHeight: number): void => {
  dispatch(validateTextareaHeight(maxTextareaHeight));
};
const setCurrentTextareaHeight = (
  dispatch: Dispatch<TextActionTypes>
) => (currentTextareaHeight: number): void => {
  dispatch(setTextareaHeight(currentTextareaHeight));
};

const resetCustomTextState = (dispatch: Dispatch<TextActionTypes>) => (): void => {
  dispatch(resetTextState());
};

export const TextActions = {
  setCustomText,
  validateTextHeight,
  setText,
  validateText,
  setMaxTextareaHeight,
  setCurrentTextareaHeight,
  resetTextState,
  resetCustomTextState,
  validateTextareaHeight,
  setTextareaHeight
};
