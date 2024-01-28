import React from 'react';
import { mount } from 'enzyme';
import CategoriesContainer from '.';
import MatchedCategory from '../../components/MatchedCategory';
import { GlobalProvider } from '../../context/GlobalProvider';
import { NavigationContext } from '../../context/navigation';

interface IntlMock {
  useTranslation: () => void;
}

interface TranslationMock {
  t: () => void;
}

jest.mock('react-i18next', (): IntlMock => ({
  useTranslation: (): TranslationMock => ({
    t: (key: string): string => key
  })
}));

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '/another-route',
    state: {
      prevPath: '/prev-route'
    }
  }),
  useHistory: jest.fn(),
  useParams: () => ({
    cardId: 'Birthday'
  })
}));

describe('Categories container', () => {
  let wrapper;

  const NavigationInitialState = {
    isBackButtonVisible: false,
    iframeParams: {
      token: '',
      locale: 'en-US',
      occasion: ''
    }
  };
  const NavigationStateWithOcassion = {
    isBackButtonVisible: false,
    iframeParams: {
      token: 'MTYxMjI1NjQ2NTk5Mw==',
      locale: 'en-US',
      occasion: '42'
    }
  };

  const CategoriesContainerWithOcassion = () => (
    <GlobalProvider>
      <NavigationContext.Provider value={NavigationStateWithOcassion}>
        <CategoriesContainer />
      </NavigationContext.Provider>
    </GlobalProvider>
  );

  const CategoriesContainerWithoutOcassionMatch = () => (
    <GlobalProvider>
      <NavigationContext.Provider value={NavigationInitialState}>
        <CategoriesContainer />
      </NavigationContext.Provider>
    </GlobalProvider>
  );

  it('should render matched categories', () => {
    wrapper = mount(<CategoriesContainerWithOcassion />);
    expect(wrapper.children().find(MatchedCategory)).toBeTruthy();
  });

  it('should not render matched categories', () => {
    wrapper = mount(<CategoriesContainerWithoutOcassionMatch />);
    expect(wrapper.find(MatchedCategory)).toHaveLength(0);
  });
});
