import React, {
  createContext, useContext, useMemo, useReducer, FC
} from 'react';
import TextReducer, { initialState } from './reducer/TextReducer';
import { TextActionsType, UseTextContext } from './types/TextTypes';
import { TextActions } from './actions/TextActions';

// Create Context
export const TextContext = createContext(initialState);
export const TextActionsContext = createContext({} as TextActionsType);
export const useTextContext = (): UseTextContext => ({
  state: useContext(TextContext),
  actions: useContext(TextActionsContext)
});

export const TextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(TextReducer, initialState);

  // Actions
  const actions: TextActionsType = useMemo(() => ({
    setCustomText: TextActions.setCustomText(dispatch),
    validateTextHeight: TextActions.validateTextHeight(dispatch),
    setMaxTextareaHeight: TextActions.setMaxTextareaHeight(dispatch),
    setCurrentTextareaHeight: TextActions.setCurrentTextareaHeight(dispatch),
    resetCustomTextState: TextActions.resetCustomTextState(dispatch)
  }), []);

  return (
    <TextContext.Provider value={state}>
      <TextActionsContext.Provider value={actions}>
        {children}
      </TextActionsContext.Provider>
    </TextContext.Provider>
  );
};
