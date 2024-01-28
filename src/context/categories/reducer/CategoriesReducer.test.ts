import {
  SET_CATEGORIES_SUCCESS
} from '../constants/CategoriesConstants';
import {
  CategoriesInitialState, CategoriesActionTypes, SetCategoriesSuccessAction, Category
} from '../types/CategoriesTypes';
import reducer from './CategoriesReducer';

describe('Categories Reducer', () => {
  const initialState: CategoriesInitialState = {
    categories: []
  };

  it('should return the initial state', () => {
    expect(reducer(initialState, {} as CategoriesActionTypes)).toEqual(initialState);
  });

  it('should handle SET_CATEGORIES_SUCCESS', () => {
    const payload: Category[] = [
      {
        id: 'a_hb_general',
        name: 'Happy Birthday',
        sequence: 100,
        occasion_maps: {
          enUS: [55],
          enCA: [55],
          frCA: [55]
        },
        preview_cards: [
          'birthday_general_B',
          'birthday_hers_B'
        ],
        cards: [{
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
        }]
      }
    ];

    const setCategoriesSuccessAction: SetCategoriesSuccessAction = {
      type: SET_CATEGORIES_SUCCESS,
      payload
    };

    expect(reducer(initialState, setCategoriesSuccessAction)).toEqual({
      categories: payload
    });
  });
});
