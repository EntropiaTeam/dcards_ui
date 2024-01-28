import React, {
  useState, useEffect, useCallback, ChangeEvent, memo, FC
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles, Theme, Box, Snackbar
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import StyledCropper from './StyledCropper';
import {
  CardImage, CropperControls, IconButton, ImageContainer, HiddenInput, Slider, TranslatedTypography
} from '..';
import { CardStyles } from '../UI/CardImage';
import {
  ZoomInIcon, ZoomOutIcon, ExclamationMarkIcon, UploadIcon
} from '../UI/Icons';
import { useCustomImageContext, useCardContext } from '../../context';
import useAppConfig from '../../hooks/useAppConfig';
import useSnackbar, { UseSnackbar } from '../../hooks/useSnackbar';
import useDebouncedFunction from '../../hooks/useDebouncedFunction';
import useWindowSize from '../../hooks/useWindowSize';
import { CropperConfig, CardConfig } from '../../types';
import FileManager from '../../utils/FileManager';
import Validator from '../../utils/Validator';
import 'cropperjs/dist/cropper.css';

const useStyles = makeStyles((theme: Theme) => ({
  cropperContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  slider: {
    height: 344,
    [theme.breakpoints.only('xs')]: {
      height: 304
    }
  },
  zoomIconBtn: {
    background: 'none',
    color: '#000',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#c8102e'
    },
    '&:focus': {
      background: 'rgba(200, 16, 46, 0.05)',
      color: '#c8102e',
      borderRadius: '50%'
    },
    '&:active': {
      background: 'rgba(200, 16, 46, 0.1)',
      color: '#c8102e',
      borderRadius: '50%'
    }
  },
  imgContainer: {
    overflow: 'hidden',
    boxShadow: '0px 7px 49px rgba(202, 204, 213, 0.45)',
    [theme.breakpoints.only('xs')]: {
      margin: '0 6px'
    }
  },
  placeholder: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    textAlign: 'center',
    outline: 'none'
  },
  textLineOne: {
    marginBottom: 10,
    fontSize: 16,
    color: '#c8102e',
    lineHeight: 1.5,
    textDecoration: 'underline'
  },
  textLineTwo: {
    fontSize: 12,
    lineHeight: 1.5
  },
  error: {
    fontSize: 14,
    color: '#fff'
  },
  snackbar: {
    position: 'absolute',
    bottom: ({ isMobileView }: { isMobileView: boolean }) => (isMobileView ? '15%' : '10%'),
    '& .MuiSnackbarContent-root': {
      padding: 0,
      backgroundColor: '#000',
      borderRadius: 2
    },
    '& .MuiSnackbarContent-message': {
      padding: 5
    }
  },
  hiddenInput: {
    padding: 0
  }
}));

type Props = {
  cropperConfig: CropperConfig;
  cardConfig: CardConfig;
};

type Files = {
  files: File[];
};

type CropperEventTarget = EventTarget & { cropper?: Cropper };

const isIphone = window.navigator.platform === 'iPhone';
const cropperPreviewStyle: CardStyles = {
  maxHeight: isIphone ? 391 : 481,
  maxWidth: isIphone ? 275 : 302,
  position: 'absolute',
  zIndex: 1000
};

const cropperCustomIMGPreviewStyle: CardStyles = {
  ...cropperPreviewStyle,
  zIndex: 1001
};

type CropValues = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const tabIndexes = {
  uploadCustomImg: 3,
  zoomInBtn: 3,
  zoomOutBtn: 4,
  rotateBtn: 5,
  removeBtn: 6
};

const Cropper: FC<Props> = ({ cropperConfig, cardConfig }) => {
  const MAX_SCALE = 1.1;
  const MIN_SCALE = 0.05;
  const reader = new FileReader();
  const isMobileView = useMediaQuery('(max-width:600px)');
  const classes = useStyles({ isMobileView });
  const [isCropperReady, setIsCropperReady] = useState<boolean>(false);
  const [isCropperTouched, setIsCropperTouched] = useState<boolean>(false);
  const [cropValues, setCropValues] = useState<CropValues>({
    x: 0, y: 0, width: 0, height: 0
  });
  const { appConfig } = useAppConfig();
  const { state: { card } } = useCardContext();
  const {
    state: {
      cropper,
      errors,
      userImage,
      croppedImage,
      zoomValue,
      cropperCanvasData,
      rotationValue,
      cropperBackImageURL
    },
    actions: {
      setCropper,
      setErrors,
      setUserImage,
      setCroppedImage,
      setZoomRatio,
      resetCustomImageState,
      setCropperBackImageURL
    }
  } = useCustomImageContext();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { open, handleClose }: UseSnackbar = useSnackbar(errors);
  const windowSize = useWindowSize();
  const { t } = useTranslation();

  const isCustomCardWithOverlay = card.attributes.includes('overlay');

  const minCropBoxWidth = windowSize.width <= 600
    ? cardConfig.sizes.xsWidth
    : cardConfig.sizes.width;

  const minCropBoxHeight = windowSize.width <= 600
    ? cardConfig.sizes.xsHeight
    : cardConfig.sizes.height;

  const setCropperData = useCallback(() => {
    if (cropper) {
      cropper.rotate(rotationValue);
      cropper.setCanvasData(cropperCanvasData);
    }
  }, [cropper, cropperCanvasData, rotationValue]);

  const initializeCropperZoomRatio = useCallback(() => {
    if (cropper) {
      const imageData = cropper.getImageData();

      const initZoomRatio = imageData.width / imageData.naturalWidth;
      setZoomRatio(initZoomRatio);
    }
  }, [cropper, setZoomRatio]);

  useEffect(() => {
    if (userImage && isCropperReady && cropper) {
      if (!croppedImage) {
        initializeCropperZoomRatio();
      } else {
        setCropperData();
      }
    }
  }, [
    cropper,
    isCropperReady,
    userImage,
    croppedImage,
    setCropperData,
    initializeCropperZoomRatio
  ]);

  useEffect(() => {
    if (cropper) {
      const canvasData = cropper.getCanvasData();
      const data = cropper.getData();

      const leftIsNotValid = data.x > 0 && data.x >= canvasData.naturalWidth * 0.9;

      const rightIsNotValid = data.x < 0 && data.x <= -(data.width * 0.8);

      const topIsNotValid = data.y > 0 && data.y >= canvasData.naturalHeight * 0.9;

      const bottomIsNotValid = data.y < 0 && data.y <= -(data.height * 0.9);

      if (leftIsNotValid) {
        cropper.moveTo(canvasData.left * 0.89, canvasData.top);
      }

      if (rightIsNotValid) {
        cropper.moveTo(canvasData.left * 0.79, canvasData.top);
      }

      if (topIsNotValid) {
        cropper.moveTo(canvasData.left, canvasData.top * 0.89);
      }

      if (bottomIsNotValid) {
        cropper.moveTo(canvasData.left, canvasData.top * 0.89);
      }

      if (leftIsNotValid || rightIsNotValid || topIsNotValid || bottomIsNotValid) {
        setErrors(['editorMessage.invalidImagePosition']);
      }
    }
  }, [
    cropper,
    cropValues,
    setErrors
  ]);

  const handleCrop = (event: Cropper.CropEvent): void => {
    setCropValues({
      x: event.detail.x,
      y: event.detail.y,
      width: event.detail.width,
      height: event.detail.height
    });
  };

  const setCropperBackIMGFromCropperDebounce = (targetCropper: Cropper) => {
    targetCropper.getCroppedCanvas(appConfig.croppedImageConfig).toBlob((blob: Blob | null) => {
      if (blob) {
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          const croppedImageBase64 = base64data as string;
          setCropperBackImageURL(croppedImageBase64);
        };
      }
    }, 'image/jpeg');
  };

  const setCropperBackIMGFromCropper = useDebouncedFunction(
    setCropperBackIMGFromCropperDebounce,
    500
  );

  const cropperReadyHandler = (event: CustomEvent) => {
    setIsCropperReady(event.returnValue);
  };

  const cropperInitializeHandler = (cropperInstance: Cropper) => {
    setCropper(cropperInstance);
    setCropperBackIMGFromCropper(cropperInstance);
  };

  const zoomHandler = (event: CustomEvent<{ ratio: number }>): void => {
    const ratio = event.detail && Math.ceil(event.detail.ratio * 100) / 100;
    const eventTarget: CropperEventTarget | null = event.target;

    if ((ratio <= MAX_SCALE) && (ratio >= MIN_SCALE)) {
      setZoomRatio(ratio);

      if (eventTarget && eventTarget.cropper) {
        const targetCropper: Cropper = eventTarget.cropper;
        setIsCropperTouched(false);
        setCropperBackIMGFromCropper(targetCropper);
      }
    } else {
      event.preventDefault();
    }
  };

  const zoomInHandler = (): void => {
    if (!cropper) return;
    if (zoomValue < MAX_SCALE) {
      cropper.zoom(0.1);
    }
  };

  const zoomOutHandler = (): void => {
    if (!cropper) return;
    if (zoomValue > MIN_SCALE) {
      cropper.zoom(-0.1);
    }
  };

  const sliderHandler = (event: ChangeEvent<unknown>, newValue: number | number[]): void => {
    if (!cropper) return;
    setZoomRatio(newValue as number);
    setCropperBackIMGFromCropper(cropper);
    cropper.zoomTo(newValue as number);
  };

  const inputHandler = (
    event: ChangeEvent<HTMLInputElement> & { dataTransfer?: Files; target: Files }
  ) => {
    setCroppedImage(null);
    let files: File[] = [];

    if (event.dataTransfer) {
      files = event.dataTransfer.files;
    } else if (event.target) {
      files = event.target.files;
    }

    const isValid = Validator.validateImageAndSetErrors(files, setErrors, setUserImage);
    if (isValid) {
      FileManager.getInstance().readImageFile({ files, minCropBoxWidth, setImage: setUserImage });
    }
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  const handleRotate = (): void => {
    if (!cropper) return;
    cropper.rotate(-90);
    setCropperBackIMGFromCropper(cropper);
  };

  const handleRemoveImage = (): void => {
    resetCustomImageState();
    setCropperBackImageURL(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCropStart = (event: Cropper.CropStartEvent): void => {
    setIsCropperTouched(true);
  };

  const handleCropEnd = (event: Cropper.CropEndEvent): void => {
    const eventTarget: CropperEventTarget | null = event.target;

    if (eventTarget && eventTarget.cropper) {
      const targetCropper: Cropper = eventTarget.cropper;
      setIsCropperTouched(false);
      setCropperBackIMGFromCropper(targetCropper);
    }
  };

  const imageCropper = (
    <StyledCropper
      isCropperTouched={isCropperTouched}
      crop={handleCrop}
      cropstart={handleCropStart}
      cropend={handleCropEnd}
      isCustomCardWithOverlay={isCustomCardWithOverlay}
      imageUrl={cardConfig.frontImageUrl}
      src={userImage}
      ready={cropperReadyHandler}
      zoom={zoomHandler}
      minContainerWidth={minCropBoxWidth}
      minContainerHeight={minCropBoxHeight}
      minCropBoxWidth={minCropBoxWidth}
      minCropBoxHeight={minCropBoxHeight}
      onInitialized={cropperInitializeHandler}
      {...cropperConfig}
    />
  );

  const errorMessage = errors.length > 0 && errors.map((error: string, idx: number) => (
    <Box display="flex" alignItems="center" key={`error-${idx + 1}-${Date.now()}`}>
      <ExclamationMarkIcon />
      <TranslatedTypography
        i18nKey={error}
        classes={{ root: classes.error }}
      />
    </Box>
  ));

  const cropperPreLoadingBackground = (
    <>
      {!isCropperReady && isCustomCardWithOverlay && (
        <CardImage
          imageUrl={cardConfig.frontImageUrl}
          cardName={card.name}
          styles={cropperCustomIMGPreviewStyle}
        />
      )}
      {!isCropperReady && cropperBackImageURL && (
        <CardImage
          imageUrl={cropperBackImageURL}
          cardName={card.name}
          styles={cropperPreviewStyle}
        />
      )}
    </>
  );

  const cropperWithSliderAndControls = (
    <Box className={classes.cropperContainer}>
      <Box className={classes.sliderContainer}>
        <IconButton
          cls={classes.zoomIconBtn}
          onClick={zoomInHandler}
          tabIndex={tabIndexes.zoomInBtn}
        >
          <ZoomInIcon />
        </IconButton>
        <Box className={classes.slider}>
          <Slider
            value={zoomValue}
            step={MIN_SCALE}
            min={MIN_SCALE}
            max={MAX_SCALE}
            onChange={sliderHandler}
          />
        </Box>
        <IconButton
          cls={classes.zoomIconBtn}
          onClick={zoomOutHandler}
          tabIndex={tabIndexes.zoomOutBtn}
        >
          <ZoomOutIcon />
        </IconButton>
      </Box>
      <ImageContainer
        imgConfig={cardConfig.sizes}
        cls={classes.imgContainer}
      >
        {!isCropperReady && cropperBackImageURL && (
          <CardImage
            imageUrl={cropperBackImageURL}
            cardName={card.name}
            styles={cropperPreviewStyle}
          />
        )}
        {cropperPreLoadingBackground}
        {imageCropper}
      </ImageContainer>
      <Snackbar
        open={open}
        onClose={handleClose}
        message={errorMessage}
        autoHideDuration={2000}
        className={classes.snackbar}
      />
      <CropperControls
        onRotate={handleRotate}
        onRemove={handleRemoveImage}
        rotateBtnTabIndex={tabIndexes.rotateBtn}
        removeBtnTabIndex={tabIndexes.removeBtn}
      />
    </Box>
  );

  const placeholder = (
    isCustomCardWithOverlay
      ? <CardImage imageUrl={cardConfig.frontImageUrl} cardName="overlay-image" />
      : (
        <Box tabIndex={tabIndexes.uploadCustomImg} className={classes.placeholder}>
          <UploadIcon />
          <TranslatedTypography
            variant="body2"
            i18nKey={t('placeholder.cropperLineOne')}
            classes={{ root: classes.textLineOne }}
          />
          <TranslatedTypography
            variant="body2"
            i18nKey={t('placeholder.cropperLineTwo')}
            classes={{ root: classes.textLineTwo }}
          />
        </Box>
      )
  );

  const hiddenInput = (
    <>
      <ImageContainer imgConfig={cardConfig.sizes} cls={classes.imgContainer}>
        <HiddenInput
          className={classes.hiddenInput}
          placeholder={placeholder}
          onChange={inputHandler}
        />
      </ImageContainer>
      <Snackbar
        open={open}
        onClose={handleClose}
        message={errorMessage}
        className={classes.snackbar}
      />
    </>
  );

  return userImage ? cropperWithSliderAndControls : hiddenInput;
};

export default memo(Cropper);
