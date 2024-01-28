import { callAPI, Endpoint } from '../index';
import { InitialDataResponse } from '../../context/initialData/types/InitialDataTypes';
import { OrderDataRequest, OrderDataResponse } from '../../context/order/types/OrderTypes';
import IframeActions from '../../utils/IframeActions';

export const getInitialData = (
  language: string,
  isPhotoCardsHidden: boolean
): Promise<InitialDataResponse> => callAPI(
  Endpoint.Init,
  'GET',
  null,
  {
    locale: language,
    hidePhotoCards: isPhotoCardsHidden.toString()
  }
);

export const createNewOrder = (
  order: OrderDataRequest, setOrderRequestProgress: (progress: ProgressEvent) => void
): Promise<OrderDataResponse> => callAPI(
  Endpoint.Order,
  'POST',
  order,
  {
    token: IframeActions.getHostToken(),
    'Content-type': 'multipart/form-data'
  },
  {
    onUploadProgress: (ProgressEvent) => setOrderRequestProgress(ProgressEvent)
  }
);
