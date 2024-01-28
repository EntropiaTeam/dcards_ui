import {
  SET_NEW_ORDER_FAILED,
  SET_NEW_ORDER_REQUEST,
  SET_NEW_ORDER_SUCCESS,
  SET_ORDER_REQUEST_PROGRESS
} from '../constants/OrderConstants';

type OrderInitialState = {
  isLoading: boolean;
  error: number | null;
  progress: number;
  printibleID: string;
};

type OrderActionsType = {
  setNewOrder: (
    orderData: OrderDataRequest,
    setProgress: (ProgressEvent: ProgressEvent) => void,
  ) => void;
  setOrderRequestProgress: (ProgressEvent: ProgressEvent) => void;
};

// API Types
type OrderDataRequest = FormData;

 type OrderDataResponse = {
   printibleID: string;
   previewUri: string;
   mediumPreviewUri: string;
 };

// Action creators' Types
type SetRequestProgressAction = {
  type: typeof SET_ORDER_REQUEST_PROGRESS;
  payload: number;
};

type SetNewOrderFailedAction = {
  type: typeof SET_NEW_ORDER_FAILED;
  payload: number;
};

type SetOrderSuccessAction = {
  type: typeof SET_NEW_ORDER_SUCCESS;
  payload: string;
};

type SetOrderRequestAction = {
  type: typeof SET_NEW_ORDER_REQUEST;
};

type SetOrderActionTypes =
  SetRequestProgressAction
  | SetNewOrderFailedAction
  | SetOrderSuccessAction
  | SetOrderRequestAction;

export type UseOrderContext = {
  state: OrderInitialState;
  actions: OrderActionsType;
};

export type {
  OrderDataRequest,
  OrderDataResponse,
  SetRequestProgressAction,
  SetNewOrderFailedAction,
  SetOrderSuccessAction,
  SetOrderRequestAction,
  SetOrderActionTypes,
  OrderInitialState,
  OrderActionsType
};
