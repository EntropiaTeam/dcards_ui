import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({
  secondaryButton: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.grey[600]
    }
  }
}));

export {
  useStyles
};
