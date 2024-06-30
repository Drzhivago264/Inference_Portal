import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import { ChatBoxHotpot } from '../component/chat_components/Chatbox.js';
import { HotpotParameter } from '../component/chat_components/HotpotParameters.js';
import { chatsocket } from '../component/websocket/ChatSocket.js';
import { agentsocket } from '../component/websocket/AgentSocket.js';
import Footer from '../component/nav/Footer.js';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import { redirect_anon_to_login } from '../component/checkLogin.js';
import { UserContext, WebSocketContext } from '../App.js'
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
    const { websocket, agent_websocket, chat_websocket } = useContext(WebSocketContext);
    const messagesEndRef = useRef(null)
    const [shownthinkingagent, setThinkingAgent] = useState(false);
    const [shownthinkingchat, setThinkingChat] = useState(false);
    const [choosen_template, setChoosenTemplate] = useState("Assignment Agent");
    const [model_objects, setModels] = useState([]);
    const [chat_message, setChatMessage] = useState([]);
    const [agent_message, setAgentMessage] = useState([]);
    const [agent_objects, setAgents] = useState([]);
    const [choosen_agent_model, setChoosenAgentModel] = useState("gpt-4");
    const [choosen_chat_model, setChoosenChatModel] = useState("gpt-4");
    const [top_p, setTopp] = useState(0.72);
    const [top_k, setTopk] = useState(-1);
    const [mode, setMode] = useState("chat");
    const [max_tokens, setMaxToken] = useState(null);
    const [usememory, setUseMemory] = useState(false);
    const [usememorycurrent, setUseMemoryCurrent] = useState(true)
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
    const [max_turn, setMaxTurn] = useState(4)
    const [currentparagraph, setCurrentParagraph] = useState(1);
    const [template_list, setTemplateList] = useState([]);
    const [default_child_template_list, setDefaultChildTemplateList] = useState([]);
    const [default_parent_instruct, setParentInstruct] = useState("");
    const [default_child_instruct, setChildInstruct] = useState("");
    const [duplicatemessage, setDuplicateMessage] = useState(true);
    const [instruct_change, setInstructChange] = useState(false)
    const [socket_destination, setSocketDestination] = useState("async");
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const navigate = useNavigate();
    const { is_authenticated, setIsAuthenticated } = useContext(UserContext);
    useEffect(() => {
        redirect_anon_to_login(navigate, is_authenticated)
        axios.all([
            axios.get('/frontend-api/model'),
            axios.get('/frontend-api/instruction-tree'),
        ])
            .then(axios.spread((model_object, instruction_object) => {
                setModels(model_object.data.models_bot);
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
        if (websocket.current) {
            websocket.current.close()
        }
        if (agent_websocket.current) {
            agent_websocket.current.close()
        }
        if (chat_websocket.current){
            chat_websocket.current.close()
        }
     
        if (socket_destination == 'async') {
            Promise.all([
                agent_websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + '/ws/engineer-async/' + url[url.length - 1] + '/' + timeZone + '/'),
                chat_websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + '/ws/chat-async/' + url[url.length - 1] + '/' + timeZone + '/')
            ])
        }
        else {
            Promise.all([
                agent_websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + '/ws/engineer/' + url[url.length - 1] + '/' + timeZone + '/'),
                chat_websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + '/ws/chat/' + url[url.length - 1] + '/' + timeZone + '/')
            ])
        }
        Promise.all([
            chatsocket(
                chat_websocket,
                setChatMessage,
                setThinkingChat,
                document),
            agentsocket(
                agent_websocket,
                setAgentMessage,
                setThinkingAgent,
                document,
                setParentInstruct,
                setChildInstruct,
                setDefaultChildTemplateList,)
        ])

    }, [socket_destination]);
    const handleEnter = (e) => {
        if (e.key == "Enter" && !e.shiftKey) {
            e.preventDefault()
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
                'max_turn': max_turn,
                'instruct_change': instruct_change,
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
            setInstructChange(false)
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
                'include_memory': usememory,
                'include_current_memory': usememorycurrent
            }
            chat_websocket.current.send(JSON.stringify(data))
            setUserChatMessage("")
        }
    }
    const swap_template = (template) => {
        agent_websocket.current.send(JSON.stringify({
            'swap_template': template,
            'template_type': 'system'
        }));
    }
    const swap_child_instruction = (child) => {
        agent_websocket.current.send(JSON.stringify({
            'swap_child_instruct': child,
            'template_type': 'system'
        }));
    }
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <Container maxWidth={false} sx={{ minWidth: 1500 }} disableGutters>
            <title>Hotpot</title>
            <ResponsiveAppBar max_width={false} />
            <Container maxWidth={false} sx={{ minWidth: 1500 }}>
                <Box m={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Paper variant='outlined'>
                                <Box m={1}>
                                    <Typography sx={{ color: 'text.secondary' }}>Template Structure</Typography>
                                </Box>
                                <Divider />
                                <List dense={true}>
                                    {default_child_template_list.map((instruct, index) => {
                                        return (
                                            <ListItem key={instruct.name} disablePadding>
                                                <ListItemButton
                                                    selected={selectedIndex === index}
                                                    onClick={(event) => { swap_child_instruction(instruct.name), handleListItemClick(event, index) }} >
                                                    <ListItemText primary={instruct.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Paper>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="child-content"
                                    id="child-header"
                                >
                                    <Typography sx={{ color: 'text.secondary' }}>Parent Instruction</Typography>
                                </AccordionSummary>
                                <AccordionDetails >
                                    <Paper variant="outlined">
                                        <ChatInput
                                            id="parent-instruct"
                                            multiline
                                            maxRows={8}
                                            value={default_parent_instruct}
                                            onChange={e => { setParentInstruct(e.target.value), setInstructChange(true) }}
                                            minRows={6}
                                            variant="standard"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">   </InputAdornment>,

                                            }}
                                        />
                                    </Paper>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="child-content"
                                    id="child-header"
                                >
                                    <Typography sx={{ color: 'text.secondary' }}>Child Instruction</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Paper variant="outlined">

                                        <ChatInput
                                            id="child-instruct"
                                            multiline
                                            maxRows={8}
                                            value={default_child_instruct}
                                            onChange={e => { setChildInstruct(e.target.value), setInstructChange(true) }}
                                            minRows={6}
                                            variant="standard"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">   </InputAdornment>,
                                            }}
                                        />

                                    </Paper>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                                swap_template={swap_template}
                            ></HotpotParameter>

                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Container>
    );
}
export default Hotpot;
