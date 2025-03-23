import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext, WebSocketContext} from "../App.js";
import {closeWebSocket, scrollToBottom} from "../component/chat_components/chatUtils.js";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Alert from "@mui/material/Alert";
import AskAgainDialog from "../component/dialog/AskAgainDialog.js";
import Box from "@mui/material/Box";
import {ChatBox} from "../component/chat_components/Chatbox.js";
import ChatInput from "../component/chat_components/ChatInput.js";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Footer from "../component/nav/Footer.js";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoadingButton from "@mui/lab/LoadingButton";
import {OpenAPIParameter} from "../component/chat_components/OpenaiParameters.js";
import Paper from "@mui/material/Paper";
import ResponsiveAppBar from "../component/nav/Navbar.js";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {agentsocket} from "../component/websocket/AgentSocket";
import {baseDelete} from "../api_hook/baseDelete.js";
import {basePost} from "../api_hook/basePost.js";
import {basePut} from "../api_hook/basePut.js";
import {nanoid} from "nanoid";
import {styled} from "@mui/material/styles";
import {useGetModel} from "../api_hook/useGetModel.js";
import {useGetRedirectAnon} from "../api_hook/useGetRedirectAnon.js";
import {useGetUserInstruction} from "../api_hook/useGetUserInstruction.js";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";

const ChatPaper = styled(Paper)(({theme}) => ({
	minWidth: 300,
	height: 500,
	overflow: "auto",
	padding: theme.spacing(2),
	...theme.typography.body2,
}));

function UserInstruction() {
	const navigate = useNavigate();
	const DEFAULT_CHILDREN = {
		id: null,
		displayed_name: "",
		instruct: "",
		unique: nanoid(),
		add: false,
	};
	const {websocket, agent_websocket, chat_websocket, websocket_hash} = useContext(WebSocketContext);
	const [open_ask_again, setOpenAskAgain] = useState(false);
	const messagesEndRef = useRef(null);
	const [instruct_change, setInstructChange] = useState(false);
	const [choosen_model, setChoosenModel] = useState("gpt-4");
	const [choosen_template, setChoosenTemplate] = useState("Empty Template");
	const [chat_message, setChatMessage] = useState([]);
	const [usermessage, setUserMessage] = useState("");
	const [usermessageError, setUserMessageError] = useState(false);
	const [inference_parameter, setInferenceParameter] = useState({
		top_p: 0.72,
		temperature: 0.73,
		presencepenalty: 0,
		frequencypenalty: 0,
		max_tokens: null,
	});
	const [shownthinking, setThinking] = useState(false);
	const [max_turn, setMaxTurn] = useState(4);
	const [loading, setLoading] = useState(false);
	const [savesuccess, setSaveSuccess] = useState(false);
	const [saveerror, setSaveError] = useState(false);
	const [saveerrormessage, setSaveErrorMessage] = useState("");
	const [deletesuccess, setDeleteSuccess] = useState(false);
	const [deleteerror, setDeleteError] = useState(false);
	const [deleteerrormessage, setDeleteErrorMessage] = useState("");
	const [template_list, setTemplateList] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [add_child_error, setAddChildError] = useState(false);
	const [add_parent_error, setAddParentError] = useState(false);
	const [is_save, setIsSaved] = useState(true);
	const [max_parent_num, setMaxParentNum] = useState(null);
	const [max_child_num, setMaxChildNum] = useState(null);
	const [disable_save, setDisableSave] = useState(true);
	const [children_instruction_list, setChildInstructionList] = useState([DEFAULT_CHILDREN]);
	const {is_authenticated, timeZone} = useContext(UserContext);
	useGetRedirectAnon(navigate, is_authenticated);
	const handleOnDragEnd = (result) => {
		const items = Array.from(children_instruction_list);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setChildInstructionList(items);
	};

	const updateParentTemplate = (v, property) => {
		setInstructChange(true);
		const newTemplateList = [...template_list];
		const newTemplate = {...newTemplateList[selectedIndex]};
		newTemplate[property] = v;
		newTemplateList[selectedIndex] = newTemplate;
		setTemplateList(newTemplateList);
		if (property === "displayed_name") {
			setChoosenTemplate(v);
		}
	};
	const {mutate: templatepostemutate} = useMutation(basePost);
	const {mutate: templateputemutate} = useMutation(basePut);
	const submitTemplate = () => {
		setLoading(true);
		const data = {
			parent_instruction: template_list[selectedIndex],
			childrens: children_instruction_list,
		};

		if (!template_list[selectedIndex]["id"]) {
			templatepostemutate(
				{url: "/frontend-api/post-user-instruction", data: data},
				{
					onSuccess: () => {
						refetch();
						setSaveSuccess(true);
						setLoading(false);
						setIsSaved(true);
					},
					onError: (error) => {
						setLoading(false);
						setSaveError(true);
						if (error.response.status === 400) {
							setSaveErrorMessage("Invalid Data");
						} else {
							setSaveErrorMessage(error.response.data.detail);
						}
					},
				}
			);
			setDisableSave(true);
		} else {
			templateputemutate(
				{url: "/frontend-api/update-user-instruction", data: data},
				{
					onSuccess: () => {
						setSaveSuccess(true);
						setLoading(false);
						setIsSaved(true);
					},
					onError: (error) => {
						setLoading(false);
						setSaveError(true);
						if (error.response.status === 400) {
							setSaveErrorMessage("Invalid Data");
						} else {
							setSaveErrorMessage(error.response.data.detail);
						}
					},
				}
			);

			setDisableSave(true);
		}
	};
	const {mutate: templatedeletemutate} = useMutation(baseDelete);
	const deleteTemplate = (id) => {
		const data = {
			id: id,
		};
		templatedeletemutate(
			{url: "/frontend-api/delete-user-instruction", data: data},
			{
				onSuccess: () => setDeleteSuccess(true),
				onError: (error) => {
					if (error.response.status === 400) {
						setSaveErrorMessage("Invalid Data");
					} else {
						setDeleteErrorMessage(error.response.data.detail);
					}
				},
			}
		);
	};
	const handleTextFieldChange = (index, property, value) => {
		const updatedList = children_instruction_list.map((instruction, idx) => {
			if (idx === index) {
				return {...instruction, [property]: value};
			}
			return instruction;
		});
		setChildInstructionList(updatedList);
		updateParentTemplate(updatedList, "children");
	};

	const handleListItemClick = (_, index) => {
		if (!disable_save) {
			submitTemplate();
		}
		const defaultChildInstructions =
			template_list[index]["children"] === null
				? [DEFAULT_CHILDREN]
				: template_list[index]["children"].map((child) => ({
						...child,
						add: false,
				  }));

		setChildInstructionList(defaultChildInstructions);
		setSelectedIndex(index);
	};

	const addParent = () => {
		if (template_list.length < max_parent_num) {
			setIsSaved(false);
			const newTemplate = {
				id: null,
				displayed_name: "",
				instruct: "",
				children: [DEFAULT_CHILDREN],
			};
			setTemplateList([...template_list, newTemplate]);
			setChildInstructionList([]);
			setSelectedIndex(template_list.length);
		} else {
			setAddParentError(true);
		}
	};

	const deleteParent = () => {
		const newTemplateList = [...template_list];
		const nodeToDelete = template_list[selectedIndex];
		if (nodeToDelete.id !== null) {
			deleteTemplate(nodeToDelete.id);
			setDeleteSuccess(true);
		}
		setIsSaved(true);
		newTemplateList.splice(selectedIndex, 1);
		setTemplateList(newTemplateList);
		if (template_list.length < max_parent_num) {
			if (newTemplateList.length > 0) {
				setDeleteSuccess(true);
			} else {
				const newTemplateList = [
					{
						id: null,
						displayed_name: "",
						instruct: "",
						children: null,
					},
				];
				setTemplateList(newTemplateList);
				setChildInstructionList([DEFAULT_CHILDREN]);
			}
			handleListItemClick(null, 0);
		} else {
			setAddParentError(false);
			handleListItemClick(null, 0);
		}
	};

	const addChild = () => {
		if (children_instruction_list.length < max_child_num) {
			setAddChildError(false);
			const newChildrenInstructionList = [...children_instruction_list, DEFAULT_CHILDREN];
			setChildInstructionList(newChildrenInstructionList);
		} else {
			setAddChildError(true);
		}
	};

	const deleteChild = (index) => {
		const newChildrenInstructionList = [...children_instruction_list];
		const nodeToDelete = children_instruction_list[index];
		if (newChildrenInstructionList.length < max_child_num) {
			newChildrenInstructionList.splice(index, 1);
			setChildInstructionList(newChildrenInstructionList);
			if (nodeToDelete.id !== null) {
				deleteTemplate(nodeToDelete.id);
				setDeleteSuccess(true);
			}
		} else {
			newChildrenInstructionList.splice(-1);
			setChildInstructionList(newChildrenInstructionList);
			setAddChildError(false);
			if (nodeToDelete.id !== null) {
				deleteTemplate(nodeToDelete.id);
				setDeleteSuccess(true);
			}
		}
	};

	useEffect(() => {
		scrollToBottom(messagesEndRef);
	}, [chat_message]);

	let ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";

	useEffect(() => {
		closeWebSocket(websocket);
		closeWebSocket(agent_websocket);
		closeWebSocket(chat_websocket);
		if (websocket_hash) {
			websocket.current = new WebSocket(`${ws_scheme}://${window.location.host}/ws/engineer-async/${websocket_hash}/${timeZone}/`);
			agentsocket(websocket, setChatMessage, setThinking, document);
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
			return;
		}
		let user_child_instruct = children_instruction_list
			.filter((child) => child.add)
			.map((child) => child.instruct)
			.join("\n");

		let user_parent_instruct = template_list[selectedIndex].instruct;

		const data = {
			...inference_parameter,
			instruct_change: instruct_change,
			max_turn: max_turn,
			currentParagraph: 1,
			message: usermessage,
			choosen_model: choosen_model,
			choosen_template: choosen_template,
			role: "Human",
			agent_instruction: user_parent_instruct,
			child_instruction: user_child_instruct,
		};

		websocket.current.send(JSON.stringify(data));
		setUserMessage("");
		setInstructChange(false);
	};
	const {agent_objects} = useGetModel();
	const {refetch} = useGetUserInstruction(selectedIndex, setMaxChildNum, setMaxParentNum, setAddParentError, setTemplateList, setChildInstructionList);
	return (
		<Container maxWidth={false} sx={{minWidth: 1350}} disableGutters>
			<title>Templates</title>
			<ResponsiveAppBar max_width={false} />
			<Container maxWidth='xxl' disableGutters>
				<Box m={2}>
					<Grid container spacing={2}>
						<Grid item sm={3} md={2}>
							<Paper sx={{mr: 2}} variant='outlined'>
								<Typography ml={2} mt={1} variant='body1' sx={{color: "text.secondary"}}>
									Instruction Template
								</Typography>
								<List>
									{template_list.map((t, index) => (
										<ListItemButton
											sx={{height: 38}}
											key={index}
											selected={selectedIndex === index}
											onClick={(event) => handleListItemClick(event, index)}>
											<ListItemIcon>{selectedIndex === index ? <FolderOpenIcon /> : <FolderIcon />}</ListItemIcon>
											<ListItemText
												primaryTypographyProps={{
													fontWeight: "medium",
													variant: "body2",
													style: {
														whiteSpace: "nowrap",
														overflow: "hidden",
														textOverflow: "ellipsis",
													},
												}}
												primary={t.displayed_name}
											/>
										</ListItemButton>
									))}
									<Box display='flex' justifyContent='center' alignItems='center'>
										{add_parent_error && <Alert severity='warning'>Reaching the maximum number of parent ({max_parent_num}).</Alert>}
										{!add_parent_error && is_save && (
											<IconButton aria-label='add' onClick={addParent}>
												<AddCircleOutlineIcon />
											</IconButton>
										)}
										{template_list.length > 1 && (
											<IconButton aria-label='delete' onClick={() => {setOpenAskAgain(true)}}>
												<DeleteIcon />
											</IconButton>
										)}
										{open_ask_again && (
											<AskAgainDialog executing_function={deleteParent} delete_object_name='Template' setOpenAskAgain={setOpenAskAgain} />
										)}
									</Box>
								</List>
							</Paper>
							<Box sx={{mr: 2, mt: 2}}>
								<OpenAPIParameter
									inference_parameter={inference_parameter}
									setInferenceParameter={setInferenceParameter}
									agent_objects={agent_objects}
									choosen_model={choosen_model}
									setChoosenModel={setChoosenModel}
									max_turn={max_turn}
									setMaxTurn={setMaxTurn}
									isToolBox={true}
								/>
							</Box>
						</Grid>
						<Divider orientation='vertical' flexItem sx={{mr: "-1px"}} />
						<Grid item sm={5} md={6}>
							<Box mr={4}>
								<Typography ml={1} mb={1} mt={1} variant='body1'>
									Template
								</Typography>
								<FormControl fullWidth sx={{m: 1}} variant='standard'>
									{template_list.map((t, index) => {
										if (selectedIndex === index) {
											return (
												<Box key={index} display='flex'>
													<Paper elevation={5} style={{width: "100%"}}>
														<Box
															p={2}
															style={{
																width: "100%",
															}}>
															<Stack direction='row' justifyContent='space-between'>
																<TextField
																	label='Template Name'
																	multiline
																	maxRows={1}
																	InputLabelProps={{
																		shrink: true,
																	}}
																	size='small'
																	defaultValue={t["displayed_name"]}
																	onChange={(e) => {
																		updateParentTemplate(e.target.value, "displayed_name");
																		setDisableSave(false);
																	}}
																	inputProps={{
																		maxLength: 35,
																	}}
																/>
																<FormControlLabel disabled control={<Checkbox defaultChecked />} label='Added' />
															</Stack>
															<FormControl fullWidth sx={{mt: 1}} variant='standard'>
																<TextField
																	label='Parent Instruction'
																	multiline
																	minRows={9}
																	maxRows={11}
																	InputLabelProps={{
																		shrink: true,
																	}}
																	onChange={(e) => {
																		updateParentTemplate(e.target.value, "instruct");
																		setDisableSave(false);
																	}}
																	defaultValue={t["instruct"]}
																	inputProps={{
																		maxLength: 2500,
																	}}
																/>
															</FormControl>
														</Box>
													</Paper>
												</Box>
											);
										}
									})}
									<DragDropContext onDragEnd={handleOnDragEnd}>
										<Droppable droppableId='childrens'>
											{(provided) => (
												<Box className='childrens' {...provided.droppableProps} ref={provided.innerRef}>
													{children_instruction_list &&
														children_instruction_list.map((child, index) => (
															<Draggable key={child.id ?? child.unique} draggableId={`${child.id ?? child.unique}`} index={index}>
																{(provided) => (
																	<Box
																		mt={1}
																		mb={1}
																		display='flex'
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}>
																		<Box mr={2}>
																			<Divider orientation='vertical' />
																		</Box>
																		<Paper elevation={2} style={{width: "100%"}}>
																			<Stack
																				direction='row'
																				p={2}
																				style={{
																					width: "100%",
																				}}>
																				<Box>
																					<IconButton aria-label='delete'>
																						<DragHandleIcon />
																					</IconButton>
																				</Box>
																				<Box mt={1} mb={1} style={{width: "100%"}}>
																					<Stack
																						direction='row'
																						sx={{
																							display: "flex",
																							justifyContent: "space-between",
																						}}>
																						<TextField
																							label={`Children No.${index} Name`}
																							inputProps={{
																								maxLength: 35,
																							}}
																							maxRows={1}
																							defaultValue={child.displayed_name}
																							size='small'
																							InputLabelProps={{
																								shrink: true,
																							}}
																							onChange={(e) => {
																								handleTextFieldChange(index, "displayed_name", e.target.value);
																								setDisableSave(false);
																							}}
																						/>
																						<Box>
																							<FormControlLabel
																								control={
																									<Checkbox
																										onChange={(e) => {
																											handleTextFieldChange(
																												index,
																												"add",
																												e.target.checked
																											);
																										}}
																									/>
																								}
																								label='Add'
																							/>
																							<IconButton
																								size='small'
																								aria-label='delete'
																								onClick={() => {
																									deleteChild(index);
																								}}>
																								<DeleteIcon size='small' />
																							</IconButton>
																						</Box>
																					</Stack>
																					<FormControl
																						fullWidth
																						sx={{
																							mt: 1,
																						}}
																						variant='standard'>
																						<TextField
																							label={`Child No.${index} Instruction`}
																							multiline
																							minRows={6}
																							inputProps={{
																								maxLength: 2500,
																							}}
																							InputLabelProps={{
																								shrink: true,
																							}}
																							fullWidth
																							maxRows={8}
																							defaultValue={child.instruct}
																							onChange={(e) => {
																								handleTextFieldChange(index, "instruct", e.target.value);
																								setDisableSave(false);
																							}}
																						/>
																					</FormControl>
																				</Box>
																			</Stack>
																		</Paper>
																	</Box>
																)}
															</Draggable>
														))}
													{provided.placeholder}
												</Box>
											)}
										</Droppable>
									</DragDropContext>
									<Box display='flex' justifyContent='center' alignItems='center'>
										<Box mr={1}>
											<LoadingButton
												size='small'
												loading={loading}
												disabled={disable_save}
												loadingPosition='end'
												variant='contained'
												onClick={submitTemplate}
												endIcon={<SaveIcon />}>
												Save
											</LoadingButton>
										</Box>
										{add_child_error && <Alert severity='warning'>Reaching the maximum number of child ({max_child_num}).</Alert>}
										{!add_child_error && (
											<IconButton
												aria-label='add'
												onClick={() => {
													addChild();
												}}>
												<AddCircleOutlineIcon />
											</IconButton>
										)}
										{[
											{
												open: savesuccess,
												autoHideDuration: 3000,
												onClose: () => setSaveSuccess(false),
												severity: "success",
												message: "Saved!",
											},
											{
												open: saveerror,
												autoHideDuration: 6000,
												onClose: () => setSaveError(false),
												severity: "error",
												message: saveerrormessage,
											},
											{
												open: deletesuccess,
												autoHideDuration: 3000,
												onClose: () => setDeleteSuccess(false),
												severity: "success",
												message: "Deleted!",
											},
											{
												open: deleteerror,
												autoHideDuration: 6000,
												onClose: () => setDeleteError(false),
												severity: "error",
												message: deleteerrormessage,
											},
										].map((item, index) => (
											<Snackbar key={index} open={item.open} autoHideDuration={item.autoHideDuration} onClose={item.onClose}>
												<Alert severity={item.severity} sx={{width: "100%"}}>
													{item.message}
												</Alert>
											</Snackbar>
										))}
									</Box>
								</FormControl>
							</Box>
						</Grid>
						<Divider orientation='vertical' flexItem sx={{mr: "-1px"}} />
						<Grid item xs={4}>
							<Typography mt={1} mb={1} variant='body1'>
								Testbed
							</Typography>
							<ChatBox
								id={"chat-log-agent"}
								inputsize={300}
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
					</Grid>
				</Box>
			</Container>
			<Footer />
		</Container>
	);
}
export default UserInstruction;
