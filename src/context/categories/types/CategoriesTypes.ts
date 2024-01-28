import { SET_CATEGORIES_SUCCESS } from '../constants/CategoriesConstants';
import { SingleCard } from '../../card/types/CardTypes';

export type Category = {
  id: string;
  name: string;
  sequence: number;
  occasion_maps: {
    [key: string]: number[];
  };
  preview_cards: string[];
  cards: SingleCard[];
};

export type CategoriesInitialState = {
  categories: Category[];
};

export type CategoriesActionsType = {
  setCategories: SetCategoriesAction;
};

export type SetCategoriesAction = (categories: Category[]) => void;

// Context Type
export type UseCategoriesContext = {
  state: CategoriesInitialState;
  actions: CategoriesActionsType;
};

// Action creators' Types
export type SetCategoriesSuccessAction = {
  type: typeof SET_CATEGORIES_SUCCESS;
  payload: Category[];
};

export type CategoriesActionTypes = SetCategoriesSuccessAction;
