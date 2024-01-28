import {
  SET_CROPPER,
  SET_CROPPER_BACK_IMAGE_URL,
  SET_IMAGE_FILE,
  SET_CUSTOM_IMAGE_ERRORS,
  SET_TERM_AGREEMENT,
  SET_CROPPED_IMAGE,
  SET_CROPPED_CANVAS_DATA,
  SET_ROTATION_VALUE,
  SET_ZOOM_VALUE,
  RESET_CUSTOM_IMAGE_STATE,
  SET_AGREEMENT_TRANSLATION
} from '../constants/CustomImageConstants';

export type CropperCanvasData = {
  left: number;
  top: number;
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
};

export type CustomImageInitialState = {
  cropper: Cropper | null;
  cropperBackImageURL: string | null;
  userImage: string;
  croppedImage: Blob | null;
  cropperCanvasData: CropperCanvasData;
  rotationValue: number;
  zoomValue: number;
  errors: string[];
  agreement: boolean | null;
  agreementTranslation: Agreement | null;
};

export type Agreement = {
  agreement: {
    title: string;
    subTitle: string;
    updatedAtTitle: string;
    updatedAtDate: UpdatedAtDate;
    tos: string;
  };
};

export type UpdatedAtDate = {
  day: number;
  month: number;
  year: number;
};

export type AgreementTranslationType = (agreement: Agreement) => void;

export type CustomImageActionsType = {
  setCropper: (instance: Cropper | null) => void;
  setUserImage: (userImageBase64: string) => void;
  setCroppedImage: (croppedImageBlob: Blob | null) => void;
  setCroppedCanvasData: (canvasData: CropperCanvasData) => void;
  setCropperBackImageURL: (cropperBackImageURL: string | null) => void;
  setZoomRatio: (ratio: number) => void;
  setRotationDegree: (rotationValue: number) => void;
  setErrors: (errors: string[]) => void;
  setAgreement: (agreement: boolean) => void;
  setAgreementTranslation: AgreementTranslationType;
  resetCustomImageState: () => void;
};

// Context Type
export type UseCustomImageContext = {
  state: CustomImageInitialState;
  actions: CustomImageActionsType;
};

// Action creators' Types
export type SetCropperAction = {
  type: typeof SET_CROPPER;
  payload: Cropper | null;
};

export type SetUserImageAction = {
  type: typeof SET_IMAGE_FILE;
  payload: string;
};

export type SetZoomValueAction = {
  type: typeof SET_ZOOM_VALUE;
  payload: number;
};

export type SetRotationDegreeAction = {
  type: typeof SET_ROTATION_VALUE;
  payload: number;
};

export type SetErrorsAction = {
  type: typeof SET_CUSTOM_IMAGE_ERRORS;
  payload: string[];
};

export type SetTermAgreementAction = {
  type: typeof SET_TERM_AGREEMENT;
  payload: boolean;
};

export type SetAgreementTranslationAction = {
  type: typeof SET_AGREEMENT_TRANSLATION;
  payload: Agreement;
};

export type SetCroppedImageAction = {
  type: typeof SET_CROPPED_IMAGE;
  payload: Blob | null;
};

export type SetCropperBackImageURLAction = {
  type: typeof SET_CROPPER_BACK_IMAGE_URL;
  payload: string | null;
};

export type ResetCustomImageStateAction = {
  type: typeof RESET_CUSTOM_IMAGE_STATE;
};

export type SetCroppedCanvasDataAction = {
  type: typeof SET_CROPPED_CANVAS_DATA;
  payload: CropperCanvasData;
};

export type CustomImageActionTypes = SetCropperAction |
SetUserImageAction |
SetErrorsAction |
SetTermAgreementAction |
SetAgreementTranslationAction |
SetCroppedImageAction |
SetCropperBackImageURLAction |
SetCroppedCanvasDataAction |
SetRotationDegreeAction |
ResetCustomImageStateAction |
SetZoomValueAction;
