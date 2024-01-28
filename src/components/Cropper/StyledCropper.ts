import { FC } from 'react';
import { Cropper, ReactCropperProps } from 'react-cropper';
import styled, { css } from 'styled-components';

interface Props extends ReactCropperProps {
  imageUrl: string;
  isCustomCardWithOverlay: boolean;
  isCropperTouched: boolean;
}

const StyledCropper: FC<Props> = styled(Cropper)`
.cropper-crop-box > .cropper-view-box {
  outline: none;
}
.cropper-drag-box {
  ${({ imageUrl, isCustomCardWithOverlay, isCropperTouched }: Props) => isCustomCardWithOverlay && css`
  background-image:url(${imageUrl});
  opacity: ${isCropperTouched ? 0.7 : 1};
  transition: opacity 150ms ease-in;
  z-index: 100;
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
 `}
}
`;

export default StyledCropper;
