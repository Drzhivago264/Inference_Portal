import {
    DataGrid,
    GridCellEditStopReasons,
} from '@mui/x-data-grid';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext, WebSocketContext } from '../App.js'
import { isKeyboardEvent, multilineColumn } from '../component/custom_ui_component/MultipleLineEdittingDataGrid.js';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CsvFileInput from '../component/import_export/CsvInput.js';
import { DatasetExport } from '../component/import_export/datasetExport.js';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../component/nav/Footer.js';
import { FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import { LogBox } from '../component/chat_components/LogBox.js';
import MenuItem from '@mui/material/MenuItem';
import { OpenAPIParameter } from '../component/chat_components/OpenaiParameters.js';
import Paper from '@mui/material/Paper';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { datasynthesissocket } from '../component/websocket/DataSynthesisSocket.js';
import { redirect_anon_to_login } from '../component/checkLogin.js';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const ChatInput = styled(TextField)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
}));

function DataSynthesis() {

    const { websocket, agent_websocket, chat_websocket, websocket_hash } = useContext(WebSocketContext);
    const [chat_message, setChatMessage] = useState([]);
    const messagesEndRef = useRef(null)
    const [choosen_prompt_column, setChoosenPromptColumn] = useState("samplePrompt");
    const [agent_objects, setAgents] = useState([]);
    const [choosen_model, setChoosenModel] = useState("gpt-4");
    const [top_p, setTopp] = useState(0.72);
    const [max_tokens, setMaxToken] = useState(null);
    const [temperature, setTemperature] = useState(0.73);
    const [presencepenalty, setPresencePenalty] = useState(0);
    const [frequencypenalty, setFrequencyPenalty] = useState(0);
    const [shownthinking, setThinking] = useState(false);
    const [max_turn, setMaxTurn] = useState(null)
    const [socket_destination, setSocketDestination] = useState("/ws/engineer-async/");
    const [filename, setFileName] = useState("No file loaded")
    const [default_parent_instruct, setParentInstruct] = useState("You are a Prompt Writer, you need to rewrite a given prompt following the instruction to produce a more complex version, you must directly provide the #Rewritten Prompt# and must not repeat the #Given Prompt#. You cannot omit the non-text parts such as the table and code in #Given Prompt#.\nInstruction:\n");
    const [default_extra_instruct, setExtraInstruct] = useState("Do not make #Rewritten Prompt# become verbose, #Rewritten Prompt# can only add 10 to 20 words into #Given Prompt#. You must not repeat the #Given Prompt#, #Given Prompt# must not appear in your answer.")

    const [default_child_instruct_list, setDefaultChildInstructList] = useState([
        { label: "Translating", default: "The #Rewritten Prompt# must be written in Vietnamese." },
        { label: "Concretizing", default: "Replace general concepts in the #Given Prompt# with more specific concepts." },
        { label: "Increased Reasoning Steps", default: "If #Given Prompt# can be solved with just a few simple thinking processes, you can rewrite it to explicitly request multiple-step reasoning." },
        { label: "Complicate Input", default: "You SHOULD complicate the given prompt using the following method:\nAdd one more constraints/requirements into #Given Prompt#" },
        { label: "Deepening", default: "If #Given Prompt# contains inquiries about certain issues, the depth and breadth of the inquiry can be increased." },
        { label: "Breadth Evolving", default: "You should draw inspiration from the #Given Prompt# to create a brand new prompt.\nThis new prompt should belong to the same domain as the #Given Prompt# but be even more rare.\nThe LENGTH and difficulty level of the #Created Prompt# should be similar to that of the #Given Prompt#." }
    ]);
    
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    const [csv_row, setCSVRow] = useState([
        { id: 1, samplePrompt: 'A water well is an excavation or structure created in the ground by digging, driving, boring, or drilling to access groundwater in underground aquifers. The well water is drawn by a pump, or using containers, such as buckets, that are raised mechanically or by hand. Wells were first constructed at least eight thousand years ago and historically vary in construction from a simple scoop in the sediment of a dry watercourse to the stepwells of India, the qanats of Iran, and the shadoofs and sakiehs of India. Placing a lining in the well shaft helps create stability and linings of wood or wickerwork date back at least as far as the Iron Age. Where does water for a well come from?' },
        { id: 2, samplePrompt: 'Generate short a sentence that can be linguistically classified as acceptable (OPTIONS: - unacceptable - acceptable)' },
        { id: 3, samplePrompt: 'Is the premise "The Chocolate Lab jumps too late to get the toy as the Black Lab captures it in the driveway." true if "The Chocolate Labe got the toy."? OPTIONS: - yes - it is not possible to tell - no' },
        { id: 4, samplePrompt: 'In this task, you are given an open-domain question. Your task is to provide an answer to the given question. There is only one unique answer for each question. Your answer should be short, and refer to an entity, date, number, etc. Do not put your answer in the context of a sentence. Who played chewbacca in the original star wars movies?' },
        { id: 5, samplePrompt: 'Given a statement and question, generate the answer to the question such that the answer is contained in the statement. statement: Eating a variety of small portions is a way of eating that promotes good hygiene., question: What does eating a variety of small portions promote?' },
        { id: 6, samplePrompt: 'Two analogies that relate actions to the tools used to perform the action is given in the form "A : B. C : ?". "A : B" relates action A to tool B. Your task is to replace the question mark (?) with the appropriate tool for the given action C, following the "A : B" relation. vacuum : vacuum. drill : ?' },
    ]);
    const row_ref = useRef(csv_row)
    const [from_row, setFromRow] = useState(0)
    const [to_row, setToRow] = useState(10000)
    const [is_running, setIsRunning] = useState(null);
    const is_running_ref = useRef(is_running)
    const column_ref = useRef(csv_column)
    const [csv_column, setCSVColumn] = useState([
        { field: 'id', headerName: 'ID', width: 20 },
        {
            field: 'samplePrompt',
            headerName: 'Sample Prompts',
            width: 350,
            editable: true,
            disableColumnMenu: true,
            ...multilineColumn,
        }
    ]);
    const handleFileLoad = (csvData) => {
        setCSVRow(csvData);
        if (csvData[0]) {
            var keys = Object.keys(csvData[0])
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
            setChoosenPromptColumn(keys[1])
        }
    };

    const navigate = useNavigate();
    const { is_authenticated} = useContext(UserContext);

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
            websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + '/ws/data-synthesis/' + websocket_hash + '/' + timeZone + '/');
        }
    }, [socket_destination, websocket_hash]);

    useEffect(() => {
        row_ref.current = csv_row
    }, [csv_row]);
    useEffect(() => {
        column_ref.current = csv_column
    }, [column_ref]);
    useEffect(() => {
        is_running_ref.current = is_running
        if (!is_running) {
            setThinking(false)
        }
    }, [is_running]);

    useEffect(() => {
        if (websocket_hash) {
            datasynthesissocket(websocket, setChatMessage, setCSVColumn, setCSVRow, genSubmit, submitSeed, setThinking, setIsRunning, row_ref, column_ref, is_running_ref)
        }
    }, [default_child_instruct_list, default_extra_instruct, default_parent_instruct, row_ref, column_ref, is_running_ref, choosen_model, choosen_prompt_column, websocket_hash]);

    const submitSeed = (seed_prompt, row_no) => {
        var data = {
            'row_no': row_no,
            'seed_prompt': seed_prompt,
            'child_instruction_list': default_child_instruct_list,
            'parent_instruction': default_parent_instruct,
            'optional_instruction': default_extra_instruct,
            'choosen_model': choosen_model,
            'top_p': top_p,
            'max_tokens': max_tokens,
            'frequency_penalty': frequencypenalty,
            'presence_penalty': presencepenalty,
            'temperature': temperature,
        }
        websocket.current.send(JSON.stringify(data))
        setThinking(true)
    }
    const updateChildInstructList = (value, index_) => {
        const new_child_instruct_list = default_child_instruct_list.map((instruct, index) => {
            if (index === index_) {
                return {
                    ...instruct,
                    default: value,
                }
            }
            else {
                return instruct
            }

        });
        setDefaultChildInstructList(new_child_instruct_list);
    }
    const delete_child_instruct = (index_) => {
        setDefaultChildInstructList(
            default_child_instruct_list.filter((instruct, index) =>
                index !== index_
            )
        )
    }
    const add_child_instruct = () => {
        if (default_child_instruct_list.length <= 10) {
            setDefaultChildInstructList(
                [
                    ...default_child_instruct_list,
                    { label: "User Defined", default: "" }
                ]
            );
        }
    }

    function* submitLoop() {
        for (let i in csv_row) {
            yield [csv_row[i][`${choosen_prompt_column}`], csv_row[i]['id']]
        }
    }
    const genSubmit = useRef(submitLoop())
    const startSubmit = () => {
        var next_value = genSubmit.current.next()
        submitSeed(next_value.value[0], next_value.value[1])
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
                                    <CsvFileInput
                                        onFileLoad={handleFileLoad}
                                        filename={filename}
                                        setFileName={setFileName}
                                        from_row={from_row}
                                        to_row={to_row}
                                        setFromRow={setFromRow}
                                        setToRow={setToRow}
                                    />
                                </Box>
                            </Paper>
                            <Paper sx={{ m: 2 }} variant='outlined'>
                                <Box m={1}>
                                    <Typography sx={{ color: 'text.secondary' }}>Run</Typography>
                                </Box>
                                <Divider />
                                <Box m={2}>
                                    <Box mb={1}>
                                        <FormControl fullWidth>
                                            <InputLabel id="seed-prompt">Seed Prompt</InputLabel>
                                            <Select
                                                labelId="seed-prompt"
                                                onChange={e => setChoosenPromptColumn(e.target.value)}
                                                value={choosen_prompt_column}
                                                label="Seed Prompt"
                                                size="small"

                                            >
                                                {csv_column.map((column) => {
                                                    return (
                                                        <MenuItem key={column.field} value={column.field}>{column.field}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Stack direction={'row'} spacing={1}>
                                        <LoadingButton loadingPosition="start" loading={shownthinking} color="success" fullWidth variant="contained" onClick={() => { startSubmit(), setIsRunning(true) }} startIcon={<PlayCircleOutlineIcon />} disabled={is_running ? true : false} >
                                            Run
                                        </LoadingButton>
                                        <Button color="secondary" fullWidth variant="contained" onClick={() => { setIsRunning(false)}} startIcon={<PauseCircleOutlineIcon />} disabled={!is_running ? true : false}>Pause</Button>
                                    </Stack>
                                </Box>
                            </Paper>
                            <Paper sx={{ m: 2 }} variant='outlined'>
                                <Box m={1}>
                                    <Typography sx={{ color: 'text.secondary' }}>Dataset Export</Typography>
                                </Box>
                                <Divider />
                                <Box mb={2} mt={2} ml={1} mr={2}>
                                    <DatasetExport
                                        data={csv_row}
                                        filename={`Processed_${filename}_from_${from_row}_to_${to_row}`}
                                    >
                                    </DatasetExport>

                                </Box>
                            </Paper>
                            <LogBox chat_message={chat_message} messagesEndRef={messagesEndRef}/>
                        </Grid>

                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item xs={5}>
                            <div style={{ height: 875, width: '100%' }}>
                                <DataGrid
                                    disableColumnSorting
                                    disableAutosize
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
                                    getEstimatedRowHeight={() => 100}
                                    onCellEditStop={(params, event) => {
                                        if (params.reason !== GridCellEditStopReasons.enterKeyDown) {
                                            return;
                                        }
                                        if (isKeyboardEvent(event) && !event.ctrlKey && !event.metaKey) {
                                            event.defaultMuiPrevented = true;
                                        }
                                    }}

                                />
                            </div>

                        </Grid>
                        <Grid item xs={3}>
                            <Box mr={2}>
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
                                            <ChatInput
                                                id="parent-instruct"
                                                multiline
                                                maxRows={6}
                                                value={default_parent_instruct}
                                                onChange={e => { setParentInstruct(e.target.value) }}
                                                variant="standard"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">   </InputAdornment>,
                                                }}
                                            />
                                        </Paper>
                                    </AccordionDetails>
                                </Accordion>
                                <Box mt={1} mb={1}>
                                    <Paper variant='outlined'>
                                        <Box p={1}>
                                            <Typography sx={{ color: 'text.secondary' }} variant='body1'>Evolving Instructions</Typography>
                                        </Box>
                                        <Divider />
                                        <Box
                                            justifyContent="center"
                                            alignItems="center"

                                            sx={{

                                                height: 522,
                                                overflow: "hidden",
                                                overflowY: "scroll"
                                            }}>
                                            <Stack ml={2} mt={2} mb={2} mr={1} spacing={2}>
                                                {default_child_instruct_list && default_child_instruct_list.map((object, index) => {
                                                    return (
                                                        <Grid key={object.label} container>
                                                            <Grid item xs={11}>
                                                                <TextField
                                                                    id={index}
                                                                    label={object.label}
                                                                    multiline
                                                                    maxRows={4}
                                                                    defaultValue={object.default}
                                                                    onChange={(e) => { updateChildInstructList(e.target.value, index) }}
                                                                    fullWidth
                                                                />
                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                <IconButton aria-label="delete" onClick={() => { delete_child_instruct(index) }}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    );
                                                })}
                                                {default_child_instruct_list.length < 10 && <Box display="flex" justifyContent="center"
                                                    alignItems="center" >
                                                    <IconButton aria-label="add" onClick={() => { add_child_instruct() }}>
                                                        <AddCircleOutlineIcon />
                                                    </IconButton>
                                                </Box>}
                                            </Stack>
                                        </Box>
                                    </Paper>
                                </Box>
                                <Accordion >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="parent-content"
                                        id="parent-header"
                                    >
                                        <Typography sx={{ color: 'text.secondary' }}>Extra Instruction (optional)</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails >
                                        <Paper variant="outlined">
                                            <ChatInput
                                                id="extra-instruct"
                                                multiline
                                                maxRows={4}
                                                value={default_extra_instruct}
                                                onChange={e => { setExtraInstruct(e.target.value)}}
                                                variant="standard"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">   </InputAdornment>
                                                }}
                                            />

                                        </Paper>
                                    </AccordionDetails>
                                </Accordion>
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
export default DataSynthesis;
