import React from 'react';
import renderer from 'react-test-renderer';
import CropperContainer from '../index';
import { AppConfig } from '../../../utils/AppConfig';

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

describe('<CropperContainer />', () => {
  const config = new AppConfig();

  const frontImageUrl = 'https://steu2sprntdevstore01.blob.core.windows.net/assets/i/Halloween_A_editor_front.png';

  it('should render Cropper container correctly', () => {
    const CropperComponent = renderer.create(
      <CropperContainer
        cropperConfig={config.cropper}
        cardConfig={config.card}
        imageUrl={frontImageUrl}
      />
    ).toJSON();

    expect(CropperComponent).toMatchSnapshot();
  });
});
