import React from 'react';
import renderer from 'react-test-renderer';
import CropperContainer from '../index';
import { CustomImageContext, CustomImageActionsContext } from '../../../context/customImage';
import { initialState as customImageInitialState } from '../../../context/customImage/reducer/CustomImageReducer';
import { CustomImageInitialState } from '../../../context/customImage/types/CustomImageTypes';
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

  it('should render CropperControls component if there is no errors', () => {
    const state: CustomImageInitialState = {
      ...customImageInitialState,
      userImage: 'base64:image'
    };
    const cropperRenderer = renderer.create(
      <CustomImageContext.Provider value={state}>
        <CustomImageActionsContext.Provider value={{ setCropper: () => null }}>
          <CropperContainer
            cropperConfig={config.cropper}
            cardConfig={config.card}
            imageUrl={frontImageUrl}
          />
        </CustomImageActionsContext.Provider>
      </CustomImageContext.Provider>
    );
    expect(cropperRenderer.toJSON()).toMatchSnapshot();
  });
});
