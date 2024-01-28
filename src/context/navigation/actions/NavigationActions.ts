import { Dispatch } from 'react';
import { SET_IFRAME_PARAMS, SHOW_BACK_BUTTON } from '../constants/NavigationConstants';
import { SetIframeParamsAction, IframeParams, ShowBackButtonAction } from '../types/NavigationTypes';

const setIframeParams = (iframeParams: IframeParams): SetIframeParamsAction => ({
  type: SET_IFRAME_PARAMS,
  payload: iframeParams
});

const changeIframeParams = (dispatch: Dispatch<SetIframeParamsAction>) => (
  iframeParams: IframeParams
): void => {
  dispatch(setIframeParams(iframeParams));
};

const setIsBackButtonVisible = (isBackButtonVisible: boolean): ShowBackButtonAction => ({
  type: SHOW_BACK_BUTTON,
  payload: isBackButtonVisible
});

const changeIsBackButtonVisible = (dispatch: Dispatch<ShowBackButtonAction>) => (
  isBackButtonVisible: boolean
): void => {
  dispatch(setIsBackButtonVisible(isBackButtonVisible));
};

export const NavigationActions = {
  changeIframeParams,
  changeIsBackButtonVisible,
  setIsBackButtonVisible,
  setIframeParams
};
