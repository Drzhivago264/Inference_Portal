import * as React from 'react';
import { lazy, Suspense } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LinearProgress from '@mui/material/LinearProgress';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const ModelInfor = lazy(() => import("./model.js"));
const Hub = lazy(() => import("./redirect.js"));
const Information = lazy(() => import("./introduction.js"));
const Agent = lazy(() => import("./agent.js"));
const Chat = lazy(() => import("./chat.js"));
const Contact = lazy(() => import("./contact.js"));
const KeyManagement = lazy(() => import("./key_management.js"));
const Hotpot = lazy(() => import("./hotpot.js"));
const FunctionLLM = lazy(() => import("./function_llm.js"));
const Manual = lazy(() => import("./manual.js"));
const APIDoc = lazy(() => import("./api_doc.js"));
const Log = lazy(() => import("./log.js"));
const PaymentSuccess = lazy(() => import("./payment_success.js"));

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
            <Route exact path="/" element={<InformationPage />} />
            <Route exact path="" element={<InformationPage />} />

            <Route path="/frontend/manual" element={<ManualPage />} />
            <Route path="/frontend/manual/:doc" element={<ManualPage />} />
            <Route path="/frontend/api/docs" element={<APIDocPage />} />
            <Route path="/frontend/model" element={<ModelInforPage />} />
            <Route path="/frontend/key-management" element={<KeyManagementPage />} />
            <Route path="/frontend/hub" element={<HubPage />} />
            <Route path="/frontend/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/frontend/chat/:keyhash" element={<ChatPage />} />
            <Route path="/frontend/engineer/:keyhash" element={<AgentPage />} />
            <Route path="/frontend/toolbox/:keyhash" element={<FunctionLLMPage />} />
            <Route path="/frontend/hotpot/:keyhash" element={<HotpotPage />} />
            <Route path="/frontend/log/:keyhash" element={<LogPage />} />

            <Route path="/frontend/contact" element={<ContactPage />} />
          </Routes>
        </Router>
  
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const AgentPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <Agent />
  </Suspense>
);

const ManualPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <Manual />
  </Suspense>
);

const APIDocPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <APIDoc />
  </Suspense>
);

const LogPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <Log />
  </Suspense>
);

const ChatPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <Chat />
  </Suspense>
);

const ContactPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <Contact />
  </Suspense>
);

const HotpotPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <Hotpot />
  </Suspense>
);

const KeyManagementPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <KeyManagement />
  </Suspense>
);

const FunctionLLMPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <FunctionLLM />
  </Suspense>
);

const InformationPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <Information />
  </Suspense>
);

const ModelInforPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <ModelInfor />
  </Suspense>
);

const HubPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <Hub />
  </Suspense>
);

const PaymentSuccessPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <PaymentSuccess />
  </Suspense>
);