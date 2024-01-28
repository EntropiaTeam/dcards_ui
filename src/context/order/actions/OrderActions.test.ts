import {
  SET_NEW_ORDER_FAILED,
  SET_NEW_ORDER_REQUEST,
  SET_NEW_ORDER_SUCCESS,
  SET_ORDER_REQUEST_PROGRESS
} from '../constants/OrderConstants';
import { OrderActions } from './OrderActions';
import {
  SetOrderActionTypes,
  OrderDataResponse
} from '../types/OrderTypes';

describe('Order action creators', () => {
  it('should create an action to set new order request', () => {
    const expectedAction: SetOrderActionTypes = {
      type: SET_NEW_ORDER_REQUEST
    };

    expect(OrderActions.setNewOrderRequest()).toEqual(expectedAction);
  });

  it('should create an action to set new order success', () => {
    const orderDataResponse: OrderDataResponse = {
      printibleID: '123',
      previewUri: 'uri'
    };

    const expectedAction: SetOrderActionTypes = {
      type: SET_NEW_ORDER_SUCCESS,
      payload: orderDataResponse.printibleID
    };

    expect(OrderActions.setNewOrderSuccess(orderDataResponse)).toEqual(expectedAction);
  });

  it('should create an action to set new order failure', () => {
    const error = 400;

    const expectedAction: SetOrderActionTypes = {
      type: SET_NEW_ORDER_FAILED,
      payload: error
    };

    expect(OrderActions.setNewOrderFailed(error)).toEqual(expectedAction);
  });

  it('should create an action to show load progress', () => {
    const progress = {
      loaded: 0.5,
      total: 1
    } as ProgressEvent<EventTarget>;

    const expectedAction = {
      type: SET_ORDER_REQUEST_PROGRESS,
      payload: (progress.loaded / progress.total) * 100
    };

    expect(OrderActions.setRequestProgress(progress)).toEqual(expectedAction);
  });
});
