import { SET_CARD } from '../constants/CardConstants';

export type SingleCard = {
  id: string;
  type: string;
  name: string;
  attributes: string[];
  category: string[];
  culture: string[];
  tags: string[];
  textarea_offset: {
    top: number;
    bottom?: number;
  };
  font: {
    size: number;
    color: string;
    family: string;
    weight: number;
  };
};

export type CardInitialState = {
  card: SingleCard;
};

export type CardActionsType = {
  setCardToEdit: (card: SingleCard) => void;
};

// Context Type
export type UseCardContext = {
  state: CardInitialState;
  actions: CardActionsType;
};

// Action creator Type
export type SetCardAction = {
  type: typeof SET_CARD;
  payload: SingleCard;
};
