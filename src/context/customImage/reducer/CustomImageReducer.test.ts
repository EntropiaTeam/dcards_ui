import ReactCropper from 'react-cropper';
import {
  SET_CROPPER,
  SET_IMAGE_FILE,
  SET_CUSTOM_IMAGE_ERRORS,
  SET_TERM_AGREEMENT,
  SET_CROPPER_BACK_IMAGE_URL,
  SET_CROPPED_CANVAS_DATA,
  SET_ROTATION_VALUE,
  SET_ZOOM_VALUE,
  SET_CROPPED_IMAGE,
  SET_AGREEMENT_TRANSLATION,
  RESET_CUSTOM_IMAGE_STATE
} from '../constants/CustomImageConstants';
import reducer from './CustomImageReducer';
import {
  CustomImageInitialState,
  CustomImageActionTypes,
  CropperCanvasData,
  Agreement
} from '../types/CustomImageTypes';

describe('Custom image Reducer', () => {
  const initialState: CustomImageInitialState = {
    cropper: null,
    cropperBackImageURL: null,
    userImage: '',
    croppedImage: null,
    rotationValue: 0,
    zoomValue: 0,
    cropperCanvasData: {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0
    },
    errors: [],
    agreement: null,
    agreementTranslation: null
  };

  it('should return the initial state', () => {
    expect(reducer(initialState, {} as CustomImageActionTypes)).toEqual(initialState);
  });

  it('should handle SET_CROPPER', () => {
    const payload = ReactCropper as unknown as Cropper;

    const setCropperAction: CustomImageActionTypes = {
      type: SET_CROPPER,
      payload
    };

    expect(reducer(initialState, setCropperAction)).toEqual({ ...initialState, cropper: payload });
  });

  it('should handle SET_IMAGE_FILE', () => {
    const payload = 'base64:image';

    const setImageAction: CustomImageActionTypes = {
      type: SET_IMAGE_FILE,
      payload
    };

    expect(reducer(initialState, setImageAction)).toEqual({ ...initialState, userImage: payload });
  });

  it('should handle SET_CUSTOM_IMAGE_ERRORS', () => {
    const payload = ['The error is occured'];

    const setErrorsAction: CustomImageActionTypes = {
      type: SET_CUSTOM_IMAGE_ERRORS,
      payload
    };

    expect(reducer(initialState, setErrorsAction)).toEqual({ ...initialState, errors: payload });
  });

  it('should handle SET_TERM_AGREEMENT', () => {
    const payload = true;

    const setTermAgreementAction: CustomImageActionTypes = {
      type: SET_TERM_AGREEMENT,
      payload
    };

    expect(reducer(initialState, setTermAgreementAction)).toEqual({
      ...initialState,
      agreement: payload
    });
  });

  it('should handle SET_CROPPER_BACK_IMAGE_URL', () => {
    const payload = 'base64:image';

    const setCropperBackImageURL: CustomImageActionTypes = {
      type: SET_CROPPER_BACK_IMAGE_URL,
      payload
    };

    expect(reducer(initialState, setCropperBackImageURL)).toEqual({
      ...initialState,
      cropperBackImageURL: payload
    });
  });

  it('should handle SET_CROPPED_CANVAS_DATA', () => {
    const payload: CropperCanvasData = {
      left: 0,
      top: 100,
      width: 302,
      height: 496,
      naturalWidth: 2554,
      naturalHeight: 1259
    };

    const setCropperCanvasData: CustomImageActionTypes = {
      type: SET_CROPPED_CANVAS_DATA,
      payload
    };

    expect(reducer(initialState, setCropperCanvasData)).toEqual({
      ...initialState,
      cropperCanvasData: payload
    });
  });

  it('should handle SET_ROTATION_VALUE', () => {
    const payload = 90;

    const setRotationValue: CustomImageActionTypes = {
      type: SET_ROTATION_VALUE,
      payload
    };

    expect(reducer(initialState, setRotationValue)).toEqual({
      ...initialState,
      rotationValue: payload
    });
  });

  it('should handle SET_ZOOM_VALUE', () => {
    const payload = 0.5;

    const setZoomValue: CustomImageActionTypes = {
      type: SET_ZOOM_VALUE,
      payload
    };

    expect(reducer(initialState, setZoomValue)).toEqual({
      ...initialState,
      zoomValue: payload
    });
  });

  it('should handle SET_CROPPED_IMAGE', () => {
    const payload = new Blob();

    const setCroppedImage: CustomImageActionTypes = {
      type: SET_CROPPED_IMAGE,
      payload
    };

    expect(reducer(initialState, setCroppedImage)).toEqual({
      ...initialState,
      croppedImage: payload
    });
  });

  it('should handle SET_AGREEMENT_TRANSLATION', () => {
    const payload: Agreement = {
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

    const setAgreementTranslation: CustomImageActionTypes = {
      type: SET_AGREEMENT_TRANSLATION,
      payload
    };

    expect(reducer(initialState, setAgreementTranslation)).toEqual({
      ...initialState,
      agreementTranslation: payload
    });
  });

  it('should handle RESET_CUSTOM_IMAGE_STATE', () => {
    const resetCustomImageState: CustomImageActionTypes = {
      type: RESET_CUSTOM_IMAGE_STATE
    };

    expect(reducer(initialState, resetCustomImageState)).toEqual(initialState);
  });
});
