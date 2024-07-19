import { Divider, List, Typography } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext, WebSocketContext } from '../App.js'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { ChatBox } from '../component/chat_components/Chatbox.js';
import ChatInput from '../component/chat_components/ChatInput.js';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Footer from '../component/nav/Footer.js';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoadingButton from '@mui/lab/LoadingButton';
import { OpenAPIParameter } from '../component/chat_components/OpenaiParameters.js';
import Paper from '@mui/material/Paper';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { agentsocket } from '../component/websocket/AgentSocket';
import axios from 'axios';
import { getCookie } from '../component/getCookie';
import { nanoid } from 'nanoid'
import { redirect_anon_to_login } from '../component/checkLogin.js';
import { styled } from '@mui/material/styles';
import { useGetModel } from '../component/api_hook/useGetModel.js';
import { useNavigate } from 'react-router-dom';

const ChatPaper = styled(Paper)(({ theme }) => ({
    minWidth: 300,
    height: 500,
    overflow: 'auto',
    padding: theme.spacing(2),
    ...theme.typography.body2,
}));

function UserInstruction() {
    const navigate = useNavigate();
    const { websocket, agent_websocket, chat_websocket, websocket_hash } = useContext(WebSocketContext);
    const messagesEndRef = useRef(null)
    const [instruct_change, setInstructChange] = useState(false)
    const [choosen_model, setChoosenModel] = useState("gpt-4");
    const [choosen_template, setChoosenTemplate] = useState("Empty Template");
    const [chat_message, setChatMessage] = useState([]);
    const [usermessage, setUserMessage] = useState("");
    const [usermessageError, setUserMessageError] = useState(false);
    const [top_p, setTopp] = useState(0.72);
    const [max_tokens, setMaxToken] = useState(null);
    const [temperature, setTemperature] = useState(0.73);
    const [presencepenalty, setPresencePenalty] = useState(0);
    const [frequencypenalty, setFrequencyPenalty] = useState(0);
    const [shownthinking, setThinking] = useState(false);
    const [max_turn, setMaxTurn] = useState(4)
    const [loading, setLoading] = useState(false);
    const [savesuccess, setSaveSuccess] = useState(false);
    const [saveerror, setSaveError] = useState(false);
    const [saveerrormessage, setSaveErrorMessage] = useState('');
    const [deletesuccess, setDeleteSuccess] = useState(false);
    const [deleteerror, setDeleteError] = useState(false);
    const [deleteerrormessage, setDeleteErrorMessage] = useState('');
    const [template_list, setTemplateList] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [add_child_error, setAddChildError] = useState(false)
    const [add_parent_error, setAddParentError] = useState(false)
    const [is_save, setIsSaved] = useState(true)
    const [reload, setReload] = useState(false)
    const [max_parent_num, setMaxParentNum] = useState(null)
    const [max_child_num, setMaxChildNum] = useState(null)
    const [disable_save, setDisableSave] = useState(true)
    const [children_instruction_list, setChildInstructionList] = useState([
        { id: null, dislayed_name: "", instruct: "", unique: nanoid(), add: false },
    ])
    const { is_authenticated, timeZone } = useContext(UserContext);

    const handleOnDragEnd = (result) => {
        const items = Array.from(children_instruction_list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setChildInstructionList(items);
    }

    const updateParentTemplate = (v, property) => {
        setInstructChange(true)
        const new_template_list = [...template_list]
        const new_template = { ...template_list[selectedIndex] }
        new_template[property] = v
        new_template_list[selectedIndex] = new_template
        setTemplateList(new_template_list)
        if (property == "displayed_name") {
            setChoosenTemplate(v)
        }
    }

    const submitTemplate = () => {
        setLoading(true)
        const csrftoken = getCookie('csrftoken');
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        }
        const data = {
            "parent_instruction": template_list[selectedIndex],
            "childrens": children_instruction_list
        }

        if (!template_list[selectedIndex]['id']) {
            axios.post("/frontend-api/post-user-instruction", data, config)
                .then(() => {
                    setReload(true)
                    setSaveSuccess(true)
                    setLoading(false)
                    setIsSaved(true)

                }).catch(error => {
                    setLoading(false)
                    setSaveError(true)
                    if (error.code === "ERR_BAD_RESPONSE") {
                        setSaveErrorMessage("Failed, Internal Server Error!")
                    }
                    else {
                        setSaveErrorMessage(error.response.data.detail)
                    }
                });
            setDisableSave(true)
        }
        else {
            axios.put("/frontend-api/update-user-instruction", data, config)
                .then(() => {
                    setSaveSuccess(true)
                    setLoading(false)
                    setIsSaved(true)

                }).catch(error => {
                    setLoading(false)
                    setSaveError(true)
                    if (error.code === "ERR_BAD_RESPONSE") {
                        setSaveErrorMessage("Failed, Internal Server Error!")
                    }
                    else {
                        setSaveErrorMessage(error.response.data.detail)
                    }
                });
            setDisableSave(true)
        }
    }

    const deleteTemplate = (id) => {
        const csrftoken = getCookie('csrftoken');
        axios.delete("/frontend-api/delete-user-instruction", {
            data: {
                'id': id
            },
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        })
            .then(() => {
                setDeleteSuccess(true)
            }).catch(error => {
                setDeleteError(true)
                if (error.code === "ERR_BAD_RESPONSE") {
                    setSaveErrorMessage("Failed, Internal Server Error!")
                }
                else {
                    setDeleteErrorMessage(error.response.data.detail)
                }
            });
    }
    const handleTextFieldChange = (index, property, value) => {
        const new_children_instruction_list = [...children_instruction_list];
        const new_instruction = { ...children_instruction_list[index] };
        new_instruction[property] = value;
        new_children_instruction_list[index] = new_instruction;
        setChildInstructionList(new_children_instruction_list)
        updateParentTemplate(new_children_instruction_list, 'children')
    }
    const handleListItemClick = (event, index) => {
        if (!disable_save) {
            submitTemplate()
        }
        let default_child_instruction = []
        if (template_list[index]['children'] === null) {
            setChildInstructionList([{ id: null, displayed_name: "", instruct: "", unique: nanoid(), add: false }])
        }
        else {
            for (let c in template_list[index]['children']) {
                default_child_instruction.push({
                    'id': template_list[index]['children'][c]['id'],
                    'displayed_name': template_list[index]['children'][c]['displayed_name'],
                    'instruct': template_list[index]['children'][c]['instruct'],
                    'add': false
                })
            }
            setChildInstructionList(default_child_instruction)
        }
        setSelectedIndex(index);
    };
    const addParent = (operation) => {
        let length = template_list.length
        if (length < max_parent_num) {
            if (operation == "add") {
                setIsSaved(false)
                const new_template_list = [...template_list, {
                    id: null,
                    displayed_name: "",
                    instruct: "",
                    children: [{ id: null, displayed_name: "", instruct: "", unique: nanoid(), add: false }]
                }];
                setTemplateList(new_template_list)
                setChildInstructionList([])
                setSelectedIndex(template_list.length)
            }
            else if (operation == "delete") {
                setIsSaved(true)
                const new_template_list = [...template_list];
                const node_to_delete = template_list[selectedIndex]
                if (node_to_delete.id !== null) {
                    deleteTemplate(node_to_delete.id)
                    setDeleteSuccess(true)
                }
                new_template_list.splice(selectedIndex, 1);
                setTemplateList(new_template_list)
                if (new_template_list.length > 0) {
                    handleListItemClick(null, 0)
                    setDeleteSuccess(true)
                }
                else {
                    handleListItemClick(null, 0)
                    const new_template_list = [{ id: null, displayed_name: "", instruct: "", children: null }];
                    setTemplateList(new_template_list)
                    setChildInstructionList([
                        { id: null, displayed_name: ``, instruct: "", unique: nanoid(), add: false },
                    ])
                }
            }
        }
        else {
            setAddParentError(true)
            if (operation == "delete") {
                setIsSaved(true)
                const new_template_list = [...template_list];
                const node_to_delete = template_list[selectedIndex]
                if (node_to_delete.id !== null) {
                    deleteTemplate(node_to_delete.id)
                    setDeleteSuccess(true)
                }
                new_template_list.splice(selectedIndex, 1);
                setTemplateList(new_template_list)
                setAddParentError(false)
                handleListItemClick(null, 0)
            }
        }
    }
    const addChild = (operation, index) => {
        let length = children_instruction_list.length
        var node_to_delete = null;
        setReload(false)
        if (length < max_child_num) {
            setAddChildError(false)
            if (operation == "add") {
                const new_children_instruction_list = [...children_instruction_list, { id: null, displayed_name: ``, instruct: "", unique: nanoid(), add: false }];
                setChildInstructionList(new_children_instruction_list)
            }
            else if (operation == "delete") {
                const new_children_instruction_list = [...children_instruction_list];
                node_to_delete = children_instruction_list[index]
                new_children_instruction_list.splice(index, 1);
                setChildInstructionList(new_children_instruction_list)
                if (node_to_delete.id !== null) {
                    deleteTemplate(node_to_delete.id)
                    setDeleteSuccess(true)
                }
            }
        }
        else {
            setAddChildError(true)
            if (operation == "delete") {
                const new_children_instruction_list = [...children_instruction_list];
                node_to_delete = children_instruction_list[index]
                new_children_instruction_list.splice(-1);
                setChildInstructionList(new_children_instruction_list)
                setAddChildError(false)
                if (node_to_delete.id !== null) {
                    deleteTemplate(node_to_delete.id)
                    setDeleteSuccess(true)
                }
            }
        }
    }
    const request_instruction = (index) => {
        axios.all([
            axios.get('/frontend-api/get-user-instruction'),
        ])
            .then(axios.spread((template_object) => {
                if (template_object.status != 204) {
                    setMaxChildNum(template_object.data.max_child_num)
                    setMaxParentNum(template_object.data.max_parent_num)
                    let template_list = []
                    if (template_object.data.root_nodes.length >= template_object.data.max_parent_num) {
                        setAddParentError(true)
                    }
                    if (template_object.data.root_nodes.length == 0) {
                        setTemplateList([{
                            'template_list_index': 0,
                            'id': null,
                            'displayed_name': "Empty Template",
                            'instruct': "",
                            'children': [{
                                'id': null,
                                'displayed_name': "",
                                'instruct': "",
                                'unique': nanoid(),
                                'add': false
                            }],
                        }])
                    }
                    else {
                        for (let template in template_object.data.root_nodes) {
                            if (template == index) {
                                let default_child_instruction = []
                                for (let c in template_object.data.root_nodes[template].children) {
                                    default_child_instruction.push({
                                        'id': template_object.data.root_nodes[template].children[c]['id'],
                                        'displayed_name': template_object.data.root_nodes[template].children[c]['displayed_name'],
                                        'instruct': template_object.data.root_nodes[template].children[c]['instruct'],
                                        'add': false
                                    })
                                }
                                setChildInstructionList(default_child_instruction)
                            }
                            template_list.push({
                                'id': template_object.data.root_nodes[template]['id'],
                                'displayed_name': template_object.data.root_nodes[template]['displayed_name'],
                                'instruct': template_object.data.root_nodes[template]['instruct'],
                                'children': template_object.data.root_nodes[template]['children']
                            })
                        }
                        setTemplateList(template_list)
                    }
                }
            }))
            .catch(error => {
                setMaxChildNum(error.response.data.max_child_num)
                setMaxParentNum(error.response.data.max_parent_num)
            });
    }
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'nearest' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chat_message]);

    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";

    useEffect(() => {
        if (websocket.current) {
            websocket.current.close()
        }
        if (agent_websocket.current) {
            agent_websocket.current.close()
        }
        if (chat_websocket.current) {
            chat_websocket.current.close()
        }
        if (websocket_hash) {
            websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + "/ws/engineer-async/" + websocket_hash + '/' + timeZone + '/');
            agentsocket(
                websocket,
                setChatMessage,
                setThinking,
                document,
            )
        }
    }, [websocket_hash]);

    useEffect(() => {
        if (reload) {
            request_instruction(selectedIndex)
        }
    }, [reload]);
    useEffect(() => {
        request_instruction(0)
    }, []);
    const handleEnter = (e) => {
        if (e.key == "Enter" && !e.shiftKey) {
            e.preventDefault()
            submitChat()
        }
    }
    const submitChat = () => {
        if (usermessage == '') {
            setUserMessageError(true)
        }
        else {
            let user_child_instruct = ''
            for (let i in children_instruction_list) {
                if (children_instruction_list[i]['add']) {
                    user_child_instruct = user_child_instruct + "\n" + children_instruction_list[i]['instruct']
                }
            }
            let user_parent_instruct = template_list[selectedIndex]['instruct']
            var data = {
                'instruct_change': instruct_change,
                'max_turn': max_turn,
                'currentParagraph': 1,
                'message': usermessage,
                'choosen_model': choosen_model,
                'choosen_template': choosen_template,
                'role': 'Human',
                'top_p': top_p,
                'max_tokens': max_tokens,
                'frequency_penalty': frequencypenalty,
                'presence_penalty': presencepenalty,
                'temperature': temperature,
                'agent_instruction': user_parent_instruct,
                'child_instruction': user_child_instruct
            }
            websocket.current.send(JSON.stringify(data))
            setUserMessage("")
            setInstructChange(false)
        }
    }
    const {agent_objects} = useGetModel()

    useEffect(() => {
        redirect_anon_to_login(navigate, is_authenticated)
    }, []);
    
    return (
        <Container maxWidth={false} sx={{ minWidth: 1200 }} disableGutters>
            <title>Templates</title>
            <ResponsiveAppBar max_width={false} />
            <Container maxWidth="xxl" >
                <Box m={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Paper sx={{ mr: 2 }} variant='outlined'>
                                <Typography m={1} variant='body1' sx={{ color: 'text.secondary' }}>
                                    Instruction Template
                                </Typography>
                                <List>
                                    {template_list.map((t, index) => {
                                        return (
                                            <ListItemButton sx={{ height: 38 }}
                                                key={index}
                                                selected={selectedIndex === index}
                                                onClick={(event) => handleListItemClick(event, index)}
                                            >
                                                <ListItemIcon>
                                                    {selectedIndex === index && <FolderOpenIcon />}
                                                    {selectedIndex !== index && <FolderIcon />}
                                                </ListItemIcon>
                                                <ListItemText primaryTypographyProps={{
                                                    fontWeight: 'medium',
                                                    variant: 'body2',
                                                    style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
                                                }} primary={t.displayed_name} />
                                            </ListItemButton>
                                        )
                                    })}
                                    <Box display="flex" justifyContent="center"
                                        alignItems="center">
                                        {add_parent_error && <Alert severity="warning">Reaching the maximum number of parent ({max_parent_num}).</Alert>}
                                        {!add_parent_error && is_save &&
                                            <IconButton aria-label="add" onClick={() => { addParent("add") }}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        }
                                        {template_list.length > 1 && <IconButton aria-label="delete" onClick={() => { addParent("delete") }}>
                                            <DeleteIcon />
                                        </IconButton>}
                                    </Box>
                                </List>
                            </Paper>
                            <Box sx={{ mr: 2, mt: 2 }} >
                                <OpenAPIParameter
                                    top_p={top_p}
                                    agent_objects={agent_objects}
                                    choosen_model={choosen_model}
                                    setChoosenModel={setChoosenModel}
                                    setTopp={setTopp}
                                    temperature={temperature}
                                    setTemperature={setTemperature}
                                    max_tokens={max_tokens}
                                    setMaxToken={setMaxToken}
                                    presencepenalty={presencepenalty}
                                    setPresencePenalty={setPresencePenalty}
                                    frequencypenalty={frequencypenalty}
                                    setFrequencyPenalty={setFrequencyPenalty}
                                    max_turn={max_turn}
                                    setMaxTurn={setMaxTurn}
                                >
                                </OpenAPIParameter>
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item xs={6}>
                            <Box mr={4}>
                                <Typography ml={1} mb={1} mt={1} variant='body1'>
                                    Template
                                </Typography>
                                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                    {template_list.map((t, index) => {
                                        if (selectedIndex == index) {
                                            return (
                                                <Box key={index} display="flex">
                                                    <Paper elevation={5} style={{ width: '100%' }}>
                                                        <Box p={2} style={{ width: '100%' }}>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <TextField
                                                                    label="Template Name"
                                                                    multiline
                                                                    maxRows={1}
                                                                    InputLabelProps={{ shrink: true }}
                                                                    size="small"
                                                                    defaultValue={t['displayed_name']}
                                                                    onChange={(e) => { updateParentTemplate(e.target.value, 'displayed_name'); setDisableSave(false) }}
                                                                    inputProps={{ maxLength: 35 }}
                                                                />
                                                                <FormControlLabel disabled control={<Checkbox defaultChecked />} label="Added" />
                                                            </Stack>
                                                            <FormControl fullWidth sx={{ mt: 1 }} variant="standard">
                                                                <TextField
                                                                    label="Parent Instruction"
                                                                    multiline
                                                                    minRows={6}
                                                                    maxRows={8}
                                                                    InputLabelProps={{ shrink: true }}
                                                                    onChange={(e) => { updateParentTemplate(e.target.value, 'instruct'); setDisableSave(false) }}
                                                                    defaultValue={t['instruct']}
                                                                    inputProps={{ maxLength: 2500 }}
                                                                />

                                                            </FormControl>
                                                        </Box>
                                                    </Paper>
                                                </Box>
                                            )
                                        }
                                    })}
                                    <DragDropContext onDragEnd={handleOnDragEnd}>
                                        <Droppable droppableId="childrens">
                                            {(provided) => (
                                                <Box className="childrens"  {...provided.droppableProps} ref={provided.innerRef}>
                                                    {children_instruction_list && children_instruction_list.map((child, index) => {
                                                        return (
                                                            <Draggable key={child.id !== null ? child.id : child.unique} draggableId={`${child.id !== null ? child.id : child.unique}`} index={index}>
                                                                {(provided) => (
                                                                    <Box mt={1} mb={1} display='flex' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                        <Box mr={2} >
                                                                            <Divider orientation="vertical" />
                                                                        </Box>
                                                                        <Paper elevation={2} style={{ width: '100%' }}>
                                                                            <Stack direction="row" p={2} spacing={2} style={{ width: '100%' }}>
                                                                                <Box>
                                                                                    <IconButton aria-label="delete" >
                                                                                        <DragHandleIcon />
                                                                                    </IconButton>
                                                                                </Box>
                                                                                <Box mt={1} mb={1} style={{ width: '100%' }}>
                                                                                    <Stack direction='row' sx={{ display: "flex", justifyContent: "space-between" }}  >
                                                                                        <TextField
                                                                                            label={`Children No.${index} Name`}
                                                                                            inputProps={{ maxLength: 35 }}
                                                                                            maxRows={1}
                                                                                            defaultValue={child.displayed_name}
                                                                                            size="small"
                                                                                            InputLabelProps={{ shrink: true }}
                                                                                            onChange={(e) => { handleTextFieldChange(index, "displayed_name", e.target.value); setDisableSave(false) }}
                                                                                        />
                                                                                        <Box>
                                                                                            <FormControlLabel control={<Checkbox onChange={(e) => { handleTextFieldChange(index, 'add', e.target.checked) }} />} label="Add" />
                                                                                            <IconButton aria-label="delete" onClick={() => { addChild("delete", index) }}>
                                                                                                <DeleteIcon />
                                                                                            </IconButton>
                                                                                        </Box>
                                                                                    </Stack>
                                                                                    <FormControl fullWidth sx={{ mt: 1 }} variant="standard">
                                                                                        <TextField
                                                                                            label={`Child No.${index} Instruction`}
                                                                                            multiline
                                                                                            minRows={6}
                                                                                            inputProps={{ maxLength: 2500 }}
                                                                                            InputLabelProps={{ shrink: true }}
                                                                                            fullWidth
                                                                                            maxRows={8}
                                                                                            defaultValue={child.instruct}
                                                                                            onChange={(e) => { handleTextFieldChange(index, "instruct", e.target.value); setDisableSave(false) }}
                                                                                        />
                                                                                    </FormControl>
                                                                                </Box>
                                                                            </Stack>
                                                                        </Paper>
                                                                    </Box>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    })}
                                                    {provided.placeholder}
                                                </Box>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                    <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center">
                                        <Box mr={1}>
                                            <LoadingButton size="small" loading={loading} disabled={disable_save} loadingPosition="end" variant="contained" onClick={submitTemplate} endIcon={<SaveIcon />}>Save</LoadingButton>
                                        </Box>
                                        {add_child_error && <Alert severity="warning">Reaching the maximum number of child ({max_child_num}).</Alert>}
                                        {!add_child_error && <IconButton aria-label="add" onClick={() => { addChild("add", null) }}>
                                            <AddCircleOutlineIcon />
                                        </IconButton>
                                        }
                                        <Snackbar
                                            open={savesuccess}
                                            autoHideDuration={3000}
                                            onClose={() => { setSaveSuccess(false) }}
                                            message="Saved !"
                                        />
                                        <Snackbar
                                            open={saveerror}
                                            autoHideDuration={6000}
                                            onClose={() => { setSaveError(false) }}
                                            message={saveerrormessage}
                                        />
                                        <Snackbar
                                            open={deletesuccess}
                                            autoHideDuration={3000}
                                            onClose={() => { setDeleteSuccess(false) }}
                                            message="Deleted !"
                                        />
                                        <Snackbar
                                            open={deleteerror}
                                            autoHideDuration={6000}
                                            onClose={() => { setDeleteError(false) }}
                                            message={deleteerrormessage}
                                        />
                                    </Box>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item xs={4}>
                            <Typography mt={1} mb={1} variant='body1'>
                                Testbed
                            </Typography>
                            <ChatBox
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
                            >
                            </ChatBox>
                        </Grid>
                    </Grid>
                </Box>
            </Container >
            <Footer />
        </Container >
    );
}

export default UserInstruction;
