import { Dispatch } from 'react';
import { AxiosError } from 'axios';
import { createNewOrder } from '../../../api/actions';
import {
  SetRequestProgressAction,
  SetNewOrderFailedAction,
  SetOrderSuccessAction,
  SetOrderRequestAction,
  SetOrderActionTypes,
  OrderDataResponse
} from '../types/OrderTypes';
import {
  SET_NEW_ORDER_FAILED,
  SET_NEW_ORDER_REQUEST,
  SET_NEW_ORDER_SUCCESS,
  SET_ORDER_REQUEST_PROGRESS
} from '../constants/OrderConstants';
import IframeActions from '../../../utils/IframeActions';

const setNewOrderRequest = (): SetOrderRequestAction => ({
  type: SET_NEW_ORDER_REQUEST
});

const setNewOrderSuccess = (response: OrderDataResponse): SetOrderSuccessAction => ({
  type: SET_NEW_ORDER_SUCCESS,
  payload: response.printibleID
});

const setNewOrderFailed = (error: number): SetNewOrderFailedAction => ({
  type: SET_NEW_ORDER_FAILED,
  payload: error
});

const setRequestProgress = (ProgressEvent: ProgressEvent): SetRequestProgressAction => ({
  type: SET_ORDER_REQUEST_PROGRESS,
  payload: ((ProgressEvent.loaded / ProgressEvent.total) * 100)
});

const setOrderRequestProgress = (dispatch: Dispatch<SetRequestProgressAction>) => (
  ProgressEvent: ProgressEvent
): void => {
  dispatch(setRequestProgress(ProgressEvent));
};

const setNewOrder = (dispatch: Dispatch<SetOrderActionTypes>) => (
  orderFormdata: FormData,
  setProgress: (ProgressEvent: ProgressEvent) => void
): void => {
  dispatch(setNewOrderRequest());
  createNewOrder(orderFormdata, setProgress).then((res) => {
    dispatch(setNewOrderSuccess(res));

    IframeActions.saveOrder({
      printibleID: res.printibleID,
      mediumImageLink: res.mediumPreviewUri,
      imageLink: res.previewUri
    });
  }).catch((ex) => {
    const error = ex as AxiosError;
    const errStatusCode = error.response!.status;
    dispatch(setNewOrderFailed(errStatusCode));
  });
};

export const OrderActions = {
  setNewOrder,
  setOrderRequestProgress,
  setRequestProgress,
  setNewOrderRequest,
  setNewOrderSuccess,
  setNewOrderFailed
};
