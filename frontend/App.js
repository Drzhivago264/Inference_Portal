import React, {createContext, useMemo, useRef, useState} from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {Suspense, lazy} from "react";
import {ThemeProvider, createTheme} from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import LinearProgress from "@mui/material/LinearProgress";
import {useGetLogin} from "./api_hook/useGetLogin.js";

const ModelInfor = lazy(() => import("./information/model.js"));
const Hub = lazy(() => import("./rooms/redirect.js"));
const Information = lazy(() => import("./introduction/introduction.js"));
const Agent = lazy(() => import("./rooms/agent.js"));
const Chat = lazy(() => import("./rooms/chat.js"));
const Contact = lazy(() => import("./contact/contact.js"));
const KeyManagement = lazy(() => import("./key_management/key_management.js"));
const TokenManagement = lazy(() => import("./key_management/token_management.js"));
const Hotpot = lazy(() => import("./rooms/hotpot.js"));
const FunctionLLM = lazy(() => import("./rooms/function_llm.js"));
const Manual = lazy(() => import("./information/manual.js"));
const APIDoc = lazy(() => import("./information/api_doc.js"));
const Log = lazy(() => import("./rooms/log.js"));
const PaymentSuccess = lazy(() => import("./key_management/payment_success.js"));
const Login = lazy(() => import("./key_management/login.js"));
const UserInstruction = lazy(() => import("./rooms/user_instruction.js"));
const CostMonitoring = lazy(() => import("./key_management/cost_monitoring.js"));
const DataSynthesis = lazy(() => import("./rooms/data_synthesis.js"));
const PromptWriting = lazy(() => import("./rooms/prompt_writing.js"));

export const ColorModeContext = createContext({toggleColorMode: () => {}});
export const UserContext = createContext();
export const WebSocketContext = createContext();

export default function App() {
	const [mode, setMode] = useState("dark");
	const [is_authenticated, setIsAuthenticated] = useState(false);
	const [user_key_name, setUserKeyName] = useState(null);
	const websocket = useRef(null);
	const chat_websocket = useRef(null);
	const agent_websocket = useRef(null);
	const [websocket_hash, setWebsocketHash] = useState(null);
	const {timeZone} = Intl.DateTimeFormat().resolvedOptions();

	useGetLogin(setIsAuthenticated, is_authenticated, setUserKeyName, setWebsocketHash);
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[]
	);
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	);
	return (
		<WebSocketContext.Provider
			value={{
				websocket,
				agent_websocket,
				chat_websocket,
				websocket_hash,
			}}>
			<UserContext.Provider
				value={{
					is_authenticated,
					setIsAuthenticated,
					setUserKeyName,
					setWebsocketHash,
					user_key_name,
					timeZone,
				}}>
				<ColorModeContext.Provider value={{colorMode, mode, theme}}>
					<GlobalStyles
						styles={{
							"::-webkit-scrollbar": {
								width: "12px" /* Scrollbar width */,
							},

							/* Scrollbar track */
							"::-webkit-scrollbar-track": {
								background: "#333" /* Track color */,
							},

							/* Scrollbar thumb */
							"::-webkit-scrollbar-thumb": {
								background: "#666" /* Thumb color */,
								borderRadius: "10px" /* Thumb border-radius */,
							},

							/* Scrollbar thumb states */
							"::-webkit-scrollbar-thumb:hover": {
								background: "#555" /* Hover thumb color */,
							},

							"::-webkit-scrollbar-thumb:active": {
								background: "#444" /* Active thumb color */,
							},
							"*::-webkit-scrollbar": {
								width: "0.2em",
							},

							"*::-webkit-scrollbar-thumb": {
								outline: "1px solid slategrey",
							},
						}}
					/>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Router>
							<Routes>
								<Route exact path='/' element={<InformationPage />} />
								<Route path='/frontend/manual' element={<ManualPage />} />
								<Route path='/frontend/cost-monitoring' element={<CostMonitoringPage />} />
								<Route path='/frontend/user-instruction' element={<UserInstructionPage />} />
								<Route path='/frontend/data-synthesis' element={<DataSynthesisPage />} />
								<Route path='/frontend/manual/:doc' element={<ManualPage />} />
								<Route path='/frontend/api/docs' element={<APIDocPage />} />
								<Route path='/frontend/model' element={<ModelInforPage />} />
								<Route path='/frontend/key-management' element={<KeyManagementPage />} />
								<Route path='/frontend/token-management' element={<TokenManagementPage />} />
								<Route path='/frontend/hub' element={<HubPage />} />
								<Route path='/frontend/payment-success' element={<PaymentSuccessPage />} />
								<Route path='/frontend/chat' element={<ChatPage />} />
								<Route path='/frontend/engineer' element={<AgentPage />} />
								<Route path='/frontend/prompt-writing' element={<PromptWritingPage />} />
								<Route path='/frontend/toolbox' element={<FunctionLLMPage />} />
								<Route path='/frontend/hotpot' element={<HotpotPage />} />
								<Route path='/frontend/log' element={<LogPage />} />
								<Route path='/frontend/contact' element={<ContactPage />} />
								<Route path='/frontend/login' element={<LoginPage />} />
							</Routes>
						</Router>
					</ThemeProvider>
				</ColorModeContext.Provider>
			</UserContext.Provider>
		</WebSocketContext.Provider>
	);
}

const withSuspense = (Component) => () =>
	(
		<Suspense fallback={<LinearProgress />}>
			<Component />
		</Suspense>
	);

const AgentPage = withSuspense(Agent);
const PromptWritingPage = withSuspense(PromptWriting);
const ManualPage = withSuspense(Manual);
const APIDocPage = withSuspense(APIDoc);
const LogPage = withSuspense(Log);
const ChatPage = withSuspense(Chat);
const ContactPage = withSuspense(Contact);
const HotpotPage = withSuspense(Hotpot);
const KeyManagementPage = withSuspense(KeyManagement);
const TokenManagementPage = withSuspense(TokenManagement);
const FunctionLLMPage = withSuspense(FunctionLLM);
const InformationPage = withSuspense(Information);
const ModelInforPage = withSuspense(ModelInfor);
const HubPage = withSuspense(Hub);
const PaymentSuccessPage = withSuspense(PaymentSuccess);
const LoginPage = withSuspense(Login);
const UserInstructionPage = withSuspense(UserInstruction);
const CostMonitoringPage = withSuspense(CostMonitoring);
const DataSynthesisPage = withSuspense(DataSynthesis);
