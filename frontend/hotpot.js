import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import KeyIcon from '@mui/icons-material/Key';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ResponsiveAppBar from './component/navbar';
import { useLocation } from "react-router-dom";
import { ChatBoxHotpot } from './component/chatbox';
import { HotpotParameter } from './component/chatroom_parameters'
import { chatsocket, agentsocket } from './component/chatsocket';

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

    const [currentparagraph, setCurrentParagraph] = useState(1);
    const [template_list, setTemplateList] = useState([]);
    const [default_child_template_list, setDefaultChildTemplateList] = useState([]);
    const [default_parent_instruct, setParentInstruct] = useState("");
    const [default_child_instruct, setChildInstruct] = useState("");
    const [duplicatemessage, setDuplicateMessage] = useState(true);



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

        chatsocket(
            chat_websocket,
            setChatMessage,
            setThinkingChat,
            document)
        agentsocket(
            agent_websocket,
            setAgentMessage,
            setThinkingAgent,
            document,
            setParentInstruct,
            setChildInstruct,
            setDefaultChildTemplateList,
            null,
            null,
            null)
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
        if (useragentmessage == '') {
            setUserAgentMessageError(true)
        }
        else {
            var data = {
                'currentParagraph': currentparagraph,
                'message': useragentmessage,
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
        if (userchatmessage == '') {
            setUserChatMessageError(true)
        }
        else {
            var data = {
                'mode': mode,
                'message': userchatmessage,
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
                            <ChatBoxHotpot
                                id={'chat-log'}
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
                                check_duplicate_message={check_duplicate_message}
                            >
                            </ChatBoxHotpot>
                        </Grid>
                        <Grid item md={4}>
                            <ChatBoxHotpot
                                id={'chat-log-agent'}
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
                                check_duplicate_message={check_duplicate_message}
                            >
                            </ChatBoxHotpot>

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
                                setDuplicateMessage={setDuplicateMessage}
                            ></HotpotParameter>

                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Container>
    );
}
export default Hotpot;
