import { SET_CARD } from '../constants/CardConstants';
import { CardActions } from './CardActions';
import { SingleCard, SetCardAction } from '../types/CardTypes';

describe('Card action creators', () => {
  it('should create an action to set a card', () => {
    const card: SingleCard = {
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

    const expectedAction: SetCardAction = {
      type: SET_CARD,
      payload: card
    };

    expect(CardActions.setCard(card)).toEqual(expectedAction);
  });
});
