import React, { FC } from 'react';
import {
  Button, makeStyles, ButtonProps, Theme
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    textTransform: 'none',
    fontSize: '1rem',
    minWidth: '75px',
    width: 'auto',
    height: '45px',
    borderRadius: 2,
    '&:focus-visible': {
      outlineStyle: 'auto',
      outlineColor: '#015FCC',
      outlineWidth: 7
    }
  },
  primary: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      boxShadow: theme.shadows[3]
    },
    '&:active': {
      backgroundColor: '#A3001A'
    }
  }
}));

const MainButton: FC<ButtonProps> = ({
  color = 'primary',
  children,
  variant = 'contained',
  tabIndex = 0,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button
      classes={{ containedPrimary: classes.primary }}
      className={className || classes.button}
      variant={variant}
      color={color}
      tabIndex={tabIndex}
      disableRipple
      disableElevation
      {...props}
    >
      {children}
    </Button>
  );
};

export default MainButton;
