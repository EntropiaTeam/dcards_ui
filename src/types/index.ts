import { ReactCropperProps } from 'react-cropper';

export type EditorValidationConfig = {
  fullScreenMaxHeight: number;
  smScreenMaxHeight: number;
  lgScreenMaxHeight: number;
};

export type CardConfig = {
  id: string;
  name: string;
  frontImageUrl: string;
  innerImageUrl: string;
  textarea: {
    top: number;
    height: number;
  };
  sizes: {
    width: number;
    height: number;
    xsWidth: number;
    xsHeight: number;
  };
  font: {
    family: string;
    size: number;
    color: string;
    weight: number;
  };
  lineHeight: {
    sizeRatio: number;
  };
};

export type GlobalFontConfig = {
  family: string;
  src: string;
  weight: number;
};

export type ImageConfig = {
  width: number;
  height: number;
  xsWidth?: number;
  xsHeight?: number;
  rotation?: number;
  transform?: boolean;
  leftMargin?: number;
};

export type CropperConfig = ReactCropperProps;
