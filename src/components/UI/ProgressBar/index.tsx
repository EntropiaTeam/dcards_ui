import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, useMediaQuery } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useLocation } from 'react-router-dom';
import {
  useTextContext
} from '../../../context';
import useAppConfig from '../../../hooks/useAppConfig';
import TranslatedTypography from '../TranslatedTypography';

const useStyles = makeStyles((theme: Theme) => ({
  headerTitle: {
    color: ({ isTextHeightValid }: { isTextHeightValid: boolean }) => (isTextHeightValid ? 'transparent' : theme.palette.primary.main),
    textAlign: 'center',
    fontSize: '16px',
    backgroundColor: '#ffffff',
    zIndex: 100
  }
}));

const ProgressBar = (): JSX.Element => {
  const [progressValue, setProgressValue] = useState(0);
  const {
    state: {
      isTextHeightValid, maxTextareaHeight, currentTextareaHeight, text
    },
    actions: { validateTextHeight }
  } = useTextContext();
  const { pathname } = useLocation();
  const isDesktop = useMediaQuery('(min-width: 601px)');
  const { cardConfig } = useAppConfig();
  const { font, lineHeight: { sizeRatio } } = cardConfig;
  const lineHeightSize = Number(font.size) * sizeRatio;
  const isProgressBarEnabled = (pathname.includes('/text') && isDesktop) || pathname.includes('/text/mobile');
  const classes = useStyles({ isTextHeightValid });

  useEffect(() => {
    if (maxTextareaHeight > 0 && currentTextareaHeight > 0) {
      const currentProgress = (100 * currentTextareaHeight) / maxTextareaHeight;
      if (currentProgress > 100) {
        validateTextHeight(false);
        setProgressValue(100);
      } else {
        validateTextHeight(true);
        setProgressValue((100 * currentTextareaHeight) / maxTextareaHeight);
      }
    }

    if (text === '') {
      setProgressValue(0);
    }

    if ((currentTextareaHeight + lineHeightSize) > maxTextareaHeight) {
      setProgressValue(100);
    }
  }, [currentTextareaHeight, maxTextareaHeight, validateTextHeight, lineHeightSize, text]);

  return (
    <>
      {isProgressBarEnabled
      && (
        <Box margin="0 auto" textAlign="center" width={isDesktop ? '302px' : '100%'}>
          <TranslatedTypography
            variant="button"
            i18nKey="editorMessage.textLengthError"
            classes={{ root: classes.headerTitle }}
          />
          <LinearProgress
            variant="determinate"
            color={isTextHeightValid ? 'secondary' : 'primary'}
            value={progressValue}
          />
        </Box>
      )}
    </>
  );
};

export default ProgressBar;
