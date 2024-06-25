import React, { useState, useEffect, useRef, useContext, useLayoutEffect, useCallback } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { FormControl } from '@mui/material';
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
import ResponsiveAppBar from '../component/Navbar.js';
import GetAppIcon from '@mui/icons-material/GetApp';
import { OpenAPIParameter } from '../component/ChatroomParameters.js';
import { ChatBox } from '../component/Chatbox.js';
import { agentsocket } from '../component/ChatSocket.js';
import '../component/css/editor-js.css';
import { ChatExport } from '../component/chatExport.js';
import Footer from '../component/Footer.js';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { redirect_anon_to_login } from '../component/checkLogin.js';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App.js'
import CsvFileInput from '../component/CsvInput.js';
import {
    DataGrid, useGridApiContext,
    GridCellEditStopReasons,
} from '@mui/x-data-grid';
import Popper from '@mui/material/Popper';
import InputBase from '@mui/material/InputBase';

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

function isKeyboardEvent(event) {
    return !!event.key;
}

function EditTextarea(props) {
    const { id, field, value, colDef, hasFocus } = props;
    const [valueState, setValueState] = useState(value);
    const [anchorEl, setAnchorEl] = useState();
    const [inputRef, setInputRef] = useState(null);
    const apiRef = useGridApiContext();

    useLayoutEffect(() => {
        if (hasFocus && inputRef) {
            inputRef.focus();
        }
    }, [hasFocus, inputRef]);

    const handleRef = useCallback((el) => {
        setAnchorEl(el);
    }, []);

    const handleChange = useCallback(
        (event) => {
            const newValue = event.target.value;
            setValueState(newValue);
            apiRef.current.setEditCellValue(
                { id, field, value: newValue, debounceMs: 200 },
                event,
            );
        },
        [apiRef, field, id],
    );

    return (
        <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
            <div
                ref={handleRef}
                style={{
                    height: 1,
                    width: colDef.computedWidth,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            {anchorEl && (
                <Popper open anchorEl={anchorEl} placement="bottom-start">
                    <Paper elevation={1} sx={{ p: 1, minWidth: colDef.computedWidth }}>
                        <InputBase
                            multiline
                            rows={4}
                            value={valueState}
                            sx={{ textarea: { resize: 'both' }, width: '100%' }}
                            onChange={handleChange}
                            inputRef={(ref) => setInputRef(ref)}
                        />
                    </Paper>
                </Popper>
            )}
        </div>
    );
}

const multilineColumn = {
    type: 'string',
    renderEditCell: (params) => <EditTextarea {...params} />,
};

function DataSynthesis() {
    const ref = useRef();
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
    const [max_turn, setMaxTurn] = useState(4)
    const [instruct_change, setInstructChange] = useState(false)
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


    const [csv_row, setCSVRow] = useState([]);
    const [csv_column, setCSVColumn] = useState([]);
    const handleFileLoad = (csvData) => {
        setCSVRow(csvData);
    };

    useEffect(() => {
        if (csv_row[0]) {
            var keys = Object.keys(csv_row[0])
            var column = []
            for (let k in keys) {
                column.push({
                    field: keys[k],
                    headerName: keys[k],
                    editable: true,
                    ...multilineColumn,
                })
            }
            setCSVColumn(column)
        }
    }, [csv_row]);


    const navigate = useNavigate();
    const { is_authenticated, setIsAuthenticated } = useContext(UserContext);

    useEffect(() => {
        redirect_anon_to_login(navigate, is_authenticated)
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
                    setUserParentInstruct(instruction_object.data.user_root_nodes[0].instruct)
                }
                setChildInstruct(instruction_object.data.default_children[0].instruct)
                if (instruction_object.data.default_user_children.length > 0) {
                    setUserChildInstruct(instruction_object.data.default_user_children[0].instruct)
                }
                setDefaultChildTemplateList(instruction_object.data.default_children)
                setDefaultUserChildTemplateList(instruction_object.data.default_user_children)

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
        )
    }, [use_user_template, default_user_child_instruct, default_user_parent_instruct, default_user_child_template_list]);

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
            <ResponsiveAppBar max_width={false} />
            <Container maxWidth={false} sx={{ minWidth: 1500 }} disableGutters>
                <Box mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Paper sx={{ ml: 2, mr: 2 }} variant='outlined'>
                                <Box m={1}>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        Load CSV File
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box m={2}>
                                    <CsvFileInput onFileLoad={handleFileLoad} />
                                </Box>

                            </Paper>
                            <Paper sx={{ m: 2 }} variant='outlined'>
                                <Box m={1}>
                                    <Typography sx={{ color: 'text.secondary' }}>Editor Export</Typography>
                                </Box>
                                <Divider />
                                <Box m={2}>
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

                                </Box>
                            </Paper>
                            <Paper sx={{ m: 2 }} variant='outlined'>
                                <Box m={1}>
                                    <Typography sx={{ color: 'text.secondary' }}>Chat Log Export</Typography>
                                </Box>
                                <Divider />
                                <Box m={2}>
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
                        <Grid item xs={5}>
                            <Box >
                                <DataGrid

                                    rows={csv_row}
                                    columns={csv_column}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 10,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[10]}
                                    onCellEditStop={(params, event) => {
                                        if (params.reason !== GridCellEditStopReasons.enterKeyDown) {
                                            return;
                                        }
                                        if (isKeyboardEvent(event) && !event.ctrlKey && !event.metaKey) {
                                            event.defaultMuiPrevented = true;
                                        }
                                    }}

                                />
                            </Box>

                        </Grid>
                        <Grid item xs={3}>
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
export default DataSynthesis;
