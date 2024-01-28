import React, { FC, ChangeEvent } from 'react';
import { withStyles, Slider } from '@material-ui/core';

type Props = {
  value: number | number[];
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  classes?: Record<string, unknown>;
  onChange: (event: ChangeEvent<unknown>, newValue: number | number[]) => void;
};

const CustomizedSlider = withStyles({
  vertical: {
    '& .MuiSlider-thumb': {
      marginLeft: 'calc((9px - 18px) + 0.5px)',
      marginBottom: -9
    }
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#c8102e',
    border: '2px solid #fff',
    '&:hover': {
      boxShadow: '0px 4px 8px rgba(57, 57, 57, 0.15)'
    },
    '&:focus': {
      boxShadow: '0px 0px 0px 10px rgba(200, 16, 46, 0.05)'
    },
    '&:active': {
      boxShadow: '0px 0px 0px 10px rgba(200, 16, 46, 0.1)'
    }
  },
  track: {
    backgroundColor: '#000'
  },
  rail: {
    width: 3,
    backgroundColor: '#d1d5db'
  }
})(Slider);

const CustomSlider: FC<Props> = ({
  value, step, min, max, disabled, onChange
}) => (
  <CustomizedSlider
    orientation="vertical"
    value={value}
    step={step}
    min={min}
    max={max}
    disabled={disabled}
    onChange={onChange}
    tabIndex={-1}
    onChangeCommitted={onChange}
  />
);

export default CustomSlider;
