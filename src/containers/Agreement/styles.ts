import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({
  contentWrapper: {
    padding: '0 80px',
    [theme.breakpoints.only('xs')]: {
      padding: '0 20px'
    },
    fontFamily: theme.typography.fontFamily,
    lineHeight: '21px',
    '& strong': {
      fontFamily: theme.typography.body2.fontFamily,
      fontWeight: 400
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  tosContainer: {
    height: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    fontSize: '14px'
  },
  gradient: {
    width: '100%',
    bottom: 0,
    height: 50,
    position: 'sticky',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) -50.44%, #FFFFFF 70.56%)'
  },
  footer: {
    position: 'sticky',
    paddingTop: 0,
    zIndex: 100,
    bottom: 0,
    display: 'flex',
    backgroundColor: 'white',
    borderBottomLeftRadius: '32px',
    borderBottomRightRadius: '32px',
    [theme.breakpoints.only('xs')]: {
      paddingBottom: '17px'
    }
  }
}));

export default useStyles;
