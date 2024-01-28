import { SET_CARD } from '../constants/CardConstants';
import { CardInitialState, SetCardAction } from '../types/CardTypes';

// Initial state
export const initialState: CardInitialState = {
  card: {
    id: '',
    type: '',
    attributes: [],
    name: '',
    category: [],
    culture: [],
    tags: [],
    font: {
      family: 'Roboto Slab',
      size: 14,
      color: '#000',
      weight: 400
    },
    textarea_offset: {
      top: 0,
      bottom: 0
    }
  }
};

export default (state = initialState, action: SetCardAction): CardInitialState => {
  switch (action.type) {
    case SET_CARD:
      return {
        ...state,
        card: action.payload
      };

    default:
      return state;
  }
};
