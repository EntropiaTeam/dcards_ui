import React, {
  createContext, useContext, useReducer, FC
} from 'react';
import { NavigationActionTypes, UseNavigationContext } from './types/NavigationTypes';
import NavigationReducer, { initialState } from './reducer/NavigationReducer';
import { NavigationActions } from './actions/NavigationActions';

// Create Context
export const NavigationContext = createContext(initialState);
const NavigationActionsContext = createContext({} as NavigationActionTypes);
export const useNavigationContext = (): UseNavigationContext => (
  { state: useContext(NavigationContext), actions: useContext(NavigationActionsContext) }
);

export const NavigationProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(NavigationReducer, initialState);

  // Actions
  const actions: NavigationActionTypes = {
    changeIsBackButtonVisible: NavigationActions.changeIsBackButtonVisible(dispatch),
    changeIframeParams: NavigationActions.changeIframeParams(dispatch)
  };

  return (
    <NavigationContext.Provider value={state}>
      <NavigationActionsContext.Provider value={actions}>
        {children}
      </NavigationActionsContext.Provider>
    </NavigationContext.Provider>
  );
};
