import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  general: {
    position: 'absolute',
    display: 'flex',
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
  bottom: {
    position: 'absolute',
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
  },
  top: {
    color: 'rgb(200 17 46)',
    animationDuration: '550ms',
    position: 'relative'
  }
}));

const CircularProgressBar: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        size={40}
        thickness={4}
      />
    </Box>
  );
};

export default CircularProgressBar;
