import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { FormControl, FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import { OpenAPIParameter } from '../component/chat_components/OpenaiParameters.js';
import { ChatBox } from '../component/chat_components/Chatbox.js';
import { chatsocket } from '../component/websocket/ChatSocket.js';
import { ChatExport } from '../component/import_export/chatExport.js';
import Footer from '../component/nav/Footer.js';
import Typography from '@mui/material/Typography';
import { redirect_anon_to_login } from '../component/checkLogin.js';
import { useNavigate } from "react-router-dom";
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

function FunctionLLM() {
    const ref = useRef();

    const { websocket, agent_websocket, chat_websocket } = useContext(WebSocketContext);
    const [shownthinking, setThinking] = useState(false);
    const messagesEndRef = useRef(null)
    const [chat_message, setChatMessage] = useState([]);
    const [agent_objects, setAgents] = useState([]);
    const [choosen_model, setChoosenModel] = useState("gpt-4");
    const [top_p, setTopp] = useState(0.72);
    const [max_tokens, setMaxToken] = useState(null);
    const [temperature, setTemperature] = useState(0.73);
    const [presencepenalty, setPresencePenalty] = useState(0);
    const [frequencypenalty, setFrequencyPenalty] = useState(0);
    const [usermessage, setUserMessage] = useState("");
    const [usermessageError, setUserMessageError] = useState(false);
    const [extrainstruction, setExtraInstruction] = useState("sadness, joy, love, anger, fear, surprise, neutral");
    const [llmfunction, setLLMFunction] = useState("emotion");
    const [choosen_export_format_chatlog, setChoosenExportFormatChatLog] = useState(".json");
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const navigate = useNavigate();
    const { is_authenticated, setIsAuthenticated } = useContext(UserContext);

    useEffect(() => {
        redirect_anon_to_login(navigate, is_authenticated)
        axios.all([
            axios.get('/frontend-api/model'),
        ])
            .then(axios.spread((model_object) => {
                setAgents(model_object.data.models_agent);
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
        websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + '/ws/' + url[url.length - 2] + '/' + url[url.length - 1] + '/' + timeZone + '/');
        chatsocket(websocket, setChatMessage, setThinking, document)
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
            var data = {
                'message': usermessage,
                'tool': llmfunction,
                'choosen_models': choosen_model,
                'role': 'Human',
                'top_p': top_p,
                'max_tokens': max_tokens,
                'frequency_penalty': frequencypenalty,
                'presence_penalty': presencepenalty,
                'temperature': temperature,
                'emotion_list': typeof extrainstruction === 'string' ? extrainstruction : null,
                'topic_list': typeof extrainstruction === 'string' ? extrainstruction : null,
                'style_list': typeof extrainstruction === 'string' ? extrainstruction : null,
                'number_of_word': typeof extrainstruction === 'number' ? extrainstruction : null
            }
            websocket.current.send(JSON.stringify(data))
            setUserMessage("")
        }
    }
    const swap_extra_instruction = (e) => {
        if (e == 'restyle') {
            setExtraInstruction("sad, serious")
        }
        else if (e == 'emotion') {
            setExtraInstruction("sadness, joy, love, anger, fear, surprise, neutral")
        }
        else if (e == 'summary') {
            setExtraInstruction(100)
        }
        else if (e == 'topic' || 'paraphrase' || 'sentiment') {
            setExtraInstruction("")
        }
    }
    return (
        <Container maxWidth={false} sx={{ minWidth: 1200 }} disableGutters>
            <title>Tools</title>
            <ResponsiveAppBar max_width="xl" />
            <Container maxWidth="xl" sx={{ minWidth: 1200 }}>
                <Box m={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Paper sx={{ ml: 2, mr: 2 }} variant='outlined'>
                                <Box m={1}>
                                    <Typography sx={{ color: 'text.secondary' }}>Toolbox</Typography>
                                </Box>
                                <Divider />
                                <Box m={2}>
                                    <FormControl>
                                        <RadioGroup
                                            defaultValue="emotion"
                                            name="radio-buttons-group"
                                            onChange={e => { setLLMFunction(e.target.value); swap_extra_instruction(e.target.value) }}
                                            value={llmfunction}
                                        >
                                            {[{ 'label': 'Summary', 'value': 'summary' },
                                            { 'label': 'Paraphrase', 'value': 'paraphrase' },
                                            { 'label': 'Predict Emotion', 'value': 'emotion' },
                                            { 'label': 'Predict Sentiment', 'value': 'sentiment' },
                                            { 'label': 'Topic Classification', 'value': 'topic' },
                                            { 'label': 'Restyle', 'value': 'restyle' }].map((func) => {
                                                if (func.value == 'paraphrase' || 'setiment') {
                                                    return (
                                                        <FormControlLabel key={func.label} value={func.value} control={<Radio />} label={func.label} />
                                                    )
                                                }
                                                else if (func.value == 'summary') {
                                                    return (
                                                        <FormControlLabel key={func.label} value={func.value} control={<Radio />} label={func.label} />
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <FormControlLabel value={func.value} control={<Radio />} label={func.label} />
                                                    )
                                                }
                                            }
                                            )
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Paper>
                            <Paper sx={{ m: 2 }} variant='outlined'>
                                <Box m={1}>
                                    <Typography sx={{ color: 'text.secondary' }}>Extra Instruction</Typography>
                                </Box>
                                <Divider />
                                <Box m={2}>
                                    <ChatInput
                                        multiline
                                        maxRows={6}
                                        value={extrainstruction}
                                        sx={{ p: '2px 4px', display: 'flex', minWidth: 200 }}
                                        onChange={e => setExtraInstruction(e.target.value)}
                                        minRows={4}

                                    />
                                </Box>
                            </Paper>
                            <Paper sx={{ m: 2 }} variant='outlined'>
                                <Box m={1}>
                                    <Typography sx={{ color: 'text.secondary' }}>Chat Log Export</Typography>
                                </Box>
                                <Divider />
                                <Box mb={2} mt={2} ml={1} mr={2}>
                                    <ChatExport
                                        chat_message={chat_message}
                                        choosen_export_format_chatlog={choosen_export_format_chatlog}
                                        setChoosenExportFormatChatLog={setChoosenExportFormatChatLog}
                                        number_of_remove_message={2}
                                        setChatMessage={setChatMessage}
                                    >
                                    </ChatExport>
                                </Box>
                            </Paper>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item xs={6}>
                            <Box mr={2}>
                                <ChatBox
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
                                    handleEnter={handleEnter}
                                >
                                </ChatBox>
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item xs={2}>
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
                            >

                            </OpenAPIParameter>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Container >
    );
}
export default FunctionLLM;
