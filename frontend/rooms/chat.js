import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ResponsiveAppBar from '../component/Navbar.js';
import { ChatParameter } from '../component/ChatroomParameters.js';
import { ChatBox } from '../component/Chatbox.js';
import { chatsocket } from '../component/websocket/ChatSocket.js';
import { ChatExport } from '../component/chatExport.js';
import Footer from '../component/Footer.js';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { MemoryTree } from '../component/MemoryTree';
import { redirect_anon_to_login } from '../component/checkLogin.js';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App.js'

const ChatPaper = styled(Paper)(({ theme }) => ({
    minWidth: 550,
    height: 700,
    overflow: 'auto',
    padding: theme.spacing(2),
    ...theme.typography.body2,
}));
const ChatInput = styled(TextField)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
}));

function Chat() {
    const websocket = useRef(null)
    const messagesEndRef = useRef(null)
    const [shownthinking, setThinking] = useState(false);
    const [model_objects, setModels] = useState([]);
    const [chat_message, setChatMessage] = useState([]);
    const [agent_objects, setAgents] = useState([]);
    const [choosen_model, setChoosenModel] = useState("Llama 3 Instruct AWQ");
    const [top_p, setTopp] = useState(0.72);
    const [top_k, setTopk] = useState(-1);
    const [mode, setMode] = useState("chat");
    const [max_tokens, setMaxToken] = useState(null);
    const [usememory, setUseMemory] = useState(true);
    const [temperature, setTemperature] = useState(0.73);
    const [beam, setBeam] = useState(false);
    const [earlystopping, setEarlyStopping] = useState(false);
    const [bestof, setBestof] = useState(2);
    const [presencepenalty, setPresencePenalty] = useState(0);
    const [frequencypenalty, setFrequencyPenalty] = useState(0);
    const [lengthpenalty, setLengthPenalty] = useState(0);
    const [usermessage, setUserMessage] = useState("");
    const [usermessageError, setUserMessageError] = useState(false);
    const [choosen_export_format_chatlog, setChoosenExportFormatChatLog] = useState(".json");
    const [socket_destination, setSocketDestination] = useState("/ws/chat-async/");
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const navigate = useNavigate();
    const { is_authenticated, setIsAuthenticated } = useContext(UserContext);

    useEffect(() => {
        redirect_anon_to_login(navigate, is_authenticated)
        axios.all([
            axios.get('/frontend-api/model'),
        ])
            .then(axios.spread((model_object, memory_object) => {
                setModels(model_object.data.models_bot);
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
        websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + socket_destination + url[url.length - 1] + '/' + timeZone + '/');
        chatsocket(websocket, setChatMessage, setThinking, document)
    }, [socket_destination]);

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
                'mode': mode,
                'message': usermessage,
                'choosen_models': choosen_model,
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
            websocket.current.send(JSON.stringify(data))
            setUserMessage("")
        }
    }
    const MemoMemoryTree = useMemo(() => <MemoryTree></MemoryTree>, [])

    return (
        <Container maxWidth={false} sx={{ minWidth: 1350 }} disableGutters>
            <title>Chat</title>
            <ResponsiveAppBar max_width={false} />
            <Container maxWidth="xl" sx={{ minWidth: 1350 }}>
                <Box m={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {MemoMemoryTree}
                            <Paper sx={{ mt: 2 }} variant='outlined'>
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
                        <Grid item xs={5.5}>
                            <ChatBox
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
                            >
                            </ChatBox>
                        </Grid>
                        <Grid item xs={2.5}>
                            <ChatParameter
                                socket_destination={socket_destination}
                                setSocketDestination={setSocketDestination}
                                model_objects={model_objects}
                                agent_objects={agent_objects}
                                choosen_model={choosen_model}
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
                                setChoosenModel={setChoosenModel}
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
                            ></ChatParameter>

                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Container >
    );
}

export default Chat;
