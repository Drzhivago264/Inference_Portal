import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext, WebSocketContext} from "../App.js";
import {closeWebSocket, handleListItemClick, scrollToBottom, swap_child_instruction} from "../component/chat_components/chatUtils.js";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import {ChatBox} from "../component/chat_components/Chatbox.js";
import ChatInput from "../component/chat_components/ChatInput.js";
import { ChatPaper } from "../component/custom_ui_component/ChatPaper.js";
import { ChatParameter } from "../component/chat_components/ChatroomParameters.js";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../component/nav/Footer.js";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ResponsiveAppBar from "../component/nav/Navbar.js";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {agentsocket} from "../component/websocket/AgentSocket.js";
import {chatsocket} from "../component/websocket/ChatSocket.js";
import {swap_template} from "../component/chat_components/chatUtils.js";
import {useGetInstructionTree} from "../api_hook/useGetInstructionTree.js";
import {useGetModel} from "../api_hook/useGetModel.js";
import {useGetRedirectAnon} from "../api_hook/useGetRedirectAnon.js";
import {useNavigate} from "react-router-dom";

function Hotpot() {
	const {websocket, agent_websocket, chat_websocket, websocket_hash} = useContext(WebSocketContext);
	const messagesEndRef = useRef(null);
	const [shownthinkingagent, setThinkingAgent] = useState(false);
	const [shownthinkingchat, setThinkingChat] = useState(false);
	const [chat_message, setChatMessage] = useState([]);
	const [agent_message, setAgentMessage] = useState([]);
	const [choosen_agent_model, setChoosenAgentModel] = useState("gpt-4");
	const [choosen_chat_model, setChoosenChatModel] = useState("gpt-4");
    const [inference_parameter, setInferenceParameter] = useState(
        {
            mode: "chat",
            top_p: 0.72,
            top_k: -1,
            usememory: false,
            usememorycurrent: true,
            temperature: 0.73,
            beam: false,
            earlystopping: false,
            bestof: 2,
            presencepenalty: 0,
            frequencypenalty: 0,
            lengthpenalty: 0,
            max_tokens: null
        }
    )
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
		const isEnterKey = e.key === "Enter";
		const isChatInput = e.target.id === "chat-input";
		const isAgentInput = e.target.id === "agent-input";

		if (isEnterKey && !e.shiftKey) {
			e.preventDefault();
			if (duplicatemessage) {
				submitChat();
				submitAgent();
			} else if (!duplicatemessage && isChatInput) {
				submitChat();
			} else if (!duplicatemessage && isAgentInput) {
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
		if (!useragentmessage) {
			setUserAgentMessageError(true);
		} else {
			let data = {
				max_turn: max_turn,
				instruct_change: instruct_change,
				currentParagraph: 1,
				message: useragentmessage,
				choosen_model: choosen_agent_model,
				choosen_template: choosen_template,
				role: "Human",
				top_p: inference_parameter.top_p,
				max_tokens: inference_parameter.max_tokens,
				frequency_penalty: inference_parameter.frequencypenalty,
				presence_penalty: inference_parameter.presencepenalty,
				temperature: inference_parameter.temperature,
				agent_instruction: default_parent_instruct,
				child_instruction: default_child_instruct,
			};
			agent_websocket.current.send(JSON.stringify(data));
			setUserAgentMessage("");
			setInstructChange(false);
		}
	};
	const submitChat = () => {
		if (!userchatmessage) {
			setUserChatMessageError(true);
		} else {
			let data = {
                ...inference_parameter,
				message: userchatmessage,
				choosen_model: choosen_chat_model,
				role: "Human",
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
							<Box mb={1} mt={1} sx={{width: "50%"}}>
								<FormControl fullWidth>
									<InputLabel id='model-label'>Chat Models</InputLabel>
									<Select
										labelId='model-label'
										id='model-select'
										onChange={(e) => setChoosenChatModel(e.target.value)}
										value={choosen_chat_model}
										label='Models'
										size='small'>
										{agent_objects.map((agent_object_) => {
											return (
												<MenuItem key={agent_object_.name} value={agent_object_.name}>
													{agent_object_.name}
												</MenuItem>
											);
										})}
										{model_objects.map((model_object_) => {
											return (
												<MenuItem key={model_object_.name} value={model_object_.name}>
													{model_object_.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Box>
							<ChatBox
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
								check_duplicate_message={check_duplicate_message}></ChatBox>
						</Grid>
						<Grid item xs={4}>
							<Stack direction='row' mb={1} mt={1} spacing={1}>
								<FormControl fullWidth>
									<InputLabel id='model-label'>Agent Models</InputLabel>
									<Select
										labelId='model-label'
										id='model-select'
										onChange={(e) => setChoosenAgentModel(e.target.value)}
										value={choosen_agent_model}
										label='Models'
										size='small'>
										{agent_objects.map((agent_object_) => {
											return (
												<MenuItem key={agent_object_.name} value={agent_object_.name}>
													{agent_object_.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
								<FormControl fullWidth>
									<InputLabel id='agent-label'>Agents</InputLabel>
									<Select
										labelId='agent-label'
										id='agent-select'
										onChange={(e) => {
											setChoosenTemplate(e.target.value);
											swap_template(e.target.value, "system", agent_websocket);
										}}
										value={choosen_template}
										label='Agents'
										size='small'>
										{template_list.map((template) => {
											return (
												<MenuItem key={template.name} value={template.name}>
													{template.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Stack>
							<ChatBox
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
								check_duplicate_message={check_duplicate_message}></ChatBox>
						</Grid>
						<Grid item xs={2}>
							<ChatParameter
								socket_destination={socket_destination}
								setSocketDestination={setSocketDestination}
								model_objects={model_objects}
								agent_objects={agent_objects}
								choosen_model={choosen_chat_model}
                                inference_parameter={inference_parameter}
                                setInferenceParameter={setInferenceParameter}
								max_turn={max_turn}
								setMaxTurn={setMaxTurn}
								setDuplicateMessage={setDuplicateMessage}
                                room_type="hotpot_room"
								/>
						</Grid>
					</Grid>
				</Box>
			</Container>
			<Footer />
		</Container>
	);
}
export default Hotpot;
