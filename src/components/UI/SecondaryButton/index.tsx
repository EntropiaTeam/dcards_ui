import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './styles';

interface Props {
  disabled?: boolean;
  onClick: () => void;
}

const SecondaryButton: FC<Props> = ({ onClick, children, disabled }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.secondaryButton}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
