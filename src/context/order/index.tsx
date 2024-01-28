import React, {
  createContext, useContext, useReducer, FC
} from 'react';
import { OrderActionsType, UseOrderContext } from './types/OrderTypes';
import OrderReducer, { initialState } from './reducer/OrderReducer';
import { OrderActions } from './actions/OrderActions';

// Create Context
export const OrderContext = createContext(initialState);
export const OrderActionsContext = createContext({} as OrderActionsType);
export const useOrderContext = (): UseOrderContext => (
  { state: useContext(OrderContext), actions: useContext(OrderActionsContext) }
);

export const OrderProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Actions
  const actions: OrderActionsType = {
    setNewOrder: OrderActions.setNewOrder(dispatch),
    setOrderRequestProgress: OrderActions.setOrderRequestProgress(dispatch)
  };

  return (
    <OrderContext.Provider value={state}>
      <OrderActionsContext.Provider value={actions}>
        {children}
      </OrderActionsContext.Provider>
    </OrderContext.Provider>
  );
};
