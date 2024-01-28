import { useState, useCallback, useEffect } from 'react';
import ElementFocus from '../utils/ElementFocus';

type UseDialog = {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};

const useDialog = (): UseDialog => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [releaseFocus, setReleaseFocus] = useState(() => () => {});

  const handleOpenModal = useCallback(() => { setIsModalOpen(true); }, []);

  const handleCloseModal = useCallback(() => { setIsModalOpen(false); }, []);

  const trapFocus = useCallback(
    (focusElement: Element) => ElementFocus.getInstance().trapFocus(focusElement),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const modalWrapper = document.getElementsByClassName('MuiDialog-scrollPaper')[0];

      if (isModalOpen && modalWrapper) {
        modalWrapper.removeAttribute('tabIndex');
        setReleaseFocus(() => trapFocus(modalWrapper).release);
      } else if (!isModalOpen) {
        releaseFocus();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  return { isModalOpen, handleOpenModal, handleCloseModal };
};

export default useDialog;
