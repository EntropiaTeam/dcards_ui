import {
  SET_NEW_ORDER_FAILED,
  SET_NEW_ORDER_REQUEST,
  SET_NEW_ORDER_SUCCESS,
  SET_ORDER_REQUEST_PROGRESS
} from '../constants/OrderConstants';
import { OrderInitialState, SetOrderActionTypes } from '../types/OrderTypes';

// Initial State
export const initialState: OrderInitialState = {
  error: null,
  isLoading: false,
  progress: 0,
  printibleID: ''
};

export default (
  state = initialState, action: SetOrderActionTypes
): OrderInitialState => {
  switch (action.type) {
    case SET_NEW_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SET_NEW_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        printibleID: action.payload
      };
    case SET_NEW_ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case SET_ORDER_REQUEST_PROGRESS:
      return {
        ...state,
        progress: action.payload
      };
    default:
      return state;
  }
};
