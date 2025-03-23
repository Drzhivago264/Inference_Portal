import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext, WebSocketContext} from "../App.js";
import {closeWebSocket, scrollToBottom} from "../component/chat_components/chatUtils.js";

import Box from "@mui/material/Box";
import {ChatBox} from "../component/chat_components/Chatbox.js";
import {ChatExport} from "../component/import_export/ChatExport.js";
import ChatInput from "../component/chat_components/ChatInput.js";
import {ChatPaper} from "../component/custom_ui_component/ChatPaper.js";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Footer from "../component/nav/Footer.js";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import {OpenAPIParameter} from "../component/chat_components/OpenaiParameters.js";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ResponsiveAppBar from "../component/nav/Navbar.js";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {chatsocket} from "../component/websocket/ChatSocket.js";
import {useGetModel} from "../api_hook/useGetModel.js";
import {useGetRedirectAnon} from "../api_hook/useGetRedirectAnon.js";
import {useNavigate} from "react-router-dom";

function FunctionLLM() {
	const {websocket, agent_websocket, chat_websocket, websocket_hash} = useContext(WebSocketContext);
	const [shownthinking, setThinking] = useState(false);
	const messagesEndRef = useRef(null);
	const [chat_message, setChatMessage] = useState([]);
	const [choosen_model, setChoosenModel] = useState("gpt-4");
	const [inference_parameter, setInferenceParameter] = useState({
		top_p: 0.72,
		temperature: 0.73,
		presencepenalty: 0,
		frequencypenalty: 0,
		max_tokens: null,
	});
	const [usermessage, setUserMessage] = useState("");
	const [usermessageError, setUserMessageError] = useState(false);
	const [extrainstruction, setExtraInstruction] = useState("sadness, joy, love, anger, fear, surprise, neutral");
	const [llmfunction, setLLMFunction] = useState("emotion");
	const navigate = useNavigate();
	const {is_authenticated, timeZone} = useContext(UserContext);
	const {agent_objects} = useGetModel();
	useGetRedirectAnon(navigate, is_authenticated);
	useEffect(() => {
		scrollToBottom(messagesEndRef);
	}, [chat_message]);

	var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
	useEffect(() => {
		closeWebSocket(websocket);
		closeWebSocket(agent_websocket);
		closeWebSocket(chat_websocket);
		if (websocket_hash) {
			websocket.current = new WebSocket(`${ws_scheme}://${window.location.host}/ws/toolbox/${websocket_hash}/${timeZone}/`);
			chatsocket(websocket, setChatMessage, setThinking, document);
		}
	}, [websocket_hash]);

	const handleEnter = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			submitChat();
		}
	};
	const submitChat = () => {
		if (!usermessage) {
			setUserMessageError(true);
		} else {
			let data = {
				...inference_parameter,
				message: usermessage,
				tool: llmfunction,
				choosen_model: choosen_model,
				role: "Human",
				emotion_list: typeof extrainstruction === "string" ? extrainstruction : null,
				topic_list: typeof extrainstruction === "string" ? extrainstruction : null,
				style_list: typeof extrainstruction === "string" ? extrainstruction : null,
				number_of_word: typeof extrainstruction === "number" ? extrainstruction : null,
			};
			websocket.current.send(JSON.stringify(data));
			setUserMessage("");
		}
	};
	const swap_extra_instruction = (e) => {
		const instructions = {
			restyle: "sad, serious",
			emotion: "sadness, joy, love, anger, fear, surprise, neutral",
			summary: 100,
			topic: "",
			paraphrase: "",
			sentiment: "",
		};
		setExtraInstruction(instructions[e] || "");
	};
	return (
		<Container maxWidth={false} disableGutters>
			<title>Tools</title>
			<ResponsiveAppBar max_width='xl' />
			<Container maxWidth='lg' disableGutters>
				<Box m={1}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={3}>
							<Stack direction={{xs: "column", sm: "row", md: "column"}} justifyContent='center' alignItems='flex-start' spacing={2}>
								<Paper variant='outlined'>
									<Box m={1}>
										<Typography sx={{color: "text.secondary"}}>Toolbox</Typography>
									</Box>
									<Divider />
									<Box m={2}>
										<FormControl>
											<RadioGroup
												row
												defaultValue='emotion'
												name='radio-buttons-group'
												onChange={(e) => {
													setLLMFunction(e.target.value);
													swap_extra_instruction(e.target.value);
												}}
												value={llmfunction}>
												{[
													{
														label: "Summary",
														value: "summary",
													},

													{
														label: "Predict Emotion",
														value: "emotion",
													},
													{
														label: "Paraphrase",
														value: "paraphrase",
													},
													{
														label: "Predict Sentiment",
														value: "sentiment",
													},
													{
														label: "Topic Classification",
														value: "topic",
													},
													{
														label: "Restyle",
														value: "restyle",
													},
												].map((func) => {
													if (func.value == "paraphrase" || func.value == "setiment") {
														return <FormControlLabel key={func.label} value={func.value} control={<Radio />} label={func.label} />;
													} else if (func.value == "summary") {
														return <FormControlLabel key={func.label} value={func.value} control={<Radio />} label={func.label} />;
													} else {
														return <FormControlLabel key={func.label} value={func.value} control={<Radio />} label={func.label} />;
													}
												})}
											</RadioGroup>
										</FormControl>
									</Box>
								</Paper>
							</Stack>
						</Grid>

						<Grid item xs={12} sm={8} md={6}>
							<ChatBox
								id={"chat-log"}
								inputsize={660}
								chat_message={chat_message}
								usermessage={usermessage}
								usermessageError={usermessageError}
								ChatPaper={ChatPaper}
								ChatInput={ChatInput}
								setUserMessage={setUserMessage}
								submitChat={submitChat}
								messagesEndRef={messagesEndRef}
								shownthinking={shownthinking}
								handleEnter={handleEnter}></ChatBox>
						</Grid>

						<Grid item xs={12} sm={4} md={3}>
							<OpenAPIParameter
								agent_objects={agent_objects}
								choosen_model={choosen_model}
								setChoosenModel={setChoosenModel}
								inference_parameter={inference_parameter}
								setInferenceParameter={setInferenceParameter}
                                isToolBox={true}
							/>
							<Box mt={1}>
								<ChatInput
									multiline
									label='Extra Instructions'
									maxRows={6}
									value={extrainstruction}
									onChange={(e) => setExtraInstruction(e.target.value)}
									minRows={4}
								/>
							</Box>
							<ChatExport chat_message={chat_message} number_of_remove_message={2} setChatMessage={setChatMessage}></ChatExport>
						</Grid>
					</Grid>
				</Box>
			</Container>
			<Footer />
		</Container>
	);
}
export default FunctionLLM;
