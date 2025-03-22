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
import {DataGrid} from "@mui/x-data-grid";
import Footer from "../component/nav/Footer.js";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import {MemoryTree} from "../component/chat_components/MemoryTree.js";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import ResponsiveAppBar from "../component/nav/Navbar.js";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {chatsocket} from "../component/websocket/ChatSocket.js";
import {useGetModel} from "../api_hook/useGetModel.js";
import {useGetRedirectAnon} from "../api_hook/useGetRedirectAnon.js";
import {useGetUserDataset} from "../api_hook/useGetUserDataset.js";
import {useGetUserDatasetRecord} from "../api_hook/useGetUserDatasetRecord.js";
import {useNavigate} from "react-router-dom";

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{pt: 3}}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
	children: PropTypes.any.isRequired,
	value: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
};
function Chat() {
	const {websocket, agent_websocket, chat_websocket, websocket_hash} = useContext(WebSocketContext);
	const [total_row, setTotalRow] = useState(0);
	const [paginationModel, setPaginationModel] = useState({
		pageSize: 10,
		page: 0,
	});
	const [dataset_is_loading, setDatasetIsLoading] = useState(true);
	const [dataset_row, setDatasetRow] = useState([]);
	const [dataset_column, setDatasetColumn] = useState([]);
	const [dataset_list, setDatasetList] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const messagesEndRef = useRef(null);
	const [shownthinking, setThinking] = useState(false);
	const [chat_message, setChatMessage] = useState([]);
	const [choosen_model, setChoosenModel] = useState("gpt-4");
	const [inference_parameter, setInferenceParameter] = useState({
		mode: "chat",
		top_p: 0.72,
		top_k: -1,
		usememory: false,
        usememorydataset:false,
		usememorycurrent: true,
		temperature: 0.73,
		beam: false,
		earlystopping: false,
		bestof: 2,
		presencepenalty: 0,
		frequencypenalty: 0,
		lengthpenalty: 0,
		max_tokens: null,
	});
	const [usermessage, setUserMessage] = useState("");
	const [usermessageError, setUserMessageError] = useState(false);
	const [socket_destination, setSocketDestination] = useState("async");
	const navigate = useNavigate();
	const {is_authenticated, timeZone} = useContext(UserContext);
	const {model_objects, agent_objects} = useGetModel();

	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			"aria-controls": `simple-tabpanel-${index}`,
		};
	}

	const [current_tab, setCurrentTab] = useState(0);

	const handleTabChange = (_, newValue) => {
		setCurrentTab(newValue);
	};

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
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			submitChat();
		}
	};
	const submitChat = () => {
		if (usermessage === "") {
			setUserMessageError(true);
		} else {
			let data = {
				...inference_parameter,
				message: usermessage,
				choosen_model: choosen_model,
                dataset: dataset_list.length > 0 ? dataset_list[selectedIndex].name : null,
				role: "Human",
			};
			websocket.current.send(JSON.stringify(data));
			setUserMessage("");
		}
	};
	const MemoMemoryTree = useMemo(() => <MemoryTree></MemoryTree>, []);
	const pagination_navigation = (value) => {
		setPaginationModel(value);
		setDatasetIsLoading(true);
	};

	const {isLoading: datasetIsLoading} = useGetUserDataset(setDatasetList, dataset_list, null, null, selectedIndex);

	useGetUserDatasetRecord(setDatasetIsLoading, null, dataset_list, dataset_row, selectedIndex, paginationModel, setDatasetColumn, setDatasetRow, setTotalRow);
	return (
		<Container maxWidth={false} disableGutters>
			<title>Chat</title>
			<ResponsiveAppBar max_width={"xl"} />
			<Container maxWidth='xl' disableGutters>
				<Box m={2}>
					<Grid container spacing={2}>
						<Grid item xs={12} lg={4}>
							<Box sx={{borderBottom: 1, borderColor: "divider"}}>
								<Tabs value={current_tab} onChange={handleTabChange} aria-label='basic tabs'>
									<Tab label='Embedding Dataset' {...a11yProps(0)} />
									<Tab label='Memory Tree' {...a11yProps(1)} />
								</Tabs>
							</Box>
							<CustomTabPanel value={current_tab} index={0}>
								{dataset_list.length > 0 && (
									<FormControl fullWidth defaultValue=''>
										<InputLabel id='dataset-label'>Dataset</InputLabel>
										<Select
											labelId='dataset-label'
											id='dataset-select'
											onChange={(e) => setSelectedIndex(e.target.value)}
											value={selectedIndex}
											label='Dataset'
											size='small'>
											{dataset_list.map((dataset) => {
												return (
													<MenuItem key={dataset.name} value={selectedIndex}>
														{dataset.name}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								)}
								<Box style={{height: 550, width: "100%"}}>
									<DataGrid
										loading={dataset_list.length > 0 ? datasetIsLoading || dataset_is_loading : false}
										paginationModel={paginationModel}
										onPaginationModelChange={(e) => {
											pagination_navigation(e);
										}}
										disableAutosize
										rows={dataset_row}
										columns={dataset_column}
										pageSizeOptions={[10]}
										paginationMode='server'
										rowCount={total_row}
									/>
								</Box>
							</CustomTabPanel>
							<CustomTabPanel value={current_tab} index={1}>
								{MemoMemoryTree}
							</CustomTabPanel>

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
								handleEnter={handleEnter}
							/>
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
								room_type='chat_room'
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


