import { SET_IFRAME_PARAMS, SHOW_BACK_BUTTON } from '../constants/NavigationConstants';

export type NavigationInitialState = {
  isBackButtonVisible: boolean;
  iframeParams: IframeParams;
};

export type IframeParams = {
  token: string;
  occasion: string;
  locale: string;
};

export type SetIframeParamsAction = {
  type: typeof SET_IFRAME_PARAMS;
  payload: IframeParams;
};

export type ShowBackButtonAction = {
  type: typeof SHOW_BACK_BUTTON;
  payload: boolean;
};

export type NavigationActionTypes = {
  changeIsBackButtonVisible: (isBackButtonVisible: boolean) => void;
  changeIframeParams: (iframeParams: IframeParams) => void;
};

export type UseNavigationContext = {
  state: NavigationInitialState;
  actions: NavigationActionTypes;
};

export type NavigationActions = SetIframeParamsAction | ShowBackButtonAction;
