import {
  SET_CUSTOM_TEXT,
  VALIDATE_TEXT_LENGTH,
  SET_MAX_TEXTAREA_HEIGHT,
  SET_CURRENT_TEXTAREA_HEIGHT,
  RESET_TEXT_CONTEXT
} from '../constants/TextConstants';

export type TextInitialState = {
  text: string;
  isTextHeightValid: boolean;
  maxTextareaHeight: number;
  currentTextareaHeight: number;
};

export type TextActionsType = {
  setCustomText: (text: string) => void;
  validateTextHeight: (isTextHeightValid: boolean) => void;
  setMaxTextareaHeight: (maxTextareaHeight: number) => void;
  setCurrentTextareaHeight: (currentTextareaHeight: number) => void;
  resetCustomTextState: () => void;
};

// Context Type
export type UseTextContext = {
  state: TextInitialState;
  actions: TextActionsType;
};

// Action creators' Types
export type SetCustomTextAction = {
  type: typeof SET_CUSTOM_TEXT;
  payload: string;
};

export type ValidateTextHeightAction = {
  type: typeof VALIDATE_TEXT_LENGTH;
  payload: boolean;
};

export type SetMaxTextareaHeightAction = {
  type: typeof SET_MAX_TEXTAREA_HEIGHT;
  payload: number;
};

export type SetCurrentTextareaHeightAction = {
  type: typeof SET_CURRENT_TEXTAREA_HEIGHT;
  payload: number;
};

export type ResetCustomTextStateAction = {
  type: typeof RESET_TEXT_CONTEXT;
};

export type TextActionTypes = SetCustomTextAction | ValidateTextHeightAction
| SetMaxTextareaHeightAction | SetCurrentTextareaHeightAction | ResetCustomTextStateAction;
