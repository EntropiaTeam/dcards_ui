import { Dispatch } from 'react';
import { SET_INITIAL_DATA_SUCCESS, SET_INITIAL_DATA_FAILURE, SET_INITIAL_DATA_REQUEST } from '../constants/InitialDataConstants';
import AdobeAnalytics from '../../../utils/AdobeAnalytics';
import { getInitialData } from '../../../api/actions';
import {
  SetInitialDataSuccessAction,
  SetInitialDataFailureAction,
  SetInitialDataRequestAction,
  InitialDataActionTypes,
  InitialDataResponse
} from '../types/InitialDataTypes';
import { SetCategoriesAction } from '../../categories/types/CategoriesTypes';
import { AgreementTranslationType } from '../../customImage/types/CustomImageTypes';

const setInitialDataRequest = (): SetInitialDataRequestAction => ({
  type: SET_INITIAL_DATA_REQUEST
});

const setInitialDataSuccess = (): SetInitialDataSuccessAction => ({
  type: SET_INITIAL_DATA_SUCCESS
});

const setInitialDataFailure = (error: string): SetInitialDataFailureAction => ({
  type: SET_INITIAL_DATA_FAILURE,
  payload: error
});

const loadInitialData = (
  dispatchInitData: Dispatch<InitialDataActionTypes>,
  setCategories: SetCategoriesAction,
  setAgreement: AgreementTranslationType
) => async (
  language: string,
  isPhotoCardsHidden: boolean
): Promise<void> => {
  try {
    dispatchInitData(setInitialDataRequest());
    const {
      categories,
      tosAgreement
    }: InitialDataResponse = await getInitialData(
      language,
      isPhotoCardsHidden
    );
    setCategories(categories);
    dispatchInitData(setInitialDataSuccess());
    setAgreement(tosAgreement);
    AdobeAnalytics.getInstance().selectStyle();
  } catch (err) {
    dispatchInitData(setInitialDataFailure(err));
  }
};

export const InitialDataActions = {
  loadInitialData,
  setInitialDataRequest,
  setInitialDataSuccess,
  setInitialDataFailure
};
