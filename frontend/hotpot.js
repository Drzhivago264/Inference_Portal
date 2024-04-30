import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { FormControl, FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import edjsParser from "editorjs-parser"
import Radio from '@mui/material/Radio';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
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
import Switch from '@mui/material/Switch';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useSearchParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import ApiIcon from '@mui/icons-material/Api';
import ArticleIcon from '@mui/icons-material/Article';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import LayersIcon from '@mui/icons-material/Layers';
import ChatIcon from '@mui/icons-material/Chat';
import KeyIcon from '@mui/icons-material/Key';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmailIcon from '@mui/icons-material/Email';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMatch } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ResponsiveAppBar from './navbar';
import SendIcon from '@mui/icons-material/Send';
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import CheckList from "@editorjs/checklist";
import GetAppIcon from '@mui/icons-material/GetApp';
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
    const editorref = useRef();
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
    const [default_editor_structure, setEditor] = useState(null);
    const [currentparagraph, setCurrentParagraph] = useState(1);
    const [template_list, setTemplateList] = useState([]);
    const [default_child_template_list, setDefaultChildTemplateList] = useState([]);
    const [default_parent_instruct, setParentInstruct] = useState("");
    const [default_child_instruct, setChildInstruct] = useState("");
    const [choosen_export_format, setChoosenExportFormat] = useState(".json");
    useEffect(() => {
        if (!ref.current) {
            const editor = new EditorJS({
                holderId: 'editorjs',
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true
                    },
                    // ...
                },
                data: default_editor_structure,
            });
            editor.isReady
                .then(() => {
                    console.log('Editor.js is ready to work!')
                })
            editorref.current = editor;
        }
    }, []);
    useEffect(() => {
        axios.all([
            axios.get('/frontend-api/model'),
            axios.get('/frontend-api/instruction-tree'),
        ])
            .then(axios.spread((model_object, instruction_object) => {
                setAgents(model_object.data.models_agent);
                setTemplateList(instruction_object.data.root_nodes)
                setChildInstruct(instruction_object.data.default_children[0].instruct)
                setDefaultChildTemplateList(instruction_object.data.default_children)
                editorref.current.isReady
                    .then(() => {
                        console.log('Editor.js is ready to work!')
                        for (var node in instruction_object.data.root_nodes) {
                            if (instruction_object.data.root_nodes[node].name == choosen_template) {
                                setParentInstruct(instruction_object.data.root_nodes[node].instruct)
                                setEditor(JSON.parse(instruction_object.data.root_nodes[node].default_editor_template))
                                editorref.current.render(JSON.parse(instruction_object.data.root_nodes[node].default_editor_template))
                            }
                        }
                    })
                    .catch((reason) => {
                        console.log(`Editor.js initialization failed because of ${reason}`)
                    });

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
                if ((dataFromServer.hasOwnProperty("swap_template"))) {
                    setParentInstruct(dataFromServer.swap_instruction)
                    setChildInstruct(dataFromServer.default_child_instruct)
                    let new_child_template_list = []
                    for (var new_child in dataFromServer.child_template_name_list) {
                        new_child_template_list.push({ 'name': dataFromServer.child_template_name_list[new_child] })
                    }
                    setDefaultChildTemplateList(new_child_template_list)
                    setEditor(JSON.parse(dataFromServer.swap_template))
                    editorref.current.render(JSON.parse(dataFromServer.swap_template))

                }
                else if ((dataFromServer.hasOwnProperty("child_instruct"))) {
                    setChildInstruct(dataFromServer.child_instruct)
                }
                else if (dataFromServer.hasOwnProperty("paragraph")) {
                    setCurrentParagraph(dataFromServer.paragraph)
                }
                else if (dataFromServer.role == "Human" || dataFromServer.role == "Server" || dataFromServer.holder) {

                    setChatMessage(chat_message => [
                        ...chat_message,
                        dataFromServer,
                    ])
                }
                else if (dataFromServer.hasOwnProperty("agent_action")) {
                    if (dataFromServer.agent_action == "STOP") {
                        var blockToAdd = {
                            type: 'paragraph',
                            data: {
                                text: dataFromServer.full_result.replace(/\n/g, "<br>")
                            }
                        };
                        editorref.current.blocks.insert(blockToAdd.type, blockToAdd.data, null, dataFromServer.result_id);
                    }
                }
                else {

                    thinking = document.getElementById("thinking");
                    if (thinking != null) {
                        thinking.remove();
                    }
                    document.getElementById(dataFromServer.stream_id).innerHTML += dataFromServer.message
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
                'currentParagraph': currentparagraph,
                'message': usermessage,
                'key': key,
                'choosen_models': choosen_model,
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
            websocket.current.send(JSON.stringify(data))
            setUserMessage("")
        }
    }
    const swap_template = (template) => {
        websocket.current.send(JSON.stringify({
            'swap_template': template,
        }));
    }
    const swap_child_instruction = (child) => {
        websocket.current.send(JSON.stringify({
            'swap_child_instruct': child,
        }));
    }

    useEffect(() => {
        const editorElement = document.getElementById('editorjs');
        const onClick = (e) => {
            if (editorref.current && e.type === "click") {
                const blockIndex = editorref.current.blocks.getCurrentBlockIndex();
                setCurrentParagraph(blockIndex)
                websocket.current.send(JSON.stringify({
                    'paragraph': blockIndex,
                }));
            }
        }
        if (editorElement) {
            editorElement.addEventListener('click', onClick);
        }
        return () => {
            editorElement?.removeEventListener('click', onClick);
        }
    }, [focus]);

    const handleExport = (event) => {
        event.preventDefault()
        if (choosen_export_format == ".json") {
            download("application/json", 'Written_By_Professor_Parakeet.json')
        }
        else if (choosen_export_format == ".html") {
            download("text/html", 'Written_By_Professor_Parakeet.html')
        }
        else if (choosen_export_format == ".txt") {
            download("text/plain", 'Written_By_Professor_Parakeet.txt')
        }
        else if (choosen_export_format == ".pdf") {
            download("application/pdf", 'Written_By_Professor_Parakeet.pdf')
        }
    }

    const parser = new edjsParser();

    const download = (mimeType, filename) => {
        editorref.current.save().then((outputData) => {
            
            let download_content = outputData
            if (mimeType == "application/json") {
                console.log(mimeType)
                download_content = JSON.stringify(outputData, null, 4)
            }
            else if (mimeType == "text/html") {
                download_content = parser.parse(download_content);
            }
            else if (mimeType == "text/plain") {
                let html = parser.parse(download_content);
                html = html.toString()
                html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
                html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
                html = html.replace(/<\/div>/ig, '\n');
                html = html.replace(/<\/li>/ig, '\n');
                html = html.replace(/<li>/ig, '  *  ');
                html = html.replace(/<\/ul>/ig, '\n');
                html = html.replace(/<\/p>/ig, '\n');
                html = html.replace(/<br\s*[\/]?>/gi, "\n");
                html = html.replace(/<[^>]+>/ig, '');
                download_content = html
            }
            else if (mimeType == "application/pdf") {
                let html = parser.parse(download_content);
                var htmlToPdfmake = require("html-to-pdfmake");
                var html_to_pdf = htmlToPdfmake(html);
                var pdf = { content: html_to_pdf };
                var pdfMake = require('pdfmake');
                pdfMake.vfs = pdfFonts.pdfMake.vfs;
                pdfMake.createPdf(pdf).download('Written_By_Professor_Parakeet.pdf')
            }
            if (mimeType != "application/pdf") {
                var a = document.createElement('a')
                var blob = new Blob([download_content], { type: mimeType })
                var url = URL.createObjectURL(blob)
                a.setAttribute('href', url)
                a.setAttribute('download', filename)
                a.click()
            }
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
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
                            <Divider ></Divider>
                            <Box mt={2}>
                                <form onSubmit={handleExport}>
                                    <FormControl  >
                                        <Stack direction={'row'} spacing={1}>
                                            <InputLabel id="export-label">Formats</InputLabel>
                                            <Select
                                                labelId="export-label"
                                                id="export-select"
                                                onChange={e => setChoosenExportFormat(e.target.value)}
                                                value={choosen_export_format}
                                                label="Export"
                                            >
                                                {['.json', '.txt', '.html', '.pdf'].map((format) => {
                                                    return (
                                                        <MenuItem key={format} value={format}>{format}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                            <Button size="small" variant="contained" type="submit" endIcon={<GetAppIcon />}>Export</Button>
                                        </Stack>
                                    </FormControl>
                                </form>
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                            <Stack spacing={1}>
                                <Typography variant="h4" gutterBottom>Parent Instruction</Typography>
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
                                <Typography variant="h4" gutterBottom>Child Instruction</Typography>
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
                                <Divider />
                                <Typography variant="h4" gutterBottom>Editor</Typography>
                                <div id='editorjs' />
                            </Stack>
                        </Grid>
                        <Grid item md={4}>
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
                                <Stack direction='row' spacing={1}>
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
                                    <FormControl >
                                        <InputLabel id="agent-label">Agents</InputLabel>
                                        <Select
                                            labelId="agent-label"
                                            id="agent-select"
                                            onChange={e => { setChoosenTemplate(e.target.value); swap_template(e.target.value) }}
                                            value={choosen_template}
                                            label="Agents"
                                        >
                                            {template_list.map((template) => {
                                                return (
                                                    <MenuItem key={template.name} value={template.name}>{template.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Divider></Divider>
                                <FormLabel id="demo-radio-buttons-group-label">Parameters</FormLabel>

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
        </Container>
    );
}
export default Hotpot;
