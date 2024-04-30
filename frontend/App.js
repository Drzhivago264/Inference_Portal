import * as React from 'react';
import Container from '@mui/material/Container';
import Footer from './footer';
import Manual from './manual';
import Information from './introduction';
import ModelInfor from './model';
import Hub from './redirect';
import KeyManagement from './key_management';
import Contact from './contact';
import Chat from './chat';
import Agent from './agent.js'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
export default function App() {
  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <IconButton sx={{ position: "fixed", top: 10, right: 10, zIndex: 2000 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route exact path="/frontend" element={<Information />} />
            <Route path="/frontend/manual" element={<Manual />} />
            <Route path="/frontend/model" element={<ModelInfor />} />
            <Route path="/frontend/key-management" element={<KeyManagement />} />
            <Route path="/frontend/hub" element={<Hub />} />
            <Route path="/frontend/chat/:keyhash" element={<Chat />} />
            <Route path="/frontend/engineer/:keyhash" element={<Agent />} />
            <Route path="/frontend/toolbox/:keyhash" element={<Chat />} />
            <Route path="/frontend/prompt/:keysigned" element={<Chat />} />
            <Route path="/frontend/contact" element={<Contact />} />
          </Routes>
        </Router>
        <Container maxWidth={false} disableGutters>
          <Footer />
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}