import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { FormControl, FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import edjsParser from "editorjs-parser"
import * as pdfMake from 'pdfmake/build/pdfmake.min';
import pdfFonts from "pdfmake/build/vfs_fonts";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ResponsiveAppBar from '../component/navbar';
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote"
import Paragraph from "@editorjs/paragraph"
import Underline from "@editorjs/underline"
const EditorList = require("@editorjs/list");
import InlineCode from '@editorjs/inline-code';
const Table = require('editorjs-table');
const AlignmentTuneTool = require('editorjs-text-alignment-blocktune');
import editorjsCodecup from '@calumk/editorjs-codecup';
import GetAppIcon from '@mui/icons-material/GetApp';
import { OpenAPIParameter } from '../component/chatroom_parameters';
import { ChatBox } from '../component/chatbox';
import { agentsocket } from '../component/chatsocket';
import '../component/css/editor-js.css';
import { ChatExport } from '../component/chat_export';
import Footer from '../component/footer';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
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

function Agent() {
    const ref = useRef();
    const editorref = useRef();
    const websocket = useRef(null)
    const messagesEndRef = useRef(null)
    const [shownthinking, setThinking] = useState(false);
    const [chat_message, setChatMessage] = useState([]);
    const [agent_objects, setAgents] = useState([]);
    const [choosen_model, setChoosenModel] = useState("gpt-4");
    const [choosen_template, setChoosenTemplate] = useState("Assignment Agent");
    const [choosen_user_template, setChoosenUserTemplate] = useState("");
    const [top_p, setTopp] = useState(0.72);
    const [max_tokens, setMaxToken] = useState(null);
    const [temperature, setTemperature] = useState(0.73);
    const [presencepenalty, setPresencePenalty] = useState(0);
    const [frequencypenalty, setFrequencyPenalty] = useState(0);
    const [usermessage, setUserMessage] = useState("");
    const [usermessageError, setUserMessageError] = useState(false);
    const [socket_destination, setSocketDestination] = useState("/ws/engineer-async/");
    const [default_editor_structure, setEditor] = useState(null);
    const [currentparagraph, setCurrentParagraph] = useState(1);
    const [template_list, setTemplateList] = useState([]);
    const [default_child_template_list, setDefaultChildTemplateList] = useState([]);
    const [default_parent_instruct, setParentInstruct] = useState("");
    const [default_child_instruct, setChildInstruct] = useState("");
    const [choosen_export_format, setChoosenExportFormat] = useState(".json");
    const [choosen_export_format_chatlog, setChoosenExportFormatChatLog] = useState(".json");
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    const [user_template_list, setUserTemplateList] = useState([]);
    const [use_user_template, setUseUserTemplate] = useState(false)
    const [default_user_child_template_list, setDefaultUserChildTemplateList] = useState([]);
    const [default_user_parent_instruct, setUserParentInstruct] = useState("");
    const [default_user_child_instruct, setUserChildInstruct] = useState("");
    const handle_use_user_template = (event) => {
        setUseUserTemplate(event.target.checked);
        let default_editor = { "time": 1709749130861, "blocks": [{ "id": "1hYKvu7PTO", "type": "header", "data": { "text": "Response", "level": 2 } }, { "id": "SrV68agaen", "type": "paragraph", "data": { "text": "" } }], "version": "2.29.1" }
        setEditor(default_editor)
        editorref.current.render(default_editor)
    };
    useEffect(() => {
        if (!ref.current) {
            const editor = new EditorJS({
                holderId: 'editorjs',
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: ['link']
                    },
                    list: {
                        class: EditorList,
                        inlineToolbar: true
                    },
                    quote: {
                        class: Quote,
                        inlineToolbar: true,
                    },
                    paragraph: {
                        class: Paragraph,
                        config: {
                            preserveBlank: true
                        },
                        inlineToolbar: true
                    },
                    underline: Underline,
                    code: {
                        class: editorjsCodecup,
                        inlineToolbar: true,
                    },
                    inlineCode: {
                        class: InlineCode,
                        shortcut: 'CMD+SHIFT+M',
                    },
                    anyTuneName: {
                        class: AlignmentTuneTool,
                        config: {
                            default: "right",
                            blocks: {
                                header: 'center',
                                list: 'right'
                            }
                        },
                    }

                },
                data: default_editor_structure,
            });
            editor.isReady
                .then(() => {
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
                setUserTemplateList(instruction_object.data.user_root_nodes)
                if (instruction_object.data.user_root_nodes.length > 0) {
                    setChoosenUserTemplate(instruction_object.data.user_root_nodes[0].displayed_name)
                }
                setChildInstruct(instruction_object.data.default_children[0].instruct)
                if (instruction_object.data.default_user_children.length > 0) {
                    setUserChildInstruct(instruction_object.data.default_user_children[0].instruct)
                }
                setDefaultChildTemplateList(instruction_object.data.default_children)
                setDefaultUserChildTemplateList(instruction_object.data.default_user_children)
                setUserParentInstruct(instruction_object.data.user_root_nodes[0].instruct)
                editorref.current.isReady
                    .then(() => {
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
        websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + socket_destination + + url[url.length - 1] + '/' + timeZone + '/');
        agentsocket(
            websocket,
            setChatMessage,
            setThinking,
            document,
            setParentInstruct,
            setChildInstruct,
            setDefaultChildTemplateList,
            use_user_template,
            setUserParentInstruct,
            setUserChildInstruct,
            setDefaultUserChildTemplateList,
            setEditor,
            setCurrentParagraph,
            editorref
        )

    }, []);

    useEffect(() => {
        websocket.current.close()
        websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + socket_destination + url[url.length - 1] + '/' + timeZone + '/');
        agentsocket(
            websocket,
            setChatMessage,
            setThinking,
            document,
            setParentInstruct,
            setChildInstruct,
            setDefaultChildTemplateList,
            use_user_template,
            setUserParentInstruct,
            setUserChildInstruct,
            setDefaultUserChildTemplateList,
            setEditor,
            setCurrentParagraph,
            editorref
        )
    }, [socket_destination]);

    useEffect(() => {
        agentsocket(
            websocket,
            setChatMessage,
            setThinking,
            document,
            setParentInstruct,
            setChildInstruct,
            setDefaultChildTemplateList,
            use_user_template,
            setUserParentInstruct,
            setUserChildInstruct,
            setDefaultUserChildTemplateList,
            setEditor,
            setCurrentParagraph,
            editorref
        )
    }, [use_user_template, default_user_child_instruct, default_user_parent_instruct, default_user_child_template_list]);

    const handleEnter = (e) => {
        if (e.key == "Enter" && !e.shiftKey) {
            submitChat()
        }
    }
    const submitChat = () => {
        if (usermessage == '') {
            setUserMessageError(true)
        }
        else {
            var data = {
                'currentParagraph': currentparagraph,
                'message': usermessage,
                'choosen_models': choosen_model,
                'choosen_template': use_user_template ? choosen_user_template : choosen_template,
                'role': 'Human',
                'top_p': top_p,
                'max_tokens': max_tokens,
                'frequency_penalty': frequencypenalty,
                'presence_penalty': presencepenalty,
                'temperature': temperature,
                'agent_instruction': use_user_template ? default_user_parent_instruct : default_parent_instruct,
                'child_instruction': use_user_template ? default_user_child_instruct : default_child_instruct
            }
            websocket.current.send(JSON.stringify(data))
            setUserMessage("")
        }
    }
    const swap_template = (template, type) => {
        websocket.current.send(JSON.stringify({
            'swap_template': template,
            'template_type': type
        }));
    }
    const swap_child_instruction = (child, type) => {
        websocket.current.send(JSON.stringify({
            'swap_child_instruct': child,
            'template_type': type
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
            <Container maxWidth={false} sx={{ minWidth: 1500 }} disableGutters>
                <Box mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <List subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Template Structure
                                </ListSubheader>
                            }>
                                {!use_user_template && default_child_template_list.map((instruct) => {
                                    return (
                                        <ListItem key={instruct.name} disablePadding>
                                            <ListItemButton  onClick={() => swap_child_instruction(instruct.name, 'system')}   >
                                                <ListItemText primary={instruct.name}/>
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })}
                                {use_user_template && default_user_child_template_list.map((instruct) => {
                                    return (
                                        <ListItem key={instruct.displayed_name} disablePadding>
                                            <ListItemButton onClick={() => swap_child_instruction(instruct.displayed_name, 'user_template')} >
                                                <ListItemText  primary={instruct.displayed_name} />
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })}
                            </List>
                            <Divider ></Divider>
                            <Box m={2}>
                                <form onSubmit={handleExport}>
                                    <Typography pb={2}>Editor Export</Typography>
                                    <FormControl  >

                                        <Stack direction={'row'} spacing={1}>
                                            <InputLabel id="export-label">Formats</InputLabel>
                                            <Select
                                                labelId="export-label"
                                                id="export-select"
                                                onChange={e => setChoosenExportFormat(e.target.value)}
                                                value={choosen_export_format}
                                                label="Export"
                                                size="small"
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
                                <ChatExport
                                    chat_message={chat_message}
                                    choosen_export_format_chatlog={choosen_export_format_chatlog}
                                    setChoosenExportFormatChatLog={setChoosenExportFormatChatLog}
                                    number_of_remove_message={2}
                                    setChatMessage={setChatMessage}
                                >
                                </ChatExport>
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item xs={4}>
                            <Stack spacing={1}>
                                <Typography variant="h5" gutterBottom>Parent Instruction</Typography>
                                <Paper>
                                    {!use_user_template && <ChatInput
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
                                    />}
                                    {use_user_template && <ChatInput
                                        id="user-parent-instruct"
                                        multiline
                                        maxRows={8}
                                        value={default_user_parent_instruct}
                                        onChange={e => setUserParentInstruct(e.target.value)}
                                        minRows={6}
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">   </InputAdornment>,

                                        }}
                                    />}
                                </Paper>
                                <Divider />
                                <Typography variant="h5" gutterBottom>Child Instruction</Typography>
                                <Paper>
                                    {!use_user_template && <ChatInput
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
                                    />}
                                    {use_user_template && <ChatInput
                                        id="user-child-instruct"
                                        multiline
                                        maxRows={8}
                                        value={default_user_child_instruct}
                                        onChange={e => setUserChildInstruct(e.target.value)}
                                        minRows={6}
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">   </InputAdornment>,
                                        }}
                                    />}
                                </Paper>
                                <Divider />
                                <Typography variant="h5" gutterBottom>Editor</Typography>
                                <div id='editorjs' />
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Box mr={2}>
                                <Typography variant="h5" gutterBottom>Chat Log</Typography>
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
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item xs={2}>
                            <Stack direction='column' mr={2} spacing={2}>
                                {!use_user_template && <FormControl >
                                    <InputLabel id="agent-label">Agents</InputLabel>
                                    <Select
                                        labelId="agent-label"
                                        id="agent-select"
                                        onChange={e => { setChoosenTemplate(e.target.value); swap_template(e.target.value, 'system') }}
                                        value={choosen_template}
                                        label="Agents"
                                        size="small"
                                    >
                                        {template_list.map((template) => {
                                            return (
                                                <MenuItem key={template.name} value={template.name}>{template.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>}
                                {use_user_template && <FormControl disabled>
                                    <InputLabel id="agent-label">Agents</InputLabel>
                                    <Select
                                        labelId="agent-label"
                                        id="agent-select"
                                        onChange={e => { setChoosenTemplate(e.target.value); swap_template(e.target.value, 'system') }}
                                        value={choosen_template}
                                        label="Agents"
                                        size="small"
                                    >
                                        {template_list.map((template) => {
                                            return (
                                                <MenuItem key={template.name} value={template.name}>{template.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>}
                                <Divider></Divider>
                                {user_template_list.length == 0 && <FormControl disabled>
                                    <InputLabel id="use-agent-label">Users' Agents</InputLabel>
                                    <Stack direction='column' spacing={1}>
                                        {!use_user_template && <Select
                                            labelId="user-agent-label"
                                            id="user-agent-select"
                                            onChange={e => { setChoosenUserTemplate(e.target.value); swap_template(e.target.value, 'user_template') }}
                                            value={choosen_user_template}
                                            label="Users' Agents"
                                            size="small"
                                            disabled
                                        >
                                            {user_template_list.map((template) => {
                                                return (
                                                    <MenuItem key={template.displayed_name} value={template.displayed_name}>{template.displayed_name}</MenuItem>
                                                )
                                            })}
                                        </Select>}
                                        {use_user_template && <Select
                                            labelId="user-agent-label"
                                            id="user-agent-select"
                                            onChange={e => { setChoosenUserTemplate(e.target.value); swap_template(e.target.value, 'user_template') }}
                                            value={choosen_user_template}
                                            label="Users' Agents"
                                            size="small"
                                        >
                                            {user_template_list.map((template) => {
                                                return (
                                                    <MenuItem key={template.displayed_name} value={template.displayed_name}>{template.displayed_name}</MenuItem>
                                                )
                                            })}
                                        </Select>}
                                        <FormControlLabel disabled control={<Switch checked={use_user_template} onChange={handle_use_user_template} />} label="Use My Template" />
                                    </Stack>
                                    <FormHelperText>No Users' Agent Found</FormHelperText>
                                </FormControl>}
                                {user_template_list.length > 0 && <FormControl>
                                    <InputLabel id="use-agent-label">Users' Agents</InputLabel>
                                    {!use_user_template && <Select
                                        labelId="user-agent-label"
                                        id="user-agent-select"
                                        onChange={e => { setChoosenUserTemplate(e.target.value); swap_template(e.target.value, "user_template") }}
                                        value={choosen_user_template}
                                        label="Users' Agents"
                                        size="small"
                                        disabled
                                    >
                                        {user_template_list.map((template) => {
                                            return (
                                                <MenuItem key={template.displayed_name} value={template.displayed_name}>{template.displayed_name}</MenuItem>
                                            )
                                        })}
                                    </Select>}
                                    {use_user_template && <Select
                                        labelId="user-agent-label"
                                        id="user-agent-select"
                                        onChange={e => { setChoosenUserTemplate(e.target.value); swap_template(e.target.value, "user_template") }}
                                        value={choosen_user_template}
                                        label="Users' Agents"
                                        size="small"
                                    >
                                        {user_template_list.map((template) => {
                                            return (
                                                <MenuItem key={template.displayed_name} value={template.displayed_name}>{template.displayed_name}</MenuItem>
                                            )
                                        })}
                                    </Select>}
                                    <FormControlLabel control={<Switch checked={use_user_template} onChange={handle_use_user_template} />} label="Use My Template" />
                                </FormControl>}
                                <Divider></Divider>
                                <FormControl defaultValue="">
                                    <InputLabel id="model-label">Backends</InputLabel>
                                    <Select
                                        labelId="socket-label"
                                        id="socket-select"
                                        onChange={e => setSocketDestination(e.target.value)}
                                        value={socket_destination}
                                        label="Backends"
                                        size="small"
                                    >
                                        <MenuItem key={"/ws/engineer/"} value={"/ws/engineer/"}>Celery Backend</MenuItem>
                                        <MenuItem key={"/ws/engineer-async/"} value={"/ws/engineer-async/"}>Async Backend</MenuItem>
                                    </Select>
                                </FormControl>
                                <Divider></Divider>
                                <FormLabel id="demo-radio-buttons-group-label">Parameters</FormLabel>
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
                                <Alert severity="info" sx={{ whiteSpace: 'pre-line' }}>
                                    <AlertTitle>Note: </AlertTitle>
                                    {`Async Backend is the preferred backend that supports newest features. \n
                                    Interview Agent only works on Async Backend.`}
                                </Alert>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Container>
    );
}
export default Agent;
