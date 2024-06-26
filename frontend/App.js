import React, { useState, useEffect, useMemo, createContext, useRef } from 'react';
import { lazy, Suspense } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LinearProgress from '@mui/material/LinearProgress';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { check_login, logout } from './component/checkLogin.js';
import GlobalStyles from "@mui/material/GlobalStyles";
const ModelInfor = lazy(() => import("./information/model.js"));
const Hub = lazy(() => import("./rooms/redirect.js"));
const Information = lazy(() => import("./introduction/introduction.js"));
const Agent = lazy(() => import("./rooms/agent.js"));
const Chat = lazy(() => import("./rooms/chat.js"));
const Contact = lazy(() => import("./contact/contact.js"));
const KeyManagement = lazy(() => import("./key_management/key_management.js"));
const Hotpot = lazy(() => import("./rooms/hotpot.js"));
const FunctionLLM = lazy(() => import("./rooms/function_llm.js"));
const Manual = lazy(() => import("./information/manual.js"));
const APIDoc = lazy(() => import("./information/api_doc.js"));
const Log = lazy(() => import("./rooms/log.js"));
const PaymentSuccess = lazy(() => import("./key_management/payment_success.js"));
const Login = lazy(() => import("./key_management/login.js"))
const UserInstruction = lazy(() => import("./rooms/user_instruction.js"))
const CostMonitoring = lazy(() => import("./key_management/cost_monitoring.js"))
const DataSynthesis = lazy(() => import("./rooms/data_synthesis.js"))
import { AwsRum } from 'aws-rum-web';
try {
  const config = {
    sessionSampleRate: 1,
    identityPoolId: "us-east-1:ac9263b5-0bbc-43fe-821d-f424ca28d40e",
    endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
    telemetries: ["performance"],
    allowCookies: true,
    enableXRay: false
  };

  const APPLICATION_ID = 'cd3bf393-dc5f-41d0-bbde-2f0997d4a45a';
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION = 'us-east-1';

  const awsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

export const ColorModeContext = createContext({ toggleColorMode: () => { } });
export const UserContext = createContext();
export const WebSocketContext = createContext();

export default function App() {
  const [mode, setMode] = useState('dark');
  const [is_authenticated, setIsAuthenticated] = useState(false)
  const [user_hashed_key, setUserHashKey] = useState(null)
  const [user_key_name, setUserKeyName] = useState(null)
  const websocket = useRef(null)
  const chat_websocket = useRef(null)
  const agent_websocket = useRef(null)
  useEffect(() => {
    check_login(setIsAuthenticated, setUserHashKey, setUserKeyName)
  }, [is_authenticated, user_hashed_key, user_key_name]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = useMemo(
    () =>
      createTheme({
        
        palette: {
          mode,
        },
        
      },
    ),
    [mode],
  );
  return (
    <WebSocketContext.Provider value={{websocket, agent_websocket, chat_websocket}}>
      <UserContext.Provider value={{ is_authenticated, setIsAuthenticated, user_hashed_key, user_key_name }}>
        <ColorModeContext.Provider value={{ colorMode, mode, theme }}>
          <GlobalStyles
            styles={{
              '::-webkit-scrollbar': {
                width: '12px' /* Scrollbar width */
              },

              /* Scrollbar track */
              '::-webkit-scrollbar-track': {
                background: '#333' /* Track color */
              },

              /* Scrollbar thumb */
              "::-webkit-scrollbar-thumb": {
                background: '#666', /* Thumb color */
                borderRadius: '10px' /* Thumb border-radius */
              },

              /* Scrollbar thumb states */
              "::-webkit-scrollbar-thumb:hover": {
                background: '#555' /* Hover thumb color */
              },

              "::-webkit-scrollbar-thumb:active": {
                background: '#444', /* Active thumb color */
              },
              '*::-webkit-scrollbar': {
                width: '0.2em',
              },

              '*::-webkit-scrollbar-thumb': {
                outline: '1px solid slategrey',
              },
            }}
          />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Routes>
                <Route exact path="/" element={<InformationPage />} />
                <Route exact path="" element={<InformationPage />} />

                <Route path="/frontend/manual" element={<ManualPage />} />
                <Route path="/frontend/cost-monitoring" element={<CostMonitoringPage />} />
                <Route path="/frontend/user-instruction/:keyhash" element={<UserInstructionPage />} />
                <Route path="/frontend/data-synthesis/:keyhash" element={<DataSynthesisPage />} />
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
                <Route path="/frontend/login" element={<LoginPage />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </UserContext.Provider>
    </WebSocketContext.Provider>
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


const LoginPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <Login />
  </Suspense>
);

const UserInstructionPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <UserInstruction />
  </Suspense>
);

const CostMonitoringPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <CostMonitoring />
  </Suspense>
);

const DataSynthesisPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <DataSynthesis />
  </Suspense>
);