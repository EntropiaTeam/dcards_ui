import { useEffect, useState } from 'react';

export type UseSnackbar = {
  open: boolean;
  handleOpen(): void;
  handleClose(): void;
};

const useSnackbar = (errors: string | string[]): UseSnackbar => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (errors.length > 0) {
      setOpen(true);
    }
  }, [errors, setOpen]);

  const handleOpen = (): void => setOpen(true);

  const handleClose = (): void => setOpen(false);

  return { open, handleOpen, handleClose };
};

export default useSnackbar;
