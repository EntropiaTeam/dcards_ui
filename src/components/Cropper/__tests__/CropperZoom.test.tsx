import React, { useReducer } from 'react';
import { mount } from 'enzyme';
import { CustomImageActions } from '../../../context/customImage/actions/CustomImageActions';
import CropperContainer from '../index';
import {
  CustomImageContext,
  CustomImageActionsContext
} from '../../../context/customImage';
import CustomImageReducer, {
  initialState
} from '../../../context/customImage/reducer/CustomImageReducer';
import { AppConfig } from '../../../utils/AppConfig';
import { ZoomInIcon, ZoomOutIcon } from '../../UI/Icons';
import { CustomImageActionsType } from '../../../context/customImage/types/CustomImageTypes';

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

  let cropper;

  const Component = ({ zoomValue = 0.5 }) => {
    const [state, dispatch] = useReducer(CustomImageReducer, {
      ...initialState,
      userImage: 'base64:image',
      zoomValue
    });
    const actions: CustomImageActionsType = {
      setCropper: (cr) => {
        cropper = cr;
        CustomImageActions.setCropper(dispatch)(cropper);
      },
      setErrors: CustomImageActions.setErrors(dispatch),
      setUserImage: CustomImageActions.setUserImage(dispatch),
      setAgreement: CustomImageActions.setAgreement(dispatch),
      setAgreementTranslation: CustomImageActions.setAgreementTranslation(dispatch),
      setCroppedImage: CustomImageActions.setCroppedImageValue(dispatch),
      setCropperBackImageURL: CustomImageActions.setCropperBackImageValue(dispatch),
      setRotationDegree: CustomImageActions.setRotationDegree(dispatch),
      setZoomRatio: CustomImageActions.setZoomRatio(dispatch),
      setCroppedCanvasData: CustomImageActions.setCroppedCanvasData(dispatch),
      resetCustomImageState: CustomImageActions.resetCustomImageState(dispatch)
    };
    return (
      <CustomImageContext.Provider value={state}>
        <CustomImageActionsContext.Provider value={actions}>
          <CropperContainer
            cropperConfig={config.cropper}
            cardConfig={config.card}
            imageUrl={frontImageUrl}
          />
        </CustomImageActionsContext.Provider>
      </CustomImageContext.Provider>
    );
  };

  it('should zoom in CropperControls component', () => {
    const wrapper = mount(<Component />);
    const zoomSpy = jest.spyOn(cropper, 'zoom').mockImplementation(() => {});

    wrapper.find(ZoomInIcon).simulate('click');
    expect(zoomSpy).toHaveBeenCalledTimes(1);
    expect(zoomSpy).toHaveBeenLastCalledWith(0.1);
  });

  it('should not zoom in CropperControls component when zoomValue to high', () => {
    const wrapper = mount(<Component zoomValue={1.1} />);
    const zoomSpy = jest.spyOn(cropper, 'zoom').mockImplementation(() => {});

    wrapper.find(ZoomInIcon).simulate('click');
    expect(zoomSpy).toHaveBeenCalledTimes(0);
  });

  it('should zoom out CropperControls component', () => {
    const wrapper = mount(<Component />);
    const zoomSpy = jest.spyOn(cropper, 'zoom').mockImplementation(() => {});

    wrapper.find(ZoomOutIcon).simulate('click');
    expect(zoomSpy).toHaveBeenCalledTimes(1);
    expect(zoomSpy).toHaveBeenLastCalledWith(-0.1);
  });

  it('should not zoom out CropperControls component when zoomValue to low', () => {
    const wrapper = mount(<Component zoomValue={0} />);
    const zoomSpy = jest.spyOn(cropper, 'zoom').mockImplementation(() => {});

    wrapper.find(ZoomOutIcon).simulate('click');
    expect(zoomSpy).toHaveBeenCalledTimes(0);
  });
});
