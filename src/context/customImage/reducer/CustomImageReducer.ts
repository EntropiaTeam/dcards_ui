import {
  SET_CUSTOM_IMAGE_ERRORS,
  SET_IMAGE_FILE,
  SET_CROPPER,
  SET_TERM_AGREEMENT,
  SET_CROPPED_IMAGE,
  SET_CROPPED_CANVAS_DATA,
  SET_ROTATION_VALUE,
  SET_ZOOM_VALUE,
  RESET_CUSTOM_IMAGE_STATE,
  SET_AGREEMENT_TRANSLATION,
  SET_CROPPER_BACK_IMAGE_URL
} from '../constants/CustomImageConstants';
import { CustomImageInitialState, CustomImageActionTypes } from '../types/CustomImageTypes';

// Initial state
export const initialState: CustomImageInitialState = {
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

export default (state = initialState, action: CustomImageActionTypes): CustomImageInitialState => {
  switch (action.type) {
    case SET_CROPPER:
      return {
        ...state,
        cropper: action.payload
      };
    case SET_CROPPER_BACK_IMAGE_URL:
      return {
        ...state,
        cropperBackImageURL: action.payload
      };
    case SET_CROPPED_CANVAS_DATA:
      return {
        ...state,
        cropperCanvasData: action.payload
      };
    case SET_IMAGE_FILE:
      return {
        ...state,
        userImage: action.payload
      };
    case SET_ROTATION_VALUE:
      return {
        ...state,
        rotationValue: action.payload
      };
    case SET_ZOOM_VALUE:
      return {
        ...state,
        zoomValue: action.payload
      };
    case SET_CROPPED_IMAGE:
      return {
        ...state,
        croppedImage: action.payload
      };

    case SET_CUSTOM_IMAGE_ERRORS:
      return {
        ...state,
        errors: action.payload
      };

    case SET_TERM_AGREEMENT:
      return {
        ...state,
        agreement: action.payload
      };

    case SET_AGREEMENT_TRANSLATION:
      return {
        ...state,
        agreementTranslation: action.payload
      };

    case RESET_CUSTOM_IMAGE_STATE:
      return {
        ...initialState,
        agreement: state.agreement,
        agreementTranslation: state.agreementTranslation
      };

    default:
      return state;
  }
};
