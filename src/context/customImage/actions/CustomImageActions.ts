import { Dispatch } from 'react';
import {
  SET_CROPPER,
  SET_CROPPER_BACK_IMAGE_URL,
  SET_IMAGE_FILE,
  SET_CUSTOM_IMAGE_ERRORS,
  SET_TERM_AGREEMENT,
  SET_AGREEMENT_TRANSLATION,
  SET_CROPPED_IMAGE,
  SET_CROPPED_CANVAS_DATA,
  SET_ZOOM_VALUE,
  SET_ROTATION_VALUE,
  RESET_CUSTOM_IMAGE_STATE
} from '../constants/CustomImageConstants';
import {
  SetCropperAction,
  SetUserImageAction,
  SetErrorsAction,
  SetTermAgreementAction,
  SetCroppedImageAction,
  SetRotationDegreeAction,
  SetZoomValueAction,
  SetCroppedCanvasDataAction,
  CropperCanvasData,
  ResetCustomImageStateAction,
  Agreement,
  SetAgreementTranslationAction,
  SetCropperBackImageURLAction
} from '../types/CustomImageTypes';

const setCropperInstance = (cropper: Cropper | null): SetCropperAction => ({
  type: SET_CROPPER,
  payload: cropper
});

const setImage = (userImageBase64: string): SetUserImageAction => ({
  type: SET_IMAGE_FILE,
  payload: userImageBase64
});

const setCroppedImage = (croppedImage: Blob | null): SetCroppedImageAction => ({
  type: SET_CROPPED_IMAGE,
  payload: croppedImage
});

const setCropperBackImageURL = (cropperBackImageURL: string | null)
: SetCropperBackImageURLAction => ({
  type: SET_CROPPER_BACK_IMAGE_URL,
  payload: cropperBackImageURL
});

const setZoomValue = (ratio: number): SetZoomValueAction => ({
  type: SET_ZOOM_VALUE,
  payload: ratio
});

const setRotationDegreeValue = (rotationDegree: number): SetRotationDegreeAction => ({
  type: SET_ROTATION_VALUE,
  payload: rotationDegree
});

const setCropperCanvasData = (canvasData: CropperCanvasData): SetCroppedCanvasDataAction => ({
  type: SET_CROPPED_CANVAS_DATA,
  payload: canvasData
});

const setError = (errors: string[]): SetErrorsAction => ({
  type: SET_CUSTOM_IMAGE_ERRORS,
  payload: errors
});

const setTermAgreement = (agreement: boolean): SetTermAgreementAction => ({
  type: SET_TERM_AGREEMENT,
  payload: agreement
});

export const setTosAgreementTranslation = (agreement: Agreement):
SetAgreementTranslationAction => ({
  type: SET_AGREEMENT_TRANSLATION,
  payload: agreement
});

const resetState = (): ResetCustomImageStateAction => ({
  type: RESET_CUSTOM_IMAGE_STATE
});

const setCropper = (dispatch: Dispatch<SetCropperAction>) => (
  cropper: Cropper | null
): void => {
  dispatch(setCropperInstance(cropper));
};

const setCropperBackImageValue = (dispatch: Dispatch<SetCropperBackImageURLAction>) => (
  cropperBackImageURL: string | null
): void => {
  dispatch(setCropperBackImageURL(cropperBackImageURL));
};

const setZoomRatio = (dispacth: Dispatch<SetZoomValueAction>) => (
  ratio: number
): void => {
  dispacth(setZoomValue(ratio));
};

const setRotationDegree = (dispacth: Dispatch<SetRotationDegreeAction>) => (
  rotationDegree: number
): void => {
  dispacth(setRotationDegreeValue(rotationDegree));
};

const setCroppedCanvasData = (dispacth: Dispatch<SetCroppedCanvasDataAction>) => (
  canvasData: CropperCanvasData
): void => {
  dispacth(setCropperCanvasData(canvasData));
};

const setCroppedImageValue = (dispatch: Dispatch<SetCroppedImageAction>) => (
  croppedImage: Blob | null
): void => {
  dispatch(setCroppedImage(croppedImage));
};

const setUserImage = (dispatch: Dispatch<SetUserImageAction>) => (
  userImageBase64: string
): void => {
  dispatch(setImage(userImageBase64));
};

const setErrors = (dispatch: Dispatch<SetErrorsAction>) => (
  errors: string[]
): void => {
  dispatch(setError(errors));
};

const setAgreement = (dispatch: Dispatch<SetTermAgreementAction>) => (
  agreement: boolean
): void => {
  dispatch(setTermAgreement(agreement));
};

const setAgreementTranslation = (dispatch: Dispatch<SetAgreementTranslationAction>) => (
  agreement: Agreement
): void => {
  dispatch(setTosAgreementTranslation(agreement));
};

const resetCustomImageState = (dispatch: Dispatch<ResetCustomImageStateAction>) => (): void => {
  dispatch(resetState());
};

export const CustomImageActions = {
  setErrors,
  setUserImage,
  setCropper,
  setCropperInstance,
  setImage,
  setError,
  setAgreement,
  setTermAgreement,
  setAgreementTranslation,
  setTosAgreementTranslation,
  setCroppedCanvasData,
  setCropperCanvasData,
  setCroppedImageValue,
  setCropperBackImageValue,
  setCropperBackImageURL,
  setCroppedImage,
  setZoomRatio,
  setRotationDegree,
  setZoomValue,
  setRotationDegreeValue,
  resetState,
  resetCustomImageState
};
