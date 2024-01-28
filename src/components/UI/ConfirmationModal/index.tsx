import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Modal from '../Modal';
import Button from '../MainButton';

const useStyles = makeStyles((theme: Theme) => ({
  dialogContent: {
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 20px'
  },
  dialogButtons: {
    minWidth: '135px',
    height: '40px',
    margin: '6px',
    padding: 0,
    borderRadius: '2px',
    fontFamily: theme.typography.body1.fontFamily,
    '&:focus-visible': {
      outlineStyle: 'auto',
      outlineColor: '#015FCC',
      outlineWidth: 7
    }
  },
  modalActions: {
    paddingTop: 30,
    '& div': {
      textAlign: 'center'
    }
  }
}));

type ConfirmationModalProps = {
  isModalOpen: boolean;
  сonfirmButtonText: string;
  rejectButtonText: string;
  onConfirm(): void;
  handleCloseModal(): void;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isModalOpen,
  onConfirm,
  handleCloseModal,
  сonfirmButtonText,
  rejectButtonText,
  children
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const confirmButtonTabIndex = 1;
  const rejectButtonTabIndex = 2;

  const handleConfirm = () => {
    handleCloseModal();
    onConfirm();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      title={t('editorMessage.modalAskTitle')}
      maxWidth="sm"
    >
      <div className={classes.dialogContent}>
        {children}
      </div>
      <Grid
        container
        justify="center"
        className={classes.modalActions}
      >
        <Button
          className={classes.dialogButtons}
          onClick={handleConfirm}
          color="secondary"
          tabIndex={confirmButtonTabIndex}
        >
          {сonfirmButtonText}
        </Button>
        <Button
          className={classes.dialogButtons}
          onClick={handleCloseModal}
          tabIndex={rejectButtonTabIndex}
        >
          {rejectButtonText}
        </Button>
      </Grid>
    </Modal>
  );
};

export default ConfirmationModal;
