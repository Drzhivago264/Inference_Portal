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
import ResponsiveAppBar from './navbar';
import SendIcon from '@mui/icons-material/Send';
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

                    setChatMessage(chat_message => [
                        ...chat_message,
                        dataFromServer,
                    ])
                }
                else {
                    setStream(dataFromServer.message);
                   setLastestSream(dataFromServer.stream_id)
                };
                var logTa = document.getElementById("chat-log")
                logTa.scrollTop = logTa.scrollHeight;
            }
        }
    }, []);
    useEffect(() => {
        if (!streamtokens) {
          return;
        }
        thinking = document.getElementById("thinking");
        if (thinking != null) {
            thinking.remove();
        }
        document.getElementById(lasteststreamid).innerHTML += streamtokens
        setStream(null)
      }, [streamtokens])
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
    const swap_extra_instruction = (e) =>{
        if (e=='restyle'){
            setExtraInstruction("sad, serious")
        }
        else if (e=='emotion'){
            setExtraInstruction("sadness, joy, love, anger, fear, surprise, neutral")
        }
        else if (e=='summary'){
            setExtraInstruction(100)
        }
        else if (e=='topic' || 'paraphase' || 'sentiment'){
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
                                    onChange={e => {setLLMFunction(e.target.value); swap_extra_instruction(e.target.value)}}
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
                            <ChatPaper id={'chat-log'} variant="outlined">
                                <TextField
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
                                />
                                <Stack spacing={1}>
                                    {chat_message.map((mess) => {

                                        if (mess.role == 'Human') {
                                            return (
                                                <Paper  ><Box p={1} className="message_log_container" style={{ whiteSpace: 'pre-line', textAlign: 'right' }}>  <span> ({mess.role} - {mess.time}) {mess.message} </span></Box></Paper>
                                            )
                                        }
                                        else if (mess.holder) {
                                            return (
                                                <Paper ><Box p={1} className="message_log_container" style={{ whiteSpace: 'pre-line' }} id={mess.holderid} >  <span> {mess.role} - {mess.time}: <span id="thinking" aria-busy="true"> Thinking time...</span></span></Box></Paper>
                                            )
                                        }
                                        else if (mess.role == 'Server') {
                                            return (
                                                <Paper  ><Box p={1} className="message_log_container" style={{ whiteSpace: 'pre-line' }}>  <span> {mess.message} ({mess.role} - {mess.time}) </span></Box></Paper>
                                            )
                                        }

                                    })}

                                </Stack>
                                <div ref={messagesEndRef}> </div>
                            </ChatPaper>
                            <Box mt={2}>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', minWidth: 300 }}
                                >
                                    <ChatInput
                                        id="standard-multiline-flexible"
                                        multiline
                                        maxRows={6}
                                        value={usermessage}
                                        error={usermessageError}
                                        onChange={e => setUserMessage(e.target.value)}
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
                        <Grid item md={2}>
                            <Stack direction='column' spacing={1}>
                                <FormControl  >
                                    <InputLabel id="model-label">Models</InputLabel>
                                    <Select
                                        labelId="model-label"
                                        id="model-select"
                                        onChange={e => setChoosenModel(e.target.value)}
                                        value={choosen_model}
                                        label="Models"
                                    >
                                        {agent_objects.map((agent_object_) => {
                                            return (
                                                <MenuItem key={agent_object_.name} value={agent_object_.name}>{agent_object_.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <Divider></Divider>
                                <FormLabel >Parameters</FormLabel>

                                <Typography gutterBottom>Top_p: {top_p}</Typography>
                                <Slider
                                    step={0.01}
                                    min={0}
                                    max={1}
                                    valueLabelDisplay="off"
                                    onChange={e => setTopp(e.target.value)}
                                    value={top_p}
                                />
                                <Typography gutterBottom>Max_tokens: {max_tokens}</Typography>
                                <Slider
                                    defaultValue={512}
                                    step={1}
                                    min={1}
                                    max={4090}
                                    onChange={e => setMaxToken(e.target.value)}
                                    value={max_tokens}
                                    valueLabelDisplay="off"
                                />
                                <Typography gutterBottom>Temperature: {temperature}</Typography>
                                <Slider
                                    defaultValue={0.73}
                                    step={0.01}
                                    min={0}
                                    max={1}
                                    onChange={e => setTemperature(e.target.value)}
                                    value={temperature}
                                    valueLabelDisplay="off"
                                />
                                <Typography gutterBottom>Presence penalty: {presencepenalty}</Typography>
                                <Slider
                                    aria-label="Small steps"
                                    defaultValue={0}
                                    step={0.01}
                                    min={-2}
                                    max={2}
                                    onChange={e => setPresencePenalty(e.target.value)}
                                    value={presencepenalty}
                                    valueLabelDisplay="off"
                                />
                                <Typography gutterBottom>Frequency penalty: {frequencypenalty}</Typography>
                                <Slider
                                    aria-label="Small steps"
                                    defaultValue={0}
                                    step={0.01}
                                    min={-2}
                                    max={2}
                                    onChange={e => setFrequencyPenalty(e.target.value)}
                                    value={frequencypenalty}
                                    valueLabelDisplay="off"
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Container >
    );
}
export default FunctionLLM;
