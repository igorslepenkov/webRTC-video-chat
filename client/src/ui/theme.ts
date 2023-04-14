import {
  ThemeOptions,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#E0FBFC',
    },
    secondary: {
      main: '#EE6C4D',
    },
    background: {
      default: '#293241',
      paper: '#773344',
    },
  },
};

export const muiTheme = responsiveFontSizes(createTheme(themeOptions));
