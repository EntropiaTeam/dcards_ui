import React, {
  createContext, useContext, useReducer, useMemo, FC
} from 'react';
import { CategoriesActionsType, UseCategoriesContext } from './types/CategoriesTypes';
import CategoriesReducer, { initialState } from './reducer/CategoriesReducer';
import { CategoriesActions } from './actions/CategoriesActions';

// Create Context
export const CategoriesContext = createContext(initialState);
export const CategoriesActionsContext = createContext({} as CategoriesActionsType);
export const useCategoriesContext = (): UseCategoriesContext => ({
  state: useContext(CategoriesContext), actions: useContext(CategoriesActionsContext)
});

export const CategoriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(CategoriesReducer, initialState);

  // Actions
  const actions: CategoriesActionsType = useMemo(() => ({
    setCategories: CategoriesActions.setCategories(dispatch)
  }), []);

  return (
    <CategoriesContext.Provider value={state}>
      <CategoriesActionsContext.Provider value={actions}>
        {children}
      </CategoriesActionsContext.Provider>
    </CategoriesContext.Provider>
  );
};
