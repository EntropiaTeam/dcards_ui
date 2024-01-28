import { SET_CARD } from '../constants/CardConstants';
import { CardInitialState, SetCardAction } from '../types/CardTypes';
import reducer from './CardReducer';

describe('Card Reducer', () => {
  const initialState: CardInitialState = {
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

  it('should return the initial state', () => {
    expect(reducer(initialState, {} as SetCardAction)).toEqual(initialState);
  });

  it('should handle SET_CARD', () => {
    const payload = {
      id: 'birthday_general_A',
      type: 'portrait',
      name: 'Birthday_general_A (purplish, bubbly)',
      category: ['a_hb_general', 'b_hb_kids'],
      culture: ['en-US', 'en-CA', 'fr-CA'],
      attributes: [],
      tags: ['bday'],
      font: {
        size: 14,
        color: '#000',
        family: 'Roboto Slab',
        weight: 500
      },
      textarea_offset: {
        top: 572
      }
    };

    const setCardAction: SetCardAction = {
      type: SET_CARD,
      payload
    };

    expect(reducer(initialState, setCardAction)).toEqual({ card: payload });
  });
});
