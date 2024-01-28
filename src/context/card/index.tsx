import React, {
  createContext, useContext, useReducer, FC
} from 'react';
import { CardActionsType, UseCardContext } from './types/CardTypes';
import CardReducer, { initialState } from './reducer/CardReducer';
import { CardActions } from './actions/CardActions';

// Create Context
export const CardContext = createContext(initialState);
export const CardActionsContext = createContext({} as CardActionsType);
export const useCardContext = (): UseCardContext => (
  { state: useContext(CardContext), actions: useContext(CardActionsContext) }
);

export const CardProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(CardReducer, initialState);

  // Actions
  const actions: CardActionsType = {
    setCardToEdit: CardActions.setCardToEdit(dispatch)
  };

  return (
    <CardContext.Provider value={state}>
      <CardActionsContext.Provider value={actions}>
        {children}
      </CardActionsContext.Provider>
    </CardContext.Provider>
  );
};
