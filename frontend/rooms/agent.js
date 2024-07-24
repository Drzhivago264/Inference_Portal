import '../component/css/editor-js.css';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext, WebSocketContext } from '../App.js'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import Box from '@mui/material/Box';
import { ChatBox } from '../component/chat_components/Chatbox.js';
import { ChatExport } from '../component/import_export/ChatExport.js';
import ChatInput from '../component/chat_components/ChatInput.js';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import EditorExport from '../component/import_export/EditorExport.js';
import EditorJS from "@editorjs/editorjs";
import EditorList from "@editorjs/list"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../component/nav/Footer.js';
import { FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';
import Header from "@editorjs/header";
import InlineCode from '@editorjs/inline-code';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { OpenAPIParameter } from '../component/chat_components/OpenaiParameters.js';
import Paper from '@mui/material/Paper';
import Paragraph from "@editorjs/paragraph"
import Quote from "@editorjs/quote"
import ResponsiveAppBar from '../component/nav/Navbar.js';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Underline from "@editorjs/underline"
import UserTemplate from '../component/chat_components/UserTemplate.js';
import { agentsocket } from '../component/websocket/AgentSocket.js';
import editorjsCodecup from '@calumk/editorjs-codecup';
import { styled } from '@mui/material/styles';
import { useGetInstructionTree } from '../api_hook/useGetInstructionTree.js';
import { useGetModel } from '../api_hook/useGetModel.js';
import { useGetRedirectAnon } from '../api_hook/useGetRedirectAnon.js';
import { useNavigate } from "react-router-dom";

const ChatPaper = styled(Paper)(({ theme }) => ({
    minWidth: 300,
    height: 700,
    overflow: 'auto',
    padding: theme.spacing(2),
    ...theme.typography.body2,
}));

function Agent() {
    const { websocket, agent_websocket, chat_websocket, websocket_hash } = useContext(WebSocketContext);
    const editorref = useRef();
    const messagesEndRef = useRef(null)
    const [shownthinking, setThinking] = useState(false);
    const [chat_message, setChatMessage] = useState([]);
    const [choosen_model, setChoosenModel] = useState("gpt-4");
    const [top_p, setTopp] = useState(0.72);
    const [max_tokens, setMaxToken] = useState(null);
    const [temperature, setTemperature] = useState(0.73);
    const [presencepenalty, setPresencePenalty] = useState(0);
    const [frequencypenalty, setFrequencyPenalty] = useState(0);
    const [usermessage, setUserMessage] = useState("");
    const [max_turn, setMaxTurn] = useState(4)
    const [instruct_change, setInstructChange] = useState(false)
    const [usermessageError, setUserMessageError] = useState(false);
    const [socket_destination, setSocketDestination] = useState("/ws/engineer-async/");
    const [default_editor_structure, setEditor] = useState(null);
    const [currentparagraph, setCurrentParagraph] = useState(1);
    const [use_user_template, setUseUserTemplate] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const { is_authenticated, timeZone } = useContext(UserContext);
    useGetRedirectAnon(navigate, is_authenticated)

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handle_use_user_template = (event) => {
        setUseUserTemplate(event.target.checked);
        const default_editor = {
            time: 1709749130861,
            blocks: [
                { id: "1hYKvu7PTO", type: "header", data: { text: "Response", level: 2 } },
                { id: "SrV68agaen", type: "paragraph", data: { text: "" } }
            ],
            version: "2.29.1"
        };
        setEditor(default_editor);
        editorref.current.render(default_editor);
    };
    useEffect(() => {
        if (!editorref.current) {
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

    const { agent_objects } = useGetModel()

    const {
        template_list: template_list,
        default_child_instruct: default_child_instruct,
        setChildInstruct: setChildInstruct,
        default_child_template_list: default_child_template_list,
        setDefaultChildTemplateList: setDefaultChildTemplateList,
        choosen_template: choosen_template,
        setChoosenTemplate: setChoosenTemplate,
        default_parent_instruct: default_parent_instruct,
        setParentInstruct: setParentInstruct,
        user_template_list: user_template_list,
        default_user_child_template_list: default_user_child_template_list,
        setDefaultUserChildTemplateList: setDefaultUserChildTemplateList,
        default_user_parent_instruct: default_user_parent_instruct,
        setUserParentInstruct: setUserParentInstruct,
        choosen_user_template: choosen_user_template,
        setChoosenUserTemplate: setChoosenUserTemplate,
        default_user_child_instruct: default_user_child_instruct,
        setUserChildInstruct: setUserChildInstruct,
        isLoading: isLoading
    } = useGetInstructionTree(editorref, setEditor)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'nearest' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chat_message]);
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    useEffect(() => {
        if (websocket.current) {
            websocket.current.close()
        }
        if (agent_websocket.current) {
            agent_websocket.current.close()
        }
        if (chat_websocket.current) {
            chat_websocket.current.close()
        }
        if (websocket_hash) {
            websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + socket_destination + websocket_hash + '/' + timeZone + '/');
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
        }
    }, [socket_destination, websocket_hash]);
    useEffect(() => {
        if (websocket.current) {
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
        }
    }, [use_user_template, default_user_child_instruct, default_user_parent_instruct, default_user_child_template_list, editorref, websocket.current]);

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
                'max_turn': max_turn,
                'instruct_change': instruct_change,
                'currentParagraph': currentparagraph,
                'message': usermessage,
                'choosen_model': choosen_model,
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
            setInstructChange(false)
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
    return (
        <Container maxWidth={false} sx={{ minWidth: 1500 }} disableGutters>
            <title>Agent</title>
            <ResponsiveAppBar max_width={false} />
            <Container maxWidth={false} sx={{ minWidth: 1500 }} disableGutters>
                <Box mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Paper sx={{ ml: 2, mr: 2 }} variant='outlined'>
                                <Box m={1}>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        Template Structure
                                    </Typography>
                                </Box>
                                <Divider />
                                <List dense={true}>
                                    {!use_user_template && default_child_template_list.map((instruct, index) => {
                                        return (
                                            <ListItem key={instruct.name} disablePadding>
                                                <ListItemButton
                                                    selected={selectedIndex === index}
                                                    onClick={(event) => { swap_child_instruction(instruct.name, 'system'), handleListItemClick(event, index) }}   >
                                                    <ListItemText primary={instruct.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    })}
                                    {use_user_template && default_user_child_template_list.map((instruct, index) => {
                                        return (
                                            <ListItem key={instruct.name} disablePadding>
                                                <ListItemButton
                                                    selected={selectedIndex === index}
                                                    onClick={(event) => { swap_child_instruction(instruct.name, 'user_template'), handleListItemClick(event, index) }} >
                                                    <ListItemText primary={instruct.displayed_name} />
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Paper>
                            <EditorExport editorref={editorref} />
                            <ChatExport
                                chat_message={chat_message}
                                number_of_remove_message={2}
                                setChatMessage={setChatMessage}
                            >
                            </ChatExport>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item xs={4}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="parent-content"
                                    id="parent-header"
                                >
                                    <Typography sx={{ color: 'text.secondary' }}>Parent Instruction</Typography>
                                </AccordionSummary>
                                <AccordionDetails >
                                    <Paper variant="outlined">
                                        {isLoading && <Box sx={{ width: '100%' }}>
                                            <LinearProgress />
                                        </Box>
                                        }
                                        <ChatInput
                                            id="parent-instruct"
                                            multiline
                                            maxRows={8}
                                            value={use_user_template ? default_user_parent_instruct : default_parent_instruct}
                                            onChange={e => { use_user_template ? setUserParentInstruct(e.target.value) : setParentInstruct(e.target.value), setInstructChange(true) }}
                                            minRows={6}
                                            variant="standard"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">   </InputAdornment>,
                                            }}
                                        />
                                    </Paper>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="child-content"
                                    id="child-header"
                                >
                                    <Typography sx={{ color: 'text.secondary' }}>Child Instruction</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Paper variant="outlined">
                                    {isLoading && <Box sx={{ width: '100%' }}>
                                            <LinearProgress />
                                        </Box>
                                        }
                                        <ChatInput
                                            id="child-instruct"
                                            multiline
                                            maxRows={8}
                                            value={use_user_template ? default_user_child_instruct : default_child_instruct}
                                            onChange={e => { use_user_template ? setUserChildInstruct(e.target.value) : setChildInstruct(e.target.value), setInstructChange(true) }}
                                            minRows={6}
                                            variant="standard"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">   </InputAdornment>,
                                            }}
                                        />
                                    </Paper>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="editor-content"
                                    id="editor-header"
                                >
                                    <Typography sx={{ color: 'text.secondary' }}>Editor</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div id='editorjs' />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={4}>
                            <Box mr={2}>
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
                                <FormControl disabled={use_user_template}>
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
                                </FormControl>
                                <Divider></Divider>
                                <UserTemplate
                                    use_user_template={use_user_template}
                                    user_template_list={user_template_list}
                                    setChoosenUserTemplate={setChoosenUserTemplate}
                                    choosen_user_template={choosen_user_template}
                                    handle_use_user_template={handle_use_user_template}
                                    swap_template={swap_template}
                                />

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
                                    max_turn={max_turn}
                                    setMaxTurn={setMaxTurn}
                                >
                                </OpenAPIParameter>
                                <Alert severity="info" sx={{ whiteSpace: 'pre-line' }}>
                                    <AlertTitle>Note: </AlertTitle>
                                    {`Celery Backend is deprecated, Async Backend supports newest features.`}
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
