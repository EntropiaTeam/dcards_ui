import React, { FC } from 'react';
import {
  Dialog, DialogContent, DialogTitle
} from '@material-ui/core';
import TranslatedTypography from '../TranslatedTypography';
import { MaxWidth } from './types';
import useStyles from './styles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  maxWidth?: MaxWidth;
}

const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  maxWidth,
  children
}) => {
  const classes = useStyles({ maxWidth });

  return (
    <Dialog
      classes={{ paperFullWidth: classes.dialogPaper }}
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
      BackdropProps={{
        classes: {
          root: classes.backDrop
        }
      }}
    >
      <DialogTitle disableTypography id="alert-dialog-title">
        <TranslatedTypography variant="h5" align="center" i18nKey={title} />
      </DialogTitle>
      <DialogContent className={classes.modalContent}>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
