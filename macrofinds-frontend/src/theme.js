import { createTheme } from '@mui/material/styles';
import { lightGreen, green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightGreen[500],
      light: lightGreen[300],
      dark: lightGreen[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: green[600],
    },
    background: {
      default: '#f5faf5',
      paper:   '#ffffff',
    },
  },

  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 1,
        color: 'primary',
      },
    },
  },
});

export default theme;
