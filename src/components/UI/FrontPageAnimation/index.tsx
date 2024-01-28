import React, { FC, useEffect, useRef } from 'react';
import {
  useLocation, useHistory, useRouteMatch
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import useAppConfig from '../../../hooks/useAppConfig';
import { RoutePath } from '../../../enums/Routes';
import { useCardContext, useCustomImageContext } from '../../../context';

const useStyles = makeStyles({
  animatedCard: ({ width, height }: PropsForStyles) => ({
    position: 'absolute',
    top: '0px',
    left: '0px',
    backgroundSize: 'contain!important',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#ffffff',
    width,
    height,
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '200%',
      height: '200%',
      transform: 'translate(-25%, -25%)',
      backgroundColor: '#ffffff'
    }
  }),
  firstStep: {
    transition: 'transform .5s linear',
    transform: 'perspective(1500px) rotateY(-90deg)',
    transformOrigin: 'left center',
    border: '1px solid #E6E6E6',
    '&:before': {
      content: '""',
      backgroundColor: 'transparent!important'
    }
  },
  secondStep: {
    transition: 'transform 0.1s linear',
    transform: 'perspective(2000px) rotateY(-100deg)',
    transformOrigin: 'left center',
    background: 'linear-gradient(90deg, #EBEBEB 0%, rgba(255, 255, 255, 0.9) 100%)!important',
    border: '1px solid #E6E6E6',
    '&:before': {
      display: 'none'
    }
  },
  openedState: {
    transition: 'none',
    transform: 'perspective(2000px) rotateY(-100deg)',
    transformOrigin: 'left center',
    background: 'linear-gradient(90deg, #EBEBEB 0%, rgba(255, 255, 255, 0.9) 100%)!important',
    border: '1px solid #E6E6E6',
    '&:before': {
      display: 'none'
    }
  },
  closeState: {
    transition: 'transform .6s linear',
    transform: 'perspective(1500px) rotateY(0deg)',
    transformOrigin: 'left center',
    border: '1px solid #E6E6E6',
    '&:before': {
      display: 'none'
    }
  }
});

type Location = {
  state?: {
    pathname: string;
  };
};

type PropsForStyles = {
  width: number;
  height: number;
};

type Props = {
  imageUrl: string;
  isBackButtonClicked: boolean;
  width: number;
  height: number;
};

const FrontPageAnimation: FC<Props> = ({
  width, height, imageUrl, isBackButtonClicked
}) => {
  const classes = useStyles({ width, height });
  const history = useHistory();
  const { state }: Location = useLocation();
  const editorsRouteMatch = useRouteMatch(RoutePath.Editors);
  const { appConfig, cardConfig } = useAppConfig();
  const { state: { card } } = useCardContext();

  const isCustomCardWithOverlay = card.attributes.includes('overlay');

  const {
    state: {
      cropperBackImageURL
    }
  } = useCustomImageContext();
  const frontImage = useRef<HTMLDivElement>(null);

  const runOpenAnimation = () => {
    if (frontImage && frontImage.current) {
      const targetElement = frontImage.current;
      if (state && state.pathname.includes('/text/mobile')) {
        targetElement.className += ` ${classes.openedState}`;
      } else if (!targetElement.className.includes(classes.firstStep)) {
        targetElement.className += ` ${classes.firstStep}`;
        setTimeout(() => {
          targetElement.className += ` ${classes.secondStep}`;
        }, 500);
      }
    }
  };

  const runCloseAnimation = () => {
    if (frontImage && frontImage.current) {
      const targetElement = frontImage.current;
      targetElement.className += ` ${classes.closeState}`;
    }
  };

  useEffect(() => {
    const frontImageElement = frontImage.current;

    if (frontImageElement && cropperBackImageURL) {
      const backgroundWithCardOverlayImage = isCustomCardWithOverlay ? `url(${cardConfig.frontImageUrl}),` : '';
      frontImageElement.style.backgroundImage = `${backgroundWithCardOverlayImage} url(${cropperBackImageURL})`;
      runOpenAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cropperBackImageURL]);

  if (appConfig.customCardId !== cardConfig.id && !isCustomCardWithOverlay) {
    if (frontImage && frontImage.current) {
      frontImage.current.style.backgroundImage = `url(${imageUrl})`;
      runOpenAnimation();
    }
  }

  useEffect(() => {
    if (isBackButtonClicked === true) {
      runCloseAnimation();
      setTimeout(() => {
        if (frontImage && frontImage.current) {
          frontImage.current.classList.remove(classes.secondStep);
          frontImage.current.classList.remove(classes.openedState);
        }
      }, 100);
      setTimeout(() => {
        history.push(`${editorsRouteMatch!.url}/photo`);
      }, 600);
    }
  });

  return (
    <div
      ref={frontImage}
      className={classes.animatedCard}
    />
  );
};

export default FrontPageAnimation;
