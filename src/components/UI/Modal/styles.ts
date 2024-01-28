import { createStyles, makeStyles } from '@material-ui/core';
import { MaxWidthStyleProp } from './types';

const useStyles = makeStyles((theme) => createStyles({
  dialogPaper: {
    maxWidth: ({ maxWidth }: MaxWidthStyleProp): string | number => {
      switch (maxWidth) {
        case 'lg':
          return '75%';
        case 'sm':
          return 327;
        default:
          return '75%';
      }
    },
    borderRadius: 0
  },
  modalTitle: {
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: 32,
    paddingTop: 32,
    paddingBottom: 10
  },
  modalContent: {
    paddingBottom: 24,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  backDrop: {
    [theme.breakpoints.up('md')]: {
      borderRadius: 31
    }
  }
}));

export default useStyles;
