import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Grid } from '@material-ui/core';
import CategoryPreview from './index';
import { CardActionsContext } from '../../context/card';

interface ReactRouterDom {
  useHistory: () => void;
  useRouteMatch: () => void;
}

const category = {
  id: 'custom_photo',
  name: 'Custom Photo',
  culture_names: [
    { 'en-US': 'Custom Photo' },
    { 'en-CA': 'Custom Photo' },
    { 'fr-CA': 'Photo personnalisée' }
  ],
  occasion_maps: { 'en-US': [], 'en-CA': [], 'fr-CA': [] },
  preview_cards: ['blank_photo_portrait'],
  start_date: '',
  end_date: '',
  sequence: 40,
  cards: [
    {
      id: 'blank_photo_portrait',
      name: 'Full frame photo card',
      type: 'portrait',
      attributes: ['photo'],
      category: ['custom_photo', 'valentines_day', 'g_congrats_general', 'h_congrats_wedding'],
      tags: ['custom'],
      culture: ['en-US', 'en-CA'],
      font: {
        family: 'Roboto Slab',
        size: '14',
        weight: '500',
        color: '#000'
      }
    }
  ]
};

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', (): ReactRouterDom => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  }),
  useRouteMatch: jest.fn().mockReturnValue(true)
}));

describe('<CategoryPreview />', () => {
  const setCardToEdit = jest.fn(() => {});

  it('should render CategoryPreview component', () => {
    const categoryPreviewRenderer = renderer.create(
      <CategoryPreview category={category} />
    );
    expect(categoryPreviewRenderer.toJSON()).toMatchSnapshot();
  });

  it('should move from CategoryPreview to card page', () => {
    const wrapper = mount(
      <CardActionsContext.Provider value={{ setCardToEdit }}>
        <CategoryPreview category={category} />
      </CardActionsContext.Provider>
    );

    wrapper.find(Grid).simulate('click');
    expect(setCardToEdit).toHaveBeenCalledTimes(1);
    expect(setCardToEdit).toHaveBeenCalledWith(category.cards[0]);
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith({
      pathname: '/categories/custom_photo/cards/agreement',
      state: { targetLocation: '/categories/custom_photo/cards/blank_photo_portrait/edit/photo' }
    });
  });
});
