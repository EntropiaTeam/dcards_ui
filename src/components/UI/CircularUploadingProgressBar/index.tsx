import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import TranslatedTypography from '../TranslatedTypography';

const useStyles = makeStyles({
  general: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    zIndex: 1000
  },
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  progress: {
    color: 'white'
  },
  translate: {
    top: 140,
    color: 'white'
  }
});

const CircularUploadingProgressBar: FC<{ progress: number }> = ({ progress }) => {
  const classes = useStyles();

  const isUploading = progress !== 100;
  const roundedProgress = `${Math.round(progress)}%`;

  const styles = (className: string) => clsx(classes.general, className);

  const uploadingProgress = (
    <>
      <CircularProgress size={100} value={progress} color="primary" variant="determinate" />
      <Typography variant="body1" color="inherit" className={styles(classes.progress)}>
        {roundedProgress}
      </Typography>
      <TranslatedTypography
        i18nKey="processes.upload"
        classes={{ root: styles(classes.translate) }}
      />
    </>
  );

  const processingSpinner = (
    <>
      <CircularProgress size={100} value={progress} color="primary" />
      <TranslatedTypography
        i18nKey="processes.processing"
        classes={{ root: styles(classes.translate) }}
      />
    </>
  );

  return (
    <Box className={styles(classes.root)}>
      <Box className={classes.container}>
        {isUploading ? uploadingProgress : processingSpinner}
      </Box>
    </Box>
  );
};

export default CircularUploadingProgressBar;
