import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D9D9D9', 
    },
  },
});

export default function AppBar(props) {
  return (
    <ThemeProvider theme={theme}>
      <MuiAppBar elevation={0} position="fixed" color="primary" {...props} />
    </ThemeProvider>
  );
}