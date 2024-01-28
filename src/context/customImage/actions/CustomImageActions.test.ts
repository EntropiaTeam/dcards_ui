import ReactCropper from 'react-cropper';
import {
  SET_CROPPER,
  SET_IMAGE_FILE,
  SET_CUSTOM_IMAGE_ERRORS,
  SET_TERM_AGREEMENT,
  SET_CROPPED_IMAGE,
  SET_CROPPER_BACK_IMAGE_URL,
  SET_ZOOM_VALUE,
  SET_ROTATION_VALUE,
  SET_CROPPED_CANVAS_DATA,
  SET_AGREEMENT_TRANSLATION,
  RESET_CUSTOM_IMAGE_STATE
} from '../constants/CustomImageConstants';
import { CustomImageActions } from './CustomImageActions';
import {
  Agreement,
  CropperCanvasData,
  CustomImageActionTypes
} from '../types/CustomImageTypes';

describe('CustomImage action creators', () => {
  it('should create an action to set a cropper', () => {
    const cropper = ReactCropper as unknown as Cropper;

    const expectedAction: CustomImageActionTypes = {
      type: SET_CROPPER,
      payload: cropper
    };

    expect(CustomImageActions.setCropperInstance(cropper)).toEqual(expectedAction);
  });

  it('should create an action to set a uploaded image', () => {
    const imageFile = 'base64:image';

    const expectedAction: CustomImageActionTypes = {
      type: SET_IMAGE_FILE,
      payload: imageFile
    };

    expect(CustomImageActions.setImage(imageFile)).toEqual(expectedAction);
  });

  it('should create an action to set errors', () => {
    const errors: string[] = ['The error is occured'];

    const expectedAction: CustomImageActionTypes = {
      type: SET_CUSTOM_IMAGE_ERRORS,
      payload: errors
    };

    expect(CustomImageActions.setError(errors)).toEqual(expectedAction);
  });

  it('should create an action to set agreement', () => {
    const payload = true;

    const expectedAction: CustomImageActionTypes = {
      type: SET_TERM_AGREEMENT,
      payload
    };

    expect(CustomImageActions.setTermAgreement(payload)).toEqual(expectedAction);
  });

  it('should create an action to set cropped image', () => {
    const blob = new Blob();

    const expectedAction: CustomImageActionTypes = {
      type: SET_CROPPED_IMAGE,
      payload: blob
    };

    expect(CustomImageActions.setCroppedImage(blob)).toEqual(expectedAction);
  });

  it('should create an action to set cropper back-image URL', () => {
    const cropperBackImageURL = 'base64:image';

    const expectedAction: CustomImageActionTypes = {
      type: SET_CROPPER_BACK_IMAGE_URL,
      payload: cropperBackImageURL
    };

    expect(CustomImageActions.setCropperBackImageURL(cropperBackImageURL)).toEqual(expectedAction);
  });

  it('should create an action to set zoom value', () => {
    const ratio = 0.5;

    const expectedAction: CustomImageActionTypes = {
      type: SET_ZOOM_VALUE,
      payload: ratio
    };

    expect(CustomImageActions.setZoomValue(ratio)).toEqual(expectedAction);
  });

  it('should create an action to set rotation degree value', () => {
    const rotationDegree = 90;

    const expectedAction: CustomImageActionTypes = {
      type: SET_ROTATION_VALUE,
      payload: rotationDegree
    };

    expect(CustomImageActions.setRotationDegreeValue(rotationDegree)).toEqual(expectedAction);
  });

  it('should create an action to set cropper canvas data', () => {
    const cropperCanvasData: CropperCanvasData = {
      left: 0,
      top: 100,
      width: 302,
      height: 496,
      naturalWidth: 2554,
      naturalHeight: 1259
    };

    const expectedAction: CustomImageActionTypes = {
      type: SET_CROPPED_CANVAS_DATA,
      payload: cropperCanvasData
    };

    expect(CustomImageActions.setCropperCanvasData(cropperCanvasData)).toEqual(expectedAction);
  });

  it('should create an action to set tos agreement translation', () => {
    const agreement: Agreement = {
      agreement: {
        title: 'title',
        subTitle: 'subTitle',
        updatedAtTitle: '1000000',
        updatedAtDate: {
          day: 25,
          month: 4,
          year: 2021
        },
        tos: 'tos'
      }
    };

    const expectedAction: CustomImageActionTypes = {
      type: SET_AGREEMENT_TRANSLATION,
      payload: agreement
    };

    expect(CustomImageActions.setTosAgreementTranslation(agreement)).toEqual(expectedAction);
  });

  it('should create an action to reset custom image state', () => {
    const expectedAction: CustomImageActionTypes = {
      type: RESET_CUSTOM_IMAGE_STATE
    };

    expect(CustomImageActions.resetState()).toEqual(expectedAction);
  });
});
