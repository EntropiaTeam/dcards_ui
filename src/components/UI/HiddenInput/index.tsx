import React, {
  ChangeEvent, ReactNode, FC, useRef
} from 'react';
import {
  makeStyles, Button, PropTypes
} from '@material-ui/core';

const useStyles = makeStyles({
  input: {
    display: 'none'
  }
});

type Files = {
  files: File[];
};

interface Props {
  className?: string;
  color?: PropTypes.Color;
  disabled?: boolean;
  placeholder: ReactNode;
  onChange: (event: ChangeEvent<HTMLInputElement> & {
    dataTransfer?: Files;
    target: Files;
  }) => void;
}

const HiddenInput: FC<Props> = ({
  color, disabled, className, placeholder, onChange
}) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && inputRef) {
      inputRef.current?.click();
    }
  };

  return (
    <Button
      fullWidth
      color={color}
      component="label"
      disabled={disabled}
      className={className}
      onKeyDown={handleKeyDown}
    >
      {placeholder}
      <input
        type="file"
        name="file"
        accept="image/*"
        className={classes.input}
        onChange={onChange}
        ref={inputRef}
      />
    </Button>
  );
};

export default HiddenInput;
