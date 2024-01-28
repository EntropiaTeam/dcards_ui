import { SET_INITIAL_DATA_SUCCESS, SET_INITIAL_DATA_FAILURE, SET_INITIAL_DATA_REQUEST } from '../constants/InitialDataConstants';
import { Category } from '../../categories/types/CategoriesTypes';
import { Agreement } from '../../customImage/types/CustomImageTypes';

export type InitialDataActionsType = {
  loadInitialData: (language: string, isPhotoCardsHidden: boolean) => void;
};

// Action creators' Types
export type InitialDataPrimaryState = {
  isLoading: boolean;
  error: string;
};

export type SetInitialDataRequestAction = {
  type: typeof SET_INITIAL_DATA_REQUEST;
};

export type SetInitialDataSuccessAction = {
  type: typeof SET_INITIAL_DATA_SUCCESS;
};

export type SetInitialDataFailureAction = {
  type: typeof SET_INITIAL_DATA_FAILURE;
  payload: string;
};

// Context Type
export type UseInitialDataContext = {
  state: InitialDataPrimaryState;
  actions: InitialDataActionsType;
};

// API Response Type
export type InitialDataResponse = {
  categories: Category[];
  tosAgreement: Agreement;
  cloudinaryFeatureFlag: boolean;
};

export type InitialDataActionTypes =
  SetInitialDataSuccessAction |
  SetInitialDataFailureAction |
  SetInitialDataRequestAction;
