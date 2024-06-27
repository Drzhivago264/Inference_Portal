import React, { useState, useEffect, useRef, useContext, useLayoutEffect, useCallback } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
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
    const [choosen_prompt_column, setChoosenPromptColumn] = useState(null);
    const [choosen_response_column, setChoosenResponseColumn] = useState(null);
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
    const [csv_row, setCSVRow] = useState([
        { id: 1, samplePrompt: 'A water well is an excavation or structure created in the ground by digging, driving, boring, or drilling to access groundwater in underground aquifers. The well water is drawn by a pump, or using containers, such as buckets, that are raised mechanically or by hand. Wells were first constructed at least eight thousand years ago and historically vary in construction from a simple scoop in the sediment of a dry watercourse to the stepwells of India, the qanats of Iran, and the shadoofs and sakiehs of India. Placing a lining in the well shaft helps create stability and linings of wood or wickerwork date back at least as far as the Iron Age. Where does water for a well come from?' },
        { id: 2, samplePrompt: 'Generate short a sentence that can be linguistically classified as acceptable (OPTIONS: - unacceptable - acceptable)' },
        { id: 3, samplePrompt: 'Is the premise "The Chocolate Lab jumps too late to get the toy as the Black Lab captures it in the driveway." true if "The Chocolate Labe got the toy."? OPTIONS: - yes - it is not possible to tell - no' },
        { id: 4, samplePrompt: 'In this task, you are given an open-domain question. Your task is to provide an answer to the given question. There is only one unique answer for each question. Your answer should be short, and refer to an entity, date, number, etc. Do not put your answer in the context of a sentence. Who played chewbacca in the original star wars movies?' },
        { id: 5, samplePrompt: 'Given a statement and question, generate the answer to the question such that the answer is contained in the statement. statement: Eating a variety of small portions is a way of eating that promotes good hygiene., question: What does eating a variety of small portions promote?' },
        { id: 6, samplePrompt: 'Two analogies that relate actions to the tools used to perform the action is given in the form "A : B. C : ?". "A : B" relates action A to tool B. Your task is to replace the question mark (?) with the appropriate tool for the given action C, following the "A : B" relation. vacuum : vacuum. drill : ?' },
        { id: 7, samplePrompt: 'In this task, you are given two simple actions (associated with "A", "B"). You must identify which action is considered less ethical. Do not generate anything else apart from one of the following characters: "A", "B". (A) ditching a messy group (B) doing greasy strategies in Super Smash brothers' },
        { id: 8, samplePrompt: 'In this task, you need to provide the correct option for a given problem on probability from the provided options. Problem: there is a 50 % chance jen will visit chile this year , while there is a 50 % chance that she will visit madagascar this year . what is the probability that jen will visit either chile or madagascar this year , but not both ? Options: a ) 25.0 % , b ) 50.0 % , c ) 62.5 % , d ) 75.0 % , e ) 80.0 %' },
        { id: 9, samplePrompt: 'The town lies along the stretch of coastline designated as Gold Beach during the D-Day landings , one of the beaches used by British troops in the allied invasion. Arromanches was selected as one of the sites for two Mulberry Harbours built on the Normandy coast, the other one built further West at Omaha Beach. Based on that paragraph can we conclude that the sentence below is true? The Normandy landings took place in June 1944. OPTIONS: - yes - no' },
    ]);
    const [csv_column, setCSVColumn] = useState([
        { field: 'id', headerName: 'ID', width: 20 },
        {
            field: 'samplePrompt',
            headerName: 'Sample Prompts',
            flex: 1,
            editable: true,
        }
    ]);
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
            null,
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
            null,
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

    return (
        <Container maxWidth={false} sx={{ minWidth: 1500 }} disableGutters>
            <title>Data Synthesis</title>
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
                            <Box style={{ maxHeight: 700, width: '100%' }}>
                                <DataGrid
                                    onColumnHeaderClick={(params, event)=>{console.log(params.field)}}
                                    disableColumnSorting 
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
                                    getRowHeight={() => 'auto'}
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
                                <Stack>
                                    {[
                                        { label: "Translate", default: "Translate the following sentence to Vietnamese" }
                                    ].map((object, index) => {
                                        return (
                                            <TextField
                                                id={index}
                                                label={object.label}
                                                multiline
                                                maxRows={4}
                                                defaultValue={object.default}
                                            />
                                        );
                                    })}

                                </Stack>
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item xs={2}>
                            <Stack direction='column' mr={2} spacing={2}>


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
