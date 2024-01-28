import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from '../UI/ConfirmationModal';
import TranslatedTypography from '../UI/TranslatedTypography';

type EditorConfirmationModalProps = {
  isModalOpen: boolean;
  onConfirm(): void;
  handleCloseModal(): void;
};

const EditorConfirmationModal: FC<EditorConfirmationModalProps> = ({
  isModalOpen,
  onConfirm,
  handleCloseModal
}) => {
  const { t } = useTranslation();

  return (
    <ConfirmationModal
      сonfirmButtonText={t('buttons.Leave')}
      rejectButtonText={t('buttons.Stay')}
      isModalOpen={isModalOpen}
      onConfirm={onConfirm}
      handleCloseModal={handleCloseModal}
    >
      <TranslatedTypography variant="body1" i18nKey={t('editorMessage.hasUnsavedChanges')} />
    </ConfirmationModal>
  );
};

export default memo(EditorConfirmationModal);
