import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Button } from '@material-ui/core';
import TranslatedTypography from '../UI/TranslatedTypography';
import NavBar from '.';

interface IntlMock {
  useTranslation: () => void;
}

interface TranslationMock {
  t: () => void;
}

interface ReactRouterDom {
  useLocation: () => void;
  useRouteMatch: () => void;
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

describe('<NavBar />', () => {
  const NavbarComponent = renderer.create(<NavBar pageTitle="" />).toJSON();
  const wrapper = mount(<NavBar pageTitle="" />);

  it('should render Navbar component correctly', () => {
    expect(NavbarComponent).toMatchSnapshot();
  });

  it('should render one TranslatedTypography component', () => {
    expect(wrapper.find(TranslatedTypography)).toHaveLength(1);
  });

  it('should render one Button component', () => {
    expect(wrapper.find(Button)).toHaveLength(2);
  });
});
