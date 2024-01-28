import { Dispatch } from 'react';
import {
  SET_CATEGORIES_SUCCESS
} from '../constants/CategoriesConstants';
import {
  SetCategoriesSuccessAction,
  CategoriesActionTypes,
  Category
} from '../types/CategoriesTypes';

export const setCategoriesSuccess = (
  response: Category[]
): SetCategoriesSuccessAction => ({
  type: SET_CATEGORIES_SUCCESS,
  payload: response
});

const setCategories = (dispatch: Dispatch<CategoriesActionTypes>) => (
  response: Category[]
): void => {
  dispatch(setCategoriesSuccess(response));
};

export const CategoriesActions = {
  setCategories
};
