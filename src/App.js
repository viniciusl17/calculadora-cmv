import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import CMVCalculator from './components/CMVCalculator';
import Advantages from './components/Advantages';
import { Container, Box } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#07575B',
    },
    secondary: {
      main: '#C45523',
    },
    background: {
      default: '#F0F4F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#003B46',
      secondary: '#07575B',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#66A5AD',
    },
    secondary: {
      main: '#D46A38',
    },
    background: {
      default: '#002A33',
      paper: '#003B46',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
     h5: {
      fontWeight: 600,
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Container maxWidth="md">
        <Box my={4}>
          <CMVCalculator />
          <Advantages />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;