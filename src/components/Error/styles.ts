import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column',
    height: '100%'
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 16
  }
});

export {
  useStyles
};
