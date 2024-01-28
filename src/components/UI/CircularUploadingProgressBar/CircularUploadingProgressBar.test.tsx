import React from 'react';
import renderer from 'react-test-renderer';
import CircularUploadingProgressBar from '.';

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

describe('<CircularUploadingProgressBar />', () => {
  const CircularUploadingProgressBarComponent = renderer.create(
    <CircularUploadingProgressBar />
  ).toJSON();

  it('should render CircularUploadingProgressBar component correctly', () => {
    expect(CircularUploadingProgressBarComponent).toMatchSnapshot();
  });
});
