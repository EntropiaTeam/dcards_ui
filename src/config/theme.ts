import { createMuiTheme } from '@material-ui/core/styles';

const mainTheme = createMuiTheme({
  palette: {
    type: 'light',
    common: {
      black: '#000',
      white: '#fff'
    },
    background: {
      paper: '#fff',
      default: '#fafafa'
    },
    primary: {
      main: '#c8102e',
      dark: '#000',
      contrastText: '#fff'
    },
    secondary: {
      main: '#555555'
    },
    text: {
      disabled: '#BEBEBE'
    },
    grey: {
      200: '#CDCCCC',
      400: '#B7B7B8',
      600: '#898989',
      800: '#555555',
      900: '#252525'
    }
  },
  typography: {
    fontFamily: ['Geomanist-regular', 'Geomanist-medium', 'Geomanist-Book', 'sans-serif'].join(','),
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    button: {
      fontFamily: "'Geomanist-Book', 'sans-serif'",
      fontWeight: 400,
      textTransform: 'none',
      fontSize: '14px',
      lineHeight: '150%'
    },
    h3: {
      fontFamily: "'Geomanist-Book', 'sans-serif'",
      fontWeight: 400,
      fontSize: '2rem'
    },
    h4: {
      fontFamily: "'Geomanist-Book', 'sans-serif'",
      fontWeight: 400,
      fontSize: '1.5rem'
    },
    h5: {
      fontFamily: "'Geomanist-Book', 'sans-serif'",
      fontWeight: 400,
      fontSize: '1.6rem'
    },
    body1: {
      fontFamily: "'Geomanist-regular', 'sans-serif'",
      fontWeight: 400,
      color: '#111111'
    },
    body2: {
      fontFamily: "'Geomanist-medium', 'sans-serif'",
      fontWeight: 400
    }
  }
});

export default mainTheme;
