import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  title: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '150%',
    marginBottom: 14
  },
  subTitle: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '150%',
    marginBottom: 15
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  rightReservedSign: {
    fontSize: 8,
    verticalAlign: 'super'
  },
  link: {
    textDecoration: 'underline',
    fontSize: '14px'
  }
}));

export default useStyles;
