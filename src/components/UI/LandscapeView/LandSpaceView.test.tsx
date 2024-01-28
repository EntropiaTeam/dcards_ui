import React from 'react';
import renderer from 'react-test-renderer';
import LandSpaceView from '.';

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

describe('<LandSpaceView />', () => {
  const LandSpaceViewComponent = renderer.create(<LandSpaceView />).toJSON();

  it('should render LandSpaceView component correctly', () => {
    expect(LandSpaceViewComponent).toMatchSnapshot();
  });
});
