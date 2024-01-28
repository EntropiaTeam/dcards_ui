import {
  SET_NEW_ORDER_FAILED,
  SET_NEW_ORDER_REQUEST,
  SET_NEW_ORDER_SUCCESS,
  SET_ORDER_REQUEST_PROGRESS
} from '../constants/OrderConstants';
import reducer from './OrderReducer';
import { OrderInitialState, SetOrderActionTypes } from '../types/OrderTypes';

describe('Order Reducer', () => {
  const initialState: OrderInitialState = {
    printibleID: '',
    isLoading: false,
    progress: 0,
    error: null
  };

  it('should return the initial state', () => {
    expect(reducer(initialState, {} as SetOrderActionTypes)).toEqual(initialState);
  });

  it('should handle SET_NEW_ORDER_REQUEST', () => {
    const setNewOrderRequest: SetOrderActionTypes = {
      type: SET_NEW_ORDER_REQUEST
    };

    const newState = {
      printibleID: '',
      isLoading: true,
      progress: 0,
      error: null
    };

    expect(reducer(initialState, setNewOrderRequest)).toEqual(newState);
  });

  it('should handle SET_NEW_ORDER_SUCCESS', () => {
    const payload = '123';

    const setNewOrderSuccess: SetOrderActionTypes = {
      type: SET_NEW_ORDER_SUCCESS,
      payload
    };

    const newState = {
      printibleID: payload,
      isLoading: false,
      progress: 0,
      error: null
    };

    expect(reducer(initialState, setNewOrderSuccess)).toEqual(newState);
  });

  it('should handle SET_NEW_ORDER_FAILED', () => {
    const payload = 400;

    const setNewOrderFailed: SetOrderActionTypes = {
      type: SET_NEW_ORDER_FAILED,
      payload
    };

    const newState = {
      printibleID: '',
      isLoading: false,
      progress: 0,
      error: payload
    };

    expect(reducer(initialState, setNewOrderFailed)).toEqual(newState);
  });

  it('should handle SET_ORDER_REQUEST_PROGRESS', () => {
    const payload = 50;

    const setRequestProgress: SetOrderActionTypes = {
      type: SET_ORDER_REQUEST_PROGRESS,
      payload
    };

    const newState = {
      printibleID: '',
      isLoading: false,
      progress: payload,
      error: null
    };

    expect(reducer(initialState, setRequestProgress)).toEqual(newState);
  });
});
