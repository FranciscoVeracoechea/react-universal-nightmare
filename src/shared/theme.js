import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4682b4',
    },
    secondary: {
      main: '#2b2b2b',
    },
    error: {
      main: '#d9534f',
    },
    background: {
      default: '#f9f9fa',
    },
  },
  typography: {
    fontFamily: [
      'Raleway',
      'sans-serif',
    ].join(','),
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '.8rem',
      },
    },
  },
});

export default responsiveFontSizes(theme);
