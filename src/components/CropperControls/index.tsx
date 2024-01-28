import React, { FC } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import IconButton from '../UI/IconButton';
import { RotateIcon, DeleteIcon } from '../UI/Icons';

const useStyles = makeStyles({
  actionBtns: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    '&>button': {
      '&:focus-visible': {
        outline: 'auto'
      }
    }
  }
});

type Props = {
  onRotate?: () => void;
  onRemove?: () => void;
  rotateBtnTabIndex?: number;
  removeBtnTabIndex?: number;
};

const CropperControls: FC<Props> = ({
  onRotate,
  onRemove,
  rotateBtnTabIndex,
  removeBtnTabIndex
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.actionBtns}>
      <IconButton tabIndex={rotateBtnTabIndex} onClick={onRotate}><RotateIcon /></IconButton>
      <IconButton tabIndex={removeBtnTabIndex} onClick={onRemove}><DeleteIcon /></IconButton>
    </Box>
  );
};

export default CropperControls;
