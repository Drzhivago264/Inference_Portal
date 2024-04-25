import * as React from 'react';
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import ResponsiveAppBar from './navbar';
import Footer from './footer';
import Manual from './manual';
import Information from './introduction';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route exact path="/frontend-testing" element={<Information />} />
          <Route path="/frontend-testing/manual" element={<Manual />} />
        </Routes>
      </Router>
      <Container maxWidth={false} disableGutters>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}