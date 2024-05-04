import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { FormControl, FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import KeyIcon from '@mui/icons-material/Key';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ResponsiveAppBar from './component/navbar';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from "react-router-dom";

import {HotpotParameter} from './component/chatroom_parameters'
const ChatPaper = styled(Paper)(({ theme }) => ({
    minWidth: 300,
    height: 700,
    overflow: 'auto',
    padding: theme.spacing(2),
    ...theme.typography.body2,
}));
const ChatInput = styled(TextField)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
}));

function Hotpot() {
    const ref = useRef();
    const agent_websocket = useRef(null)
    const chat_websocket = useRef(null)
    const messagesEndRef = useRef(null)
    const [shownthinkingagent, setThinkingAgent] = useState(false);
    const [shownthinkingchat, setThinkingChat] = useState(false);
    const [choosen_template, setChoosenTemplate] = useState("Assignment Agent");
    const [model_objects, setModels] = useState([]);
    const [chat_message, setChatMessage] = useState([]);
    const [agent_message, setAgentMessage] = useState([]);
    const [agent_objects, setAgents] = useState([]);
    const [choosen_agent_model, setChoosenAgentModel] = useState("gpt-4");
    const [choosen_chat_model, setChoosenChatModel] = useState("Mistral Chat 13B");
    const [top_p, setTopp] = useState(0.72);
    const [top_k, setTopk] = useState(-1);
    const [mode, setMode] = useState("chat");
    const [max_tokens, setMaxToken] = useState(512);
    const [usememory, setUseMemory] = useState(true);
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
    const [key, setKey] = useState("");
    const [keyError, setKeyError] = useState(false);
    const [currentparagraph, setCurrentParagraph] = useState(1);
    const [template_list, setTemplateList] = useState([]);
    const [default_child_template_list, setDefaultChildTemplateList] = useState([]);
    const [default_parent_instruct, setParentInstruct] = useState("");
    const [default_child_instruct, setChildInstruct] = useState("");
    const [duplicatemessage, setDuplicateMessage] = useState(true);

    const { state } = useLocation();
    useEffect(() => {
        if (state) {
            setKey(state.credential)
        }
    }, []);

    useEffect(() => {
        axios.all([
            axios.get('/frontend-api/model'),
            axios.get('/frontend-api/instruction-tree'),
        ])
            .then(axios.spread((model_object, instruction_object) => {
                setModels(model_object.data.models);
                setAgents(model_object.data.models_agent);
                setTemplateList(instruction_object.data.root_nodes)
                setChildInstruct(instruction_object.data.default_children[0].instruct)
                setDefaultChildTemplateList(instruction_object.data.default_children)
                for (var node in instruction_object.data.root_nodes) {
                    if (instruction_object.data.root_nodes[node].name == choosen_template) {
                        setParentInstruct(instruction_object.data.root_nodes[node].instruct)
                    }
                }
            }))
            .catch(error => {
                console.log(error);
            });
    }, []);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'nearest' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chat_message]);

    useEffect(() => {
        scrollToBottom()
    }, [agent_message]);

    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var url = window.location.pathname.split("/").filter(path => path !== "")
    useEffect(() => {
        agent_websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + '/ws/engineer/' + url[url.length - 1] + '/');
        chat_websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + '/ws/chat/' + url[url.length - 1] + '/');
        chat_websocket.current.onopen = () => {
            console.log("WebSocket  Connected");
        };
        chat_websocket.current.onclose = () => {
            console.log("WebSocket  Disconnected");
        };
        chat_websocket.current.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer) {
                if (dataFromServer.role == "Human" || dataFromServer.role == "Server" || dataFromServer.holder) {
                    setChatMessage(chat_message => [
                        ...chat_message,
                        dataFromServer,
                    ])
                    if (dataFromServer.holder) {
                        setThinkingChat(true)
                    }
                }
                else {
                    setThinkingChat(false)
                    document.getElementById(dataFromServer.stream_id).innerHTML += dataFromServer.message
                };
                var logTa = document.getElementById("chat-log")
                logTa.scrollTop = logTa.scrollHeight;
            }
        }
        agent_websocket.current.onopen = () => {
            console.log("Agent Socket  Connected");
        };
        agent_websocket.current.onclose = () => {
            console.log("Agent Socket  Disconnected");
        };
        agent_websocket.current.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer) {
                if ((dataFromServer.hasOwnProperty("swap_template"))) {
                    setParentInstruct(dataFromServer.swap_instruction)
                    setChildInstruct(dataFromServer.default_child_instruct)
                    let new_child_template_list = []
                    for (var new_child in dataFromServer.child_template_name_list) {
                        new_child_template_list.push({ 'name': dataFromServer.child_template_name_list[new_child] })
                    }
                    setDefaultChildTemplateList(new_child_template_list)
                }
                else if ((dataFromServer.hasOwnProperty("child_instruct"))) {
                    setChildInstruct(dataFromServer.child_instruct)
                }
                else if (dataFromServer.hasOwnProperty("paragraph")) {
                    setCurrentParagraph(dataFromServer.paragraph)
                }
                else if (dataFromServer.role == "Human" || dataFromServer.role == "Server" || dataFromServer.holder) {
                    console.log(dataFromServer)
                    setAgentMessage(agent_message => [
                        ...agent_message,
                        dataFromServer,
                    ])
                    if (dataFromServer.holder) {
                        setThinkingAgent(true)
                    }
                }
                else if (dataFromServer.hasOwnProperty("agent_action")) {
                    return
                }
                else {
                    setThinkingAgent(false)
                    document.getElementById(dataFromServer.stream_id).innerHTML += dataFromServer.message
                };
                var logTa = document.getElementById("chat-log-agent")
                logTa.scrollTop = logTa.scrollHeight;
            }
        }
    }, []);
    const handleEnter = (e) => {
        if (e.key == "Enter" && !e.shiftKey) {
            if (duplicatemessage) {
                submitChat()
                submitAgent()
            }
            else if (!duplicatemessage && e.target.id == 'chat-input') {
                submitChat()
            }
            else if (!duplicatemessage && e.target.id == 'agent-input') {
                submitAgent()
            }
        }
    }
    const check_duplicate_message = (e) => {
        if (duplicatemessage) {
            setUserAgentMessage(e)
            setUserChatMessage(e)
        }
    }
    const submitAgent = () => {

        if (key == '') {
            setKeyError(true)
        }
        if (useragentmessage == '') {
            setUserAgentMessageError(true)
        }
        else {
            var data = {
                'currentParagraph': currentparagraph,
                'message': useragentmessage,
                'key': key,
                'choosen_models': choosen_agent_model,
                'choosen_template': choosen_template,
                'role': 'Human',
                'top_p': top_p,
                'max_tokens': max_tokens,
                'frequency_penalty': frequencypenalty,
                'presence_penalty': presencepenalty,
                'temperature': temperature,
                'agent_instruction': default_parent_instruct,
                'child_instruction': default_child_instruct
            }
            agent_websocket.current.send(JSON.stringify(data))
            setUserAgentMessage("")
        }
    }
    const submitChat = () => {
        if (key == '') {
            setKeyError(true)
        }
        if (userchatmessage == '') {
            setUserChatMessageError(true)
        }
        else {
            var data = {
                'mode': mode,
                'message': userchatmessage,
                'key': key,
                'choosen_models': choosen_chat_model,
                'role': 'Human',
                'top_k': top_k,
                'top_p': top_p,
                'best_of': bestof,
                'max_tokens': max_tokens,
                'frequency_penalty': frequencypenalty,
                'presence_penalty': presencepenalty,
                'temperature': temperature,
                'beam': beam,
                'early_stopping': earlystopping,
                'length_penalty': lengthpenalty,
                'include_memory': usememory
            }
            chat_websocket.current.send(JSON.stringify(data))
            setUserChatMessage("")
        }
    }
    const swap_template = (template) => {
        agent_websocket.current.send(JSON.stringify({
            'swap_template': template,
        }));
    }
    const swap_child_instruction = (child) => {
        agent_websocket.current.send(JSON.stringify({
            'swap_child_instruct': child,
        }));
    }
    return (
        <Container maxWidth={false} sx={{ minWidth: 1500 }} disableGutters>
            <title>Agent</title>
            <ResponsiveAppBar />
            <Container maxWidth={false} sx={{ minWidth: 1500 }}>
                <Box m={1}>
                    <Grid container spacing={2}>
                        <Grid item md={2}>
                            {!state && <TextField
                                margin="normal"
                                label="Key"
                                type="password"
                                size="small"
                                onChange={e => setKey(e.target.value)}
                                value={key}
                                error={keyError}
                                autoComplete="off"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <KeyIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />}
                            <Divider />
                            <List subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Template Structure
                                </ListSubheader>
                            }>
                                {default_child_template_list.map((instruct) => {
                                    return (
                                        <ListItem disablePadding>
                                            <ListItemButton  >
                                                <ListItemText onClick={() => swap_child_instruction(instruct.name)} primary={instruct.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })}
                            </List>
                            < Divider />
                            <Stack mt={1} spacing={1}>
                                <Typography variant="h6" gutterBottom>Parent Instruction</Typography>
                                <Paper>
                                    <ChatInput
                                        id="parent-instruct"
                                        multiline
                                        maxRows={8}
                                        value={default_parent_instruct}
                                        onChange={e => setParentInstruct(e.target.value)}
                                        minRows={6}
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">   </InputAdornment>,
                                        }}
                                    />
                                </Paper>
                                <Divider />
                                <Typography variant="h6" gutterBottom>Child Instruction</Typography>
                                <Paper>
                                    <ChatInput
                                        id="child-instruct"
                                        multiline
                                        maxRows={8}
                                        value={default_child_instruct}
                                        onChange={e => setChildInstruct(e.target.value)}
                                        minRows={6}
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">   </InputAdornment>,
                                        }}
                                    />
                                </Paper>
                            </Stack>
                        </Grid>
                        <Grid item md={4}>
                            <ChatPaper id={'chat-log'} variant="outlined">
                                <Stack spacing={1}>
                                    {chat_message.map((mess) => {
                                        if (mess.role == 'Human') {
                                            return (
                                                <Paper  ><Box p={1} sx={{ borderRight: 5, borderColor: 'primary.main', borderRadius: 1 }} className="message_log_container" style={{ whiteSpace: 'pre-line', textAlign: 'right' }}>  <span> ({mess.role} - {mess.time}) {mess.message} </span></Box></Paper>
                                            )
                                        }
                                        else if (mess.holder) {
                                            return (
                                                <Paper ><Box p={1} sx={{ borderLeft: 5, borderRadius: 1 }} className="message_log_container" style={{ whiteSpace: 'pre-line' }} id={mess.holderid} >  <span> {mess.role} - {mess.time}: </span></Box></Paper>
                                            )
                                        }
                                        else if (mess.role == 'Server') {
                                            return (
                                                <Paper  ><Box p={1} sx={{ borderLeft: 5, borderRadius: 1 }} className="message_log_container" style={{ whiteSpace: 'pre-line' }}>  <span> {mess.message} ({mess.role} - {mess.time}) </span></Box></Paper>
                                            )
                                        }
                                    })}
                                </Stack>
                                <div ref={messagesEndRef}> </div>
                            </ChatPaper>
                            {shownthinkingchat && <LinearProgress />}
                            <Box mt={2}>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', }}
                                >
                                    <ChatInput
                                        id="chat-input"
                                        multiline
                                        maxRows={6}
                                        value={userchatmessage}
                                        error={userchatmessageError}
                                        onChange={e => { setUserChatMessage(e.target.value); check_duplicate_message(e.target.value) }}
                                        onKeyUp={e => handleEnter(e)}
                                        minRows={4}
                                        variant="standard"
                                        InputProps={{
                                            endAdornment: <InputAdornment sx={{ position: 'absolute', bottom: 30, right: 10 }} position="end">
                                                <  Button sx={{ height: 32, }} variant="contained" size="small" onClick={submitChat} endIcon={<SendIcon />}>Send</Button></InputAdornment>,
                                            startAdornment: <InputAdornment position="start">   </InputAdornment>,
                                        }}
                                    />
                                </Paper>
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <ChatPaper id={'chat-log-agent'} variant="outlined">
                                <Stack spacing={1}>
                                    {agent_message.map((mess) => {

                                        if (mess.role == 'Human') {
                                            return (
                                                <Paper  >
                                                    <Box p={1} sx={{ borderRight: 5, borderColor: 'primary.main', borderRadius: 1, }} className="message_log_container" style={{ whiteSpace: 'pre-line', textAlign: 'right' }}>  <span> ({mess.role} - {mess.time}) {mess.message} </span></Box></Paper>
                                            )
                                        }
                                        else if (mess.holder) {
                                            return (
                                                <Paper ><Box p={1} sx={{ borderLeft: 5, borderRadius: 1 }} className="message_log_container" style={{ whiteSpace: 'pre-line' }} id={mess.holderid} >  <span> {mess.role} - {mess.time}: </span></Box></Paper>
                                            )
                                        }
                                        else if (mess.role == 'Server') {
                                            return (
                                                <Paper  ><Box p={1} sx={{ borderLeft: 5, borderRadius: 1 }} className="message_log_container" style={{ whiteSpace: 'pre-line' }}>  <span> {mess.message} ({mess.role} - {mess.time}) </span></Box></Paper>
                                            )
                                        }
                                    })}
                                </Stack>
                                <div ref={messagesEndRef}> </div>
                            </ChatPaper>
                            {shownthinkingagent && <LinearProgress />}
                            <Box mt={2}>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', minWidth: 300 }}
                                >
                                    <ChatInput
                                        id="agent-input"
                                        multiline
                                        maxRows={6}
                                        value={useragentmessage}
                                        error={useragentmessageError}
                                        onChange={e => { setUserAgentMessage(e.target.value); check_duplicate_message(e.target.value) }}
                                        onKeyUp={e => handleEnter(e)}
                                        minRows={4}
                                        variant="standard"
                                        InputProps={{
                                            endAdornment: <InputAdornment sx={{ position: 'absolute', bottom: 30, right: 10 }} position="end">
                                                <  Button sx={{ height: 32, }} variant="contained" size="small" onClick={submitAgent} endIcon={<SendIcon />}>Send</Button></InputAdornment>,
                                            startAdornment: <InputAdornment position="start">   </InputAdornment>,
                                        }}
                                    />
                                </Paper>
                            </Box>

                        </Grid>
                        <Grid item md={2}>
                          

                            <HotpotParameter
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
                                earlystopping={earlystopping}
                                setEarlyStopping={setEarlyStopping}
                                setChoosenAgentModel={setChoosenAgentModel}
                                setChoosenChatModel={setChoosenChatModel}
                            ></HotpotParameter>

                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Container>
    );
}
export default Hotpot;
