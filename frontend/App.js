import * as React from 'react';
import Container from '@mui/material/Container';
import ResponsiveAppBar from './navbar';
import Footer from './footer';
import Manual from './manual';
import Information from './introduction';
import ModelInfor from './model';
import Hub from './redirect';
import KeyManagement from './key_management';
import Contact from './contact';
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
          <Route exact path="/frontend" element={<Information />} />
          <Route path="/frontend/manual" element={<Manual />} />
          <Route path="/frontend/model" element={<ModelInfor />} />
          <Route path="/frontend/key-management" element={<KeyManagement />} />
          <Route path="/frontend/hub" element={<Hub />} />
          <Route path="/frontend/contact" element={<Contact />} />
        </Routes>
      </Router>
      <Container maxWidth={false} disableGutters>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}