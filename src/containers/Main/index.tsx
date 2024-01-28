/* eslint-disable @typescript-eslint/prefer-regexp-exec */
import React, {
  useEffect, useRef, memo, FC, useState, useCallback
} from 'react';
import { makeStyles, Theme, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Routes from '../Routes';
import {
  CircularProgressBar, NotFound, Error, LandscapeView
} from '../../components';
import { useOrderContext } from '../../context';
import { useInitialDataContext } from '../../context/initialData';
import useApplicationSize from '../../hooks/useApplicationSize';
import useAppConfig from '../../hooks/useAppConfig';
import { supportedLocales } from '../../config/i18n';
import { CardFontFace } from '../../config/styled';
import { matchMobile, isIOs } from '../../helpers';
import 'url-search-params-polyfill';

const useStyles = makeStyles((theme: Theme) => ({
  appContainer: {
    display: 'flex',
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: ({ frameWidth }:Props) => (frameWidth ? `${frameWidth}px` : '100%'),
    height: ({ frameHeight }:Props) => (frameHeight ? `${frameHeight}px` : '100%'),
    margin: ({ frameWidth }:Props) => (frameWidth ? 'auto' : 0),
    filter: ({ isLoading } : Props) => (isLoading ? 'blur(10px) brightness(0.2)' : 'none'),
    WebkitFilter: ({ isLoading } :Props) => (isLoading ? 'blur(10px) brightness(0.2)' : 'none'),
    transform: (({ shrinkStyle }: Props) => shrinkStyle),
    background: theme.palette.background.paper,
    borderRadius: '32px',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      borderRadius: '0'
    }
  },
  landscapeContainer: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100vh',
    overflow: 'hidden'
  },
  content: {
    overflow: 'hidden',
    minHeight: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  customScroll: {
    '& > div:last-child': {
      margin: '30px 6px 30px 0'
    }
  }
}
));

type Props = {
  isLoading: boolean;
  frameWidth: number;
  frameHeight: number;
  shrinkStyle: string;
};

const MainContainer: FC = () => {
  const { frameWidth, frameHeight } = useApplicationSize();
  const { globalFontConfig } = useAppConfig();

  const [orientation, setOrientation] = useState(window.orientation);
  const [isValidLocaleExist, setIsValidLocaleExist] = useState(false);
  const [isPageCacheLoading, setIsPageCacheLoading] = useState(false);
  const { state: { isLoading: isOrderLoading } } = useOrderContext();
  const {
    actions: { loadInitialData },
    state: { isLoading: isInitDataLoading, error: initialDataError }
  } = useInitialDataContext();
  const appShrinkStyle = useRef('');
  const classes = useStyles({
    isLoading: isOrderLoading || isInitDataLoading,
    frameHeight,
    frameWidth,
    shrinkStyle: appShrinkStyle.current
  });
  const { i18n } = useTranslation();
  const { language } = i18n;
  const appContainerRef = useRef<HTMLDivElement>(null);
  const appContainerScrollPositionRef = useRef(0);
  const isMobile = matchMobile();
  const mobileLandscape = (orientation === 90 || orientation === -90) && window.innerWidth < 1000;

  useEffect(() => {
    const isRetina = isIOs && window.devicePixelRatio === 2;
    const INITIAL_DEVICE_RATIO = isRetina ? 2 : 1;
    const NORMAL_DEVICE_RATIO = isRetina ? 2.1 : 1.1;
    if (!isMobile && window.devicePixelRatio > INITIAL_DEVICE_RATIO) {
      const scaleValue = (NORMAL_DEVICE_RATIO / window.devicePixelRatio);
      appShrinkStyle.current = `scale(${scaleValue})`;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setWindowOrientation = useCallback(() => {
    setOrientation(window.orientation);
  }, []);

  window.onpopstate = () => {
    setIsPageCacheLoading(true);
    setTimeout(() => setIsPageCacheLoading(false), 200);
  };

  useEffect(() => {
    if (isMobile) {
      window.addEventListener('orientationchange', setWindowOrientation);

      setWindowOrientation();
    }

    return () => {
      window.removeEventListener('orientationchange', setWindowOrientation);
    };
  }, [isMobile, setWindowOrientation]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const locale = urlParams.get('locale');
    const hostUrl = urlParams.get('hostUrl');
    const isPhotoCardsHidden = Boolean(hostUrl?.startsWith('https://mobilesms'));

    const validLocales = Object.keys(supportedLocales);
    const isValidLocale = validLocales.some((validLocale) => validLocale === locale);

    setIsValidLocaleExist(isValidLocale);

    if (isValidLocale) {
      loadInitialData(language, isPhotoCardsHidden);
    }
  }, [language, loadInitialData]);

  const fetchInitialData = (): void => {
    const urlParams = new URLSearchParams(window.location.search);
    const hostUrl = urlParams.get('hostUrl');
    const isPhotoCardsEnabled = !(hostUrl?.startsWith('https://mobilesms'));
    loadInitialData(language, isPhotoCardsEnabled);
  };

  const onScroll = (): void => {
    if (appContainerRef && appContainerRef.current) {
      const { scrollTop } = appContainerRef.current;
      appContainerScrollPositionRef.current = scrollTop;
    }
  };

  const errorJSX = (
    <Box className={classes.appContainer}>
      <Error
        errorText="Something went wrong while getting initial state. Please press button below to retry."
        retryCallback={fetchInitialData}
      />
    </Box>
  );

  const appContents = (
    mobileLandscape ? (
      <Box className={classes.landscapeContainer}>
        <LandscapeView />
      </Box>
    )
      : (
        <Box className={classes.appContainer}>
          <div onScroll={onScroll} ref={appContainerRef} className={classes.content}>
            <CardFontFace {...globalFontConfig} />
            <Routes />
          </div>
        </Box>
      )
  );

  const displayContent = isValidLocaleExist ? appContents : <NotFound />;
  const contentJSX = (isOrderLoading || isInitDataLoading || isPageCacheLoading)
    ? <CircularProgressBar />
    : displayContent;

  return initialDataError ? errorJSX : contentJSX;
};

export default memo(MainContainer);
