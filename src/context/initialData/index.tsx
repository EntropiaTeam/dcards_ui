import React, {
  createContext, useContext, useReducer, useMemo, FC
} from 'react';
import { UseInitialDataContext, InitialDataActionsType } from './types/InitialDataTypes';
import InitialDataReducer, { initialState as initDatainitialState } from './reducer/InitialDataReducer';
import { InitialDataActions } from './actions/InitialDataActions';

import {
  useCategoriesContext,
  useCustomImageContext
} from '..';

// Create Context
export const InitialDataContext = createContext(initDatainitialState);
export const InitialDataActionsContext = createContext({} as InitialDataActionsType);
export const useInitialDataContext = (): UseInitialDataContext => ({
  state: useContext(InitialDataContext), actions: useContext(InitialDataActionsContext)
});

export const InitialDataProvider: FC = ({ children }) => {
  const { actions: { setCategories } } = useCategoriesContext();
  const { actions: { setAgreementTranslation } } = useCustomImageContext();
  const [initDatastate, dispatchInitData] = useReducer(InitialDataReducer, initDatainitialState);

  // Actions
  const actions: InitialDataActionsType = useMemo(() => ({
    loadInitialData: InitialDataActions.loadInitialData(
      dispatchInitData,
      setCategories,
      setAgreementTranslation
    )
  }), [setCategories, setAgreementTranslation]);

  return (
    <InitialDataContext.Provider value={initDatastate}>
      <InitialDataActionsContext.Provider value={actions}>
        {children}
      </InitialDataActionsContext.Provider>
    </InitialDataContext.Provider>
  );
};
