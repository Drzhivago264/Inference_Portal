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
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import KeyIcon from '@mui/icons-material/Key';
import LinearProgress from '@mui/material/LinearProgress';
import ResponsiveAppBar from './component/navbar';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from "react-router-dom";
import { OpenAPIParameter } from './component/chatroom_parameters'
import { ChatBox } from './component/chatbox';
import { chatsocket } from './component/chatsocket';

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
    const websocket = useRef(null)
    const [shownthinking, setThinking] = useState(false);
    const messagesEndRef = useRef(null)
    const [chat_message, setChatMessage] = useState([]);
    const [agent_objects, setAgents] = useState([]);
    const [choosen_model, setChoosenModel] = useState("gpt-4");
    const [choosen_template, setChoosenTemplate] = useState("Assignment Agent");
    const [top_p, setTopp] = useState(0.72);
    const [max_tokens, setMaxToken] = useState(null);
    const [temperature, setTemperature] = useState(0.73);
    const [presencepenalty, setPresencePenalty] = useState(0);
    const [frequencypenalty, setFrequencyPenalty] = useState(0);
    const [usermessage, setUserMessage] = useState("");
    const [usermessageError, setUserMessageError] = useState(false);
    const [key, setKey] = useState("");
    const [keyError, setKeyError] = useState(false);
    const [extrainstruction, setExtraInstruction] = useState("sadness, joy, love, anger, fear, surprise, neutral");
    const [llmfunction, setLLMFunction] = useState("emotion");
    const [streamtokens, setStream] = useState(null)
    const [lasteststreamid, setLastestSream] = useState(null)

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
        websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + '/ws/' + url[url.length - 2] + '/' + url[url.length - 1] + '/');
        chatsocket(websocket, setChatMessage, setThinking, document )
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
                'message': usermessage,
                'tool': llmfunction,
                'key': key,
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
        else if (e == 'topic' || 'paraphase' || 'sentiment') {
            setExtraInstruction("")
        }
    }
    return (
        <Container maxWidth={false} sx={{ minWidth: 1200 }} disableGutters>
            <title>Agent</title>
            <ResponsiveAppBar />
            <Container maxWidth="xl" sx={{ minWidth: 1200 }}>
                <Box m={1}>
                    <Grid container spacing={2}>
                        <Grid item md={3}>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Toolbox</FormLabel>
                                <RadioGroup
                                    defaultValue="emotion"
                                    name="radio-buttons-group"
                                    onChange={e => { setLLMFunction(e.target.value); swap_extra_instruction(e.target.value) }}
                                    value={llmfunction}
                                >
                                    {[{ 'label': 'Summary', 'value': 'summary' },
                                    { 'label': 'Paraphase', 'value': 'paraphase' },
                                    { 'label': 'Predict Emotion', 'value': 'emotion' },
                                    { 'label': 'Predict Sentiment', 'value': 'sentiment' },
                                    { 'label': 'Topic Classification', 'value': 'topic' },
                                    { 'label': 'Restyle', 'value': 'restyle' }].map((func) => {
                                        if (func.value == 'paraphase' || 'setiment') {
                                            return (
                                                <FormControlLabel value={func.value} control={<Radio />} label={func.label} />
                                            )
                                        }
                                        else if (func.value == 'summary') {
                                            return (
                                                <FormControlLabel value={func.value} control={<Radio />} label={func.label} />
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
                            <Divider ></Divider>
                            <Box mt={2}>

                                <FormLabel id="Extral Instructions">Extra Instructions</FormLabel>
                                <ChatInput
                                    multiline
                                    maxRows={6}
                                    value={extrainstruction}
                                    sx={{ p: '2px 4px', display: 'flex', minWidth: 200 }}
                                    onChange={e => setExtraInstruction(e.target.value)}
                                    minRows={4}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                        <ChatBox
                            inputsize={660}
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
                        </Grid>
                        <Grid item md={2}>
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
        </Container >
    );
}
export default FunctionLLM;
