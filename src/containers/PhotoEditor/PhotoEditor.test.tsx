import React from 'react';
import { mount } from 'enzyme';
import PhotoEditor from '.';
import { GlobalProvider } from '../../context/GlobalProvider';
import Cropper from '../../components/Cropper';
import { CardImage } from '../../components';
import { CardContext } from '../../context/card';

interface IntlMock {
  useTranslation: () => void;
  useRouteMatch: () => void;
}

interface TranslationMock {
  t: () => void;
}

interface ReactRouterDom {
  useLocation: () => void;
  useRouteMatch: () => void;
  useHistory: () => void;
  useParams: () => void;
}

jest.mock('react-i18next', (): IntlMock => ({
  useTranslation: (): TranslationMock => ({
    t: (key: string): string => key
  })
}));

jest.mock('react-router-dom', (): ReactRouterDom => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: jest.fn(),
  useLocation: () => ({
    pathname: '/',
    state: {
      prevPath: '/prev-route'
    }
  }),
  useHistory: jest.fn(),
  useParams: () => ({
    cardId: 'Birthday'
  })
}));

describe('<PhotoEditor />', () => {
  let wrapper;

  const cardState = {
    card: {
      id: 'birthday_general_A',
      name: 'Birthday_general_A (purplish, bubbly)',
      attributes: [],
      type: 'portrait',
      category: ['a_hb_general', 'b_hb_kids', 'c_hb_her', 'd_hb_him'],
      culture: ['en-US', 'en-CA', 'fr-CA'],
      font: {
        family: 'Roboto Slab',
        size: 14,
        color: '#000',
        weight: 500
      }
    }
  };

  const customCardState = {
    card: {
      id: 'custom_photo',
      name: 'custom_photo',
      attributes: ['overlay'],
      type: 'portrait',
      category: ['custom_photo'],
      culture: ['en-US', 'en-CA', 'fr-CA'],
      font: {
        family: 'Roboto Slab',
        size: 14,
        weight: 500,
        color: '#000'
      }
    }
  };

  const PhotoEditorWithImageCard = () => (
    <GlobalProvider>
      <CardContext.Provider value={cardState}>
        <PhotoEditor />
      </CardContext.Provider>
    </GlobalProvider>
  );

  const PhotoEditorWithCustomCard = () => (
    <GlobalProvider>
      <CardContext.Provider value={customCardState}>
        <PhotoEditor />
      </CardContext.Provider>
    </GlobalProvider>
  );

  it('should render CardImage component if image card is selected', () => {
    wrapper = mount(<PhotoEditorWithImageCard />);

    expect(wrapper.find(CardImage)).toHaveLength(1);
  });

  it('should render Cropper container if custom card is selected', () => {
    wrapper = mount(<PhotoEditorWithCustomCard />);

    expect(wrapper.find(Cropper)).toHaveLength(1);
  });
});
