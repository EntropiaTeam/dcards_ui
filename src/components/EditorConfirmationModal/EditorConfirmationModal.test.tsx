import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

import EditorConfirmationModal from '.';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);
let modal: RenderResult;

const supportedLocales = {
  'en-US': {
    translation: {
      buttons: {
        Leave: 'Leave',
        Stay: 'Stay'
      },
      editorMessage: {
        hasUnsavedChanges: 'Your changes will not be saved'
      }
    }
  }
};

beforeAll(() => {
  i18n
    .use(initReactI18next)
    .init({
      lng: 'en-US',
      resources: supportedLocales,
      interpolation: {
        escapeValue: false
      },
      fallbackLng: 'en-US'
    }).catch((err) => {
      throw new Error(err);
    });
});

test('<EditorConfirmationModal> shows the children and a action buttons', () => {
  // Arrange
  const isModalOpen = true;
  const onConfirm = jest.fn();
  const handleCloseModal = jest.fn();

  // Act
  modal = render(
    <I18nextProvider i18n={i18n}>
      <EditorConfirmationModal
        isModalOpen={isModalOpen}
        onConfirm={onConfirm}
        handleCloseModal={handleCloseModal}
      />
    </I18nextProvider>
  );

  // Assert
  expect(modal.getByText('Leave')).toBeTruthy();
  expect(modal.getByText('Stay')).toBeTruthy();

  // Act
  fireEvent.click(modal.getByText('Stay'));

  // Assert
  expect(handleCloseModal).toHaveBeenCalledTimes(1);

  // Act
  fireEvent.click(modal.getByText('Leave'));

  // Assert
  expect(onConfirm).toHaveBeenCalledTimes(1);
});
