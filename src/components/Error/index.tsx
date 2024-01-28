import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import MainButton from '../UI/MainButton';
import { useStyles } from './styles';

interface ErrorProps {
  errorText: string;
  retryCallback?: () => void;
}

const Error: FC<ErrorProps> = ({ errorText, retryCallback }) => {
  const classes = useStyles();
  return (
    <Box className={classes.errorContainer}>
      <Box component="span" className={classes.errorText}>{errorText}</Box>
      {retryCallback && (
      <Box className={classes.buttonContainer}>
        <MainButton onClick={retryCallback}>Retry</MainButton>
      </Box>
      )}
    </Box>
  );
};

export default Error;
