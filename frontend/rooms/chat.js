import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {UserContext, WebSocketContext} from "../App.js";
import {closeWebSocket, scrollToBottom} from "../component/chat_components/chatUtils.js";

import Box from "@mui/material/Box";
import {CeleryAlert} from "../component/alert/CeleryAlert.js";
import {ChatBox} from "../component/chat_components/Chatbox.js";
import {ChatExport} from "../component/import_export/ChatExport.js";
import ChatInput from "../component/chat_components/ChatInput.js";
import {ChatPaper} from "../component/custom_ui_component/ChatPaper.js";
import {ChatParameter} from "../component/chat_components/ChatroomParameters.js";
import Container from "@mui/material/Container";
import Footer from "../component/nav/Footer.js";
import Grid from "@mui/material/Grid";
import {MemoryTree} from "../component/chat_components/MemoryTree.js";
import ResponsiveAppBar from "../component/nav/Navbar.js";
import Stack from "@mui/material/Stack";
import {chatsocket} from "../component/websocket/ChatSocket.js";
import {useGetModel} from "../api_hook/useGetModel.js";
import {useGetRedirectAnon} from "../api_hook/useGetRedirectAnon.js";
import {useNavigate} from "react-router-dom";

function Chat() {
	const {websocket, agent_websocket, chat_websocket, websocket_hash} = useContext(WebSocketContext);
	const messagesEndRef = useRef(null);
	const [shownthinking, setThinking] = useState(false);
	const [chat_message, setChatMessage] = useState([]);
	const [choosen_model, setChoosenModel] = useState("Llama 3 Instruct AWQ");
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

	const [usermessage, setUserMessage] = useState("");
	const [usermessageError, setUserMessageError] = useState(false);
	const [socket_destination, setSocketDestination] = useState("async")
	const navigate = useNavigate();
	const {is_authenticated, timeZone} = useContext(UserContext);
	const {model_objects, agent_objects} = useGetModel();

	useGetRedirectAnon(navigate, is_authenticated);

	useEffect(() => {
		scrollToBottom(messagesEndRef);
	}, [chat_message]);
	var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    const pathPrefix = socket_destination === "async" ? "-async" : "";
	useEffect(() => {
		closeWebSocket(websocket);
		closeWebSocket(agent_websocket);
		closeWebSocket(chat_websocket);

		if (websocket_hash) {
			websocket.current = new WebSocket(`${ws_scheme}://${window.location.host}/ws/chat${pathPrefix}/${websocket_hash}/${timeZone}/`);
			chatsocket(websocket, setChatMessage, setThinking, document);
		}
	}, [socket_destination, websocket_hash]);

	const handleEnter = (e) => {
		if (e.key == "Enter" && !e.shiftKey) {
			e.preventDefault();
			submitChat();
		}
	};
	const submitChat = () => {
		if (usermessage == "") {
			setUserMessageError(true);
		} else {
			var data = {
                ...inference_parameter,
				message: usermessage,
				choosen_model: choosen_model,
				role: "Human",
			};
			websocket.current.send(JSON.stringify(data));
			setUserMessage("");
		}
	};
	const MemoMemoryTree = useMemo(() => <MemoryTree></MemoryTree>, []);
	return (
		<Container maxWidth={false} disableGutters>
			<title>Chat</title>
			<ResponsiveAppBar max_width={"xl"} />
			<Container maxWidth='xl' disableGutters>
				<Box m={2}>
					<Grid container spacing={2}>
						<Grid item xs={12} lg={4}>
							{MemoMemoryTree}
							<Stack direction='row' mt={1} spacing={1}>
								<ChatExport chat_message={chat_message} number_of_remove_message={1} setChatMessage={setChatMessage}></ChatExport>
								<Box mt={2}>
									<CeleryAlert />
								</Box>
							</Stack>
						</Grid>
						<Grid item xs={12} sm={8} lg={5.5}>
							<ChatBox
								id={"chat-log"}
								inputsize={550}
								chat_message={chat_message}
								usermessage={usermessage}
								usermessageError={usermessageError}
								ChatPaper={ChatPaper}
								ChatInput={ChatInput}
								setUserMessage={setUserMessage}
								submitChat={submitChat}
								messagesEndRef={messagesEndRef}
								shownthinking={shownthinking}
								handleEnter={handleEnter}/>
						</Grid>
						<Grid item xs={12} sm={4} lg={2.5}>
							<ChatParameter
								socket_destination={socket_destination}
								setSocketDestination={setSocketDestination}
								model_objects={model_objects}
								agent_objects={agent_objects}
								choosen_model={choosen_model}
								setChoosenModel={setChoosenModel}
                                inference_parameter={inference_parameter}
                                setInferenceParameter={setInferenceParameter}
                                room_type="chat_room"
                                />
						</Grid>
					</Grid>
				</Box>
			</Container>
			<Footer />
		</Container>
	);
}
export default Chat;
