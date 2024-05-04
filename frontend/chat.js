import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import KeyIcon from '@mui/icons-material/Key';
import LinearProgress from '@mui/material/LinearProgress';
import ResponsiveAppBar from './component/navbar';
import SendIcon from '@mui/icons-material/Send';
import { ChatParameter } from './component/chatroom_parameters';
import { ChatBox } from './component/chatbox';
const ChatPaper = styled(Paper)(({ theme }) => ({
    minWidth: 660,
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
    const [choosen_model, setChoosenModel] = useState("Mistral Chat 13B");
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
    const [usermessage, setUserMessage] = useState("");
    const [usermessageError, setUserMessageError] = useState(false);
    const [key, setKey] = useState("");
    const [keyError, setKeyError] = useState(false);

    const { state } = useLocation();
    useEffect(() => {
        if (state) {
            setKey(state.credential)
        }
    }, []);
    useEffect(() => {
        axios.all([
            axios.get('/frontend-api/model'),
        ])
            .then(axios.spread((model_object) => {
                setModels(model_object.data.models);
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
        websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + '/ws/chat/' + url[url.length - 1] + '/');
        websocket.current.onopen = () => {
            console.log("WebSocket  Connected");
        };
        websocket.current.onclose = () => {
            console.log("WebSocket  Disconnected");
        };
        websocket.current.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer) {
                if (dataFromServer.role == "Human" || dataFromServer.role == "Server" || dataFromServer.holder) {

                    if (dataFromServer.holder) {
                        setThinking(true)
                        dataFromServer.message = ""
                    }
                    setChatMessage(chat_message => [
                        ...chat_message,
                        {
                            holder: dataFromServer.holder,
                            holderid: dataFromServer.holderid,
                            role: dataFromServer.role,
                            time: dataFromServer.time,
                            credit: dataFromServer.credit,
                            message: dataFromServer.message
                        },
                    ])
                }
                else {
                    setThinking(false)
                    setChatMessage(chat_message => [
                        ...chat_message.slice(0, -1),
                        {
                            holder: chat_message[chat_message.length - 1].holder,
                            holderid: chat_message[chat_message.length - 1].holderid,
                            role: chat_message[chat_message.length - 1].role,
                            time: chat_message[chat_message.length - 1].time,
                            credit: chat_message[chat_message.length - 1].credit,
                            message: chat_message[chat_message.length - 1].message += dataFromServer.message
                        }
                    ])

                };
                var logTa = document.getElementById("chat-log")
                logTa.scrollTop = logTa.scrollHeight;
            }
        }
    }, []);
    const handleEnter = (e) => {
        if (e.key == "Enter" && !e.shiftKey) {
            submitChat()
        }
    }
    const submitChat = () => {

        if (key == '') {
            setKeyError(true)
        }
        if (usermessage == '') {
            setUserMessageError(true)
        }
        else {
            var data = {
                'mode': mode,
                'message': usermessage,
                'key': key,
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
    return (
        <Container maxWidth={false} disableGutters>
            <title>Chat</title>
            <ResponsiveAppBar />
            <Container maxWidth="lg" sx={{ width: 1200 }}>
                <Box m={2}>
                    <Grid container spacing={2}>

                        <ChatBox
                            inputsize={660}
                            size={8}
                            chat_message={chat_message}
                            usermessage={usermessage}
                            usermessageError={usermessageError}
                            key={key}
                            setKey={setKey}
                            keyError={keyError}
                            ChatPaper={ChatPaper}
                            ChatInput={ChatInput}
                            setUserMessage={setUserMessage}
                            state={state}
                            submitChat={submitChat}
                            messagesEndRef={messagesEndRef}
                            shownthinking={shownthinking}
                            handleEnter={handleEnter}
                        >

                        </ChatBox>

                        <Grid item md={4}>
                            <ChatParameter
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
        </Container>
    );
}

export default Chat;
