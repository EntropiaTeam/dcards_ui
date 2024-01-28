import {
  SET_CATEGORIES_SUCCESS
} from '../constants/CategoriesConstants';
import { CategoriesInitialState, CategoriesActionTypes } from '../types/CategoriesTypes';

// Initial state
export const initialState: CategoriesInitialState = {
  categories: []
};

export default (state = initialState, action: CategoriesActionTypes): CategoriesInitialState => {
  switch (action.type) {
    case SET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload
      };
    default:
      return state;
  }
};
