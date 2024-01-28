import React from 'react';
import renderer from 'react-test-renderer';
import FrontPageAnimation from '.';

interface ReactRouterDom {
  useHistory: () => void;
  useRouteMatch: () => void;
}

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

jest.mock('react-router-dom', (): ReactRouterDom => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa'
  }),
  useRouteMatch: jest.fn().mockReturnValue(true)
}));

describe('<FrontPageAnimation />', () => {
  const FrontPageAnimationComponent = renderer.create(<FrontPageAnimation />).toJSON();

  it('should render FrontPageAnimation component correctly', () => {
    expect(FrontPageAnimationComponent).toMatchSnapshot();
  });
});
