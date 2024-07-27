import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext, WebSocketContext} from "../App.js";
import {closeWebSocket, handleListItemClick, scrollToBottom, swap_child_instruction} from "../component/chat_components/chatUtils.js";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import {ChatBoxHotpot} from "../component/chat_components/Chatbox.js";
import ChatInput from "../component/chat_components/ChatInput.js";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../component/nav/Footer.js";
import Grid from "@mui/material/Grid";
import {HotpotParameter} from "../component/chat_components/HotpotParameters.js";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import ResponsiveAppBar from "../component/nav/Navbar.js";
import Typography from "@mui/material/Typography";
import {agentsocket} from "../component/websocket/AgentSocket.js";
import {chatsocket} from "../component/websocket/ChatSocket.js";
import {styled} from "@mui/material/styles";
import {useGetInstructionTree} from "../api_hook/useGetInstructionTree.js";
import {useGetModel} from "../api_hook/useGetModel.js";
import {useGetRedirectAnon} from "../api_hook/useGetRedirectAnon.js";
import {useNavigate} from "react-router-dom";

const ChatPaper = styled(Paper)(({theme}) => ({
	minWidth: 300,
	height: 700,
	overflow: "auto",
	padding: theme.spacing(2),
	...theme.typography.body2,
}));

function Hotpot() {
	const {websocket, agent_websocket, chat_websocket, websocket_hash} = useContext(WebSocketContext);
	const messagesEndRef = useRef(null);
	const [shownthinkingagent, setThinkingAgent] = useState(false);
	const [shownthinkingchat, setThinkingChat] = useState(false);
	const [chat_message, setChatMessage] = useState([]);
	const [agent_message, setAgentMessage] = useState([]);
	const [choosen_agent_model, setChoosenAgentModel] = useState("gpt-4");
	const [choosen_chat_model, setChoosenChatModel] = useState("gpt-4");
	const [top_p, setTopp] = useState(0.72);
	const [top_k, setTopk] = useState(-1);
	const [mode, setMode] = useState("chat");
	const [max_tokens, setMaxToken] = useState(null);
	const [usememory, setUseMemory] = useState(false);
	const [usememorycurrent, setUseMemoryCurrent] = useState(true);
	const [temperature, setTemperature] = useState(0.73);
	const [beam, setBeam] = useState(false);
	const [earlystopping, setEarlyStopping] = useState(false);
	const [bestof, setBestof] = useState(2);
	const [presencepenalty, setPresencePenalty] = useState(0);
	const [frequencypenalty, setFrequencyPenalty] = useState(0);
	const [lengthpenalty, setLengthPenalty] = useState(0);
	const [userchatmessage, setUserChatMessage] = useState("");
	const [userchatmessageError, setUserChatMessageError] = useState(false);
	const [useragentmessage, setUserAgentMessage] = useState("");
	const [useragentmessageError, setUserAgentMessageError] = useState(false);
	const [max_turn, setMaxTurn] = useState(4);
	const [duplicatemessage, setDuplicateMessage] = useState(true);
	const [instruct_change, setInstructChange] = useState(false);
	const [socket_destination, setSocketDestination] = useState("async");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const navigate = useNavigate();
	const {is_authenticated, timeZone} = useContext(UserContext);
	useGetRedirectAnon(navigate, is_authenticated);
	const {agent_objects, model_objects} = useGetModel();

	const {
		template_list: template_list,
		default_child_instruct: default_child_instruct,
		setChildInstruct: setChildInstruct,
		default_child_template_list: default_child_template_list,
		setDefaultChildTemplateList: setDefaultChildTemplateList,
		choosen_template: choosen_template,
		setChoosenTemplate: setChoosenTemplate,
		default_parent_instruct: default_parent_instruct,
		setParentInstruct: setParentInstruct,
	} = useGetInstructionTree();

	useEffect(() => {
		scrollToBottom(messagesEndRef);
	}, [chat_message, agent_message]);

	var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";

	useEffect(() => {
		const closeAndOpenWebSockets = async () => {
			closeWebSocket(websocket);
			closeWebSocket(agent_websocket);
			closeWebSocket(chat_websocket);

			if (websocket_hash) {
				const pathPrefix = socket_destination === "async" ? "-async" : "";

				const [agentSocket, chatSocket] = await Promise.all([
					new WebSocket(`${ws_scheme}://${window.location.host}/ws/engineer${pathPrefix}/${websocket_hash}/${timeZone}/`),
					new WebSocket(`${ws_scheme}://${window.location.host}/ws/chat${pathPrefix}/${websocket_hash}/${timeZone}/`),
				]);

				agent_websocket.current = agentSocket;
				chat_websocket.current = chatSocket;

				await Promise.all([
					chatsocket(chat_websocket, setChatMessage, setThinkingChat, document),
					agentsocket(agent_websocket, setAgentMessage, setThinkingAgent, document, setParentInstruct, setChildInstruct, setDefaultChildTemplateList),
				]);
			}
		};

		closeAndOpenWebSockets();
	}, [socket_destination, websocket_hash]);
	const handleEnter = (e) => {
		if (e.key == "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (duplicatemessage) {
				submitChat();
				submitAgent();
			} else if (!duplicatemessage && e.target.id == "chat-input") {
				submitChat();
			} else if (!duplicatemessage && e.target.id == "agent-input") {
				submitAgent();
			}
		}
	};
	const check_duplicate_message = (e) => {
		if (duplicatemessage) {
			setUserAgentMessage(e);
			setUserChatMessage(e);
		}
	};
	const submitAgent = () => {
		if (useragentmessage == "") {
			setUserAgentMessageError(true);
		} else {
			var data = {
				max_turn: max_turn,
				instruct_change: instruct_change,
				currentParagraph: 1,
				message: useragentmessage,
				choosen_model: choosen_agent_model,
				choosen_template: choosen_template,
				role: "Human",
				top_p: top_p,
				max_tokens: max_tokens,
				frequency_penalty: frequencypenalty,
				presence_penalty: presencepenalty,
				temperature: temperature,
				agent_instruction: default_parent_instruct,
				child_instruction: default_child_instruct,
			};
			agent_websocket.current.send(JSON.stringify(data));
			setUserAgentMessage("");
			setInstructChange(false);
		}
	};
	const submitChat = () => {
		if (userchatmessage == "") {
			setUserChatMessageError(true);
		} else {
			var data = {
				mode: mode,
				message: userchatmessage,
				choosen_model: choosen_chat_model,
				role: "Human",
				top_k: top_k,
				top_p: top_p,
				best_of: bestof,
				max_tokens: max_tokens,
				frequency_penalty: frequencypenalty,
				presence_penalty: presencepenalty,
				temperature: temperature,
				beam: beam,
				early_stopping: earlystopping,
				length_penalty: lengthpenalty,
				include_memory: usememory,
				include_current_memory: usememorycurrent,
			};
			chat_websocket.current.send(JSON.stringify(data));
			setUserChatMessage("");
		}
	};

	return (
		<Container maxWidth={false} sx={{minWidth: 1500}} disableGutters>
			<title>Hotpot</title>
			<ResponsiveAppBar max_width={false} />
			<Container maxWidth={false} sx={{minWidth: 1500}}>
				<Box m={1}>
					<Grid container spacing={2}>
						<Grid item xs={2}>
							<Paper variant='outlined'>
								<Box m={1}>
									<Typography sx={{color: "text.secondary"}}>Template Structure</Typography>
								</Box>
								<Divider />
								<List dense={true}>
									{default_child_template_list.map((instruct, index) => {
										return (
											<ListItem key={instruct.name} disablePadding>
												<ListItemButton
													selected={selectedIndex === index}
													onClick={(event) => {
														swap_child_instruction(instruct.name, "system", agent_websocket),
															handleListItemClick(event, index, setSelectedIndex);
													}}>
													<ListItemText primary={instruct.name} />
												</ListItemButton>
											</ListItem>
										);
									})}
								</List>
							</Paper>
							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='child-content' id='child-header'>
									<Typography sx={{color: "text.secondary"}}>Parent Instruction</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Paper variant='outlined'>
										<ChatInput
											id='parent-instruct'
											multiline
											maxRows={8}
											value={default_parent_instruct}
											onChange={(e) => {
												setParentInstruct(e.target.value), setInstructChange(true);
											}}
											minRows={6}
											variant='standard'
											InputProps={{
												startAdornment: <InputAdornment position='start'> </InputAdornment>,
											}}
										/>
									</Paper>
								</AccordionDetails>
							</Accordion>
							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='child-content' id='child-header'>
									<Typography sx={{color: "text.secondary"}}>Child Instruction</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Paper variant='outlined'>
										<ChatInput
											id='child-instruct'
											multiline
											maxRows={8}
											value={default_child_instruct}
											onChange={(e) => {
												setChildInstruct(e.target.value), setInstructChange(true);
											}}
											minRows={6}
											variant='standard'
											InputProps={{
												startAdornment: <InputAdornment position='start'> </InputAdornment>,
											}}
										/>
									</Paper>
								</AccordionDetails>
							</Accordion>
						</Grid>
						<Grid item xs={4}>
							<ChatBoxHotpot
								id={"chat-log"}
								inputsize={660}
								chat_message={chat_message}
								usermessage={userchatmessage}
								usermessageError={userchatmessageError}
								ChatPaper={ChatPaper}
								ChatInput={ChatInput}
								setUserMessage={setUserChatMessage}
								submitChat={submitChat}
								messagesEndRef={messagesEndRef}
								shownthinking={shownthinkingchat}
								handleEnter={handleEnter}
								check_duplicate_message={check_duplicate_message}></ChatBoxHotpot>
						</Grid>
						<Grid item xs={4}>
							<ChatBoxHotpot
								id={"chat-log-agent"}
								inputsize={660}
								chat_message={agent_message}
								usermessage={useragentmessage}
								usermessageError={useragentmessageError}
								ChatPaper={ChatPaper}
								ChatInput={ChatInput}
								setUserMessage={setUserAgentMessage}
								submitChat={submitAgent}
								messagesEndRef={messagesEndRef}
								shownthinking={shownthinkingagent}
								handleEnter={handleEnter}
								check_duplicate_message={check_duplicate_message}></ChatBoxHotpot>
						</Grid>
						<Grid item xs={2}>
							<HotpotParameter
								socket_destination={socket_destination}
								setSocketDestination={setSocketDestination}
								template_list={template_list}
								choosen_template={choosen_template}
								setChoosenTemplate={setChoosenTemplate}
								model_objects={model_objects}
								agent_objects={agent_objects}
								choosen_chat_model={choosen_chat_model}
								choosen_agent_model={choosen_agent_model}
								top_k={top_k}
								top_p={top_p}
								max_tokens={max_tokens}
								temperature={temperature}
								mode={mode}
								bestof={bestof}
								lengthpenalty={lengthpenalty}
								presencepenalty={presencepenalty}
								frequencypenalty={frequencypenalty}
								max_turn={max_turn}
								setMaxTurn={setMaxTurn}
								setBeam={setBeam}
								setMaxToken={setMaxToken}
								setBestof={setBestof}
								setTemperature={setTemperature}
								setMode={setMode}
								setLengthPenalty={setLengthPenalty}
								setPresencePenalty={setPresencePenalty}
								setFrequencyPenalty={setFrequencyPenalty}
								setTopk={setTopk}
								setTopp={setTopp}
								setUseMemory={setUseMemory}
								setUseMemoryCurrent={setUseMemoryCurrent}
								usememory={usememory}
								usememorycurrent={usememorycurrent}
								earlystopping={earlystopping}
								setEarlyStopping={setEarlyStopping}
								setChoosenAgentModel={setChoosenAgentModel}
								setChoosenChatModel={setChoosenChatModel}
								setDuplicateMessage={setDuplicateMessage}
								agent_websocket={agent_websocket}></HotpotParameter>
						</Grid>
					</Grid>
				</Box>
			</Container>
			<Footer />
		</Container>
	);
}
export default Hotpot;
