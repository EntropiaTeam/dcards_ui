import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import CardsList from '.';
import { CardProvider } from '../../context/card';

const mockHistoryPush = jest.fn();

interface ReactRouterDom {
  useHistory: () => void;
  useRouteMatch: () => void;
}

jest.mock('react-router-dom', (): ReactRouterDom => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  }),
  useRouteMatch: jest.fn().mockReturnValue(true)
}));

describe('<CardsList />', () => {
  const props = {
    cards: [{
      category: 'Test',
      id: 0,
      attributes: ['Photo']
    },
    {
      category: 'Test2',
      id: 1,
      attributes: ['Photo']
    }]
  };

  const CardsListComponent = renderer.create(
    <CardProvider>
      <CardsList {...props} />
    </CardProvider>
  ).toJSON();

  const wrapper = mount(
    <CardProvider>
      <CardsList {...props} />
    </CardProvider>
  );
  const firstCard = wrapper.find('.MuiGrid-item');

  it('should track history change on Enter pressed', () => {
    act(() => {
      firstCard.first().props().onKeyDown({ key: 'Enter' });
    });
    expect(mockHistoryPush).toHaveBeenCalled();
  });

  it('should render correct number cards', () => {
    expect(firstCard).toHaveLength(props.cards.length);
  });

  it('should render CardsList component correctly', () => {
    expect(CardsListComponent).toMatchSnapshot();
  });

  it('should render CardsList component with proper cards prop', () => {
    expect((wrapper).childAt(0).prop('cards')).toEqual(props.cards);
  });
});
