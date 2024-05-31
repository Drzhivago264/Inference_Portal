import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ResponsiveAppBar from '../component/navbar';
import { ChatParameter } from '../component/chatroom_parameters';
import { ChatBox } from '../component/chatbox';
import { chatsocket } from '../component/chatsocket';
import { ChatExport } from '../component/chat_export';
import Footer from '../component/footer';
import { Typography } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
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
    const [root_node, setRootNode] = useState(null);
    const [default_expand_node, setDefaultExpandNode] = useState([])
    const [total_node, setTotalNode] = useState(null)
    const treeify = (list, idAttr, parentAttr, childrenAttr) => {
        if (!idAttr) idAttr = 'id';
        if (!parentAttr) parentAttr = 'parent';
        if (!childrenAttr) childrenAttr = 'children';

        var treeList = [];
        var nodeidList = []
        var lookup = {};
        list.forEach(function (obj) {
            lookup[obj[idAttr]] = obj;
            obj[childrenAttr] = [];
            nodeidList.push(obj[idAttr].toString())
        });
        list.forEach(function (obj) {
            if (obj[parentAttr] != null) {
                if (lookup[obj[parentAttr]] !== undefined) {
                    lookup[obj[parentAttr]][childrenAttr].push(obj);
                } else {
                    treeList.push(obj);
                }
            } else {
                treeList.push(obj);
            }
        });
        return [treeList, nodeidList];
    };
    const getnextnode = (event, value) => {
        axios.all([
            axios.get(`/frontend-api/memory-tree?page=${value}`),
        ]).then(axios.spread((memory_object) => {
            if (memory_object.status != 204) {
                var make_tree = treeify(memory_object.data.results)
                setRootNode(make_tree[0])
                setDefaultExpandNode(make_tree[1])
                if (memory_object.data.count) {
                    setTotalNode(memory_object.data.count)
                }
            }

        }))
            .catch(error => {
                console.log(error);
            });
    };

    const refresh_tree = () => {
        axios.all([
            axios.get(`/frontend-api/memory-tree`),
        ]).then(axios.spread((memory_object) => {
            if (memory_object.status != 204) {
                var make_tree = treeify(memory_object.data.results)
                setRootNode(make_tree[0])
                setDefaultExpandNode(make_tree[1])
                if (memory_object.data.count) {
                    setTotalNode(memory_object.data.count)
                }
            }

        }))
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        axios.all([
            axios.get('/frontend-api/model'),
            axios.get('/frontend-api/memory-tree'),
        ])
            .then(axios.spread((model_object, memory_object) => {
                setModels(model_object.data.models);
                setAgents(model_object.data.models_agent);
                if (memory_object.status != 204) {
                    var make_tree = treeify(memory_object.data.results)
                    setRootNode(make_tree[0])
                    setDefaultExpandNode(make_tree[1])
                    if (memory_object.data.count) {
                        setTotalNode(memory_object.data.count)
                    }
                }
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
        websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + socket_destination + url[url.length - 1] + '/' + timeZone + '/');
        chatsocket(websocket, setChatMessage, setThinking, document)
    }, []);

    useEffect(() => {
        websocket.current.close()
        websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + socket_destination + url[url.length - 1] + '/' + timeZone + '/');
        chatsocket(websocket, setChatMessage, setThinking, document)
    }, [socket_destination]);

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

    const RecursiveMemoryTree = ({ data }) => {
        return (
            <SimpleTreeView
                defaultExpandedItems={default_expand_node}
                aria-label="file system navigator"
                sx={{ maxHeight: 700, flexGrow: 1, maxWidth: 600, overflowY: 'auto' }}
            >
                {data.map((parent) => {
                    return (
                        <TreeItem key={parent.id.toString()} itemId={parent.id.toString()} label={new Date(parent.created_at).toString()}>
                            <Paper>
                                <Typography sx={{ wordBreak: "break-word" }} pl={1} pr={1} pt={1} variant='body2'> {"Prompt: " + parent.prompt} </Typography>
                                <Typography sx={{ wordBreak: "break-word" }} pl={1} pr={1} pb={1} variant='body2'>{"Response: " + parent.response} </Typography>
                            </Paper>
                            {parent.children && <RecursiveMemoryTree data={parent.children} />}
                        </TreeItem>
                    );
                })}
            </SimpleTreeView>
        );
    };
    return (
        <Container maxWidth={false} sx={{ minWidth: 1200 }} disableGutters>
            <title>Chat</title>
            <ResponsiveAppBar />
            <Container maxWidth="xl" sx={{ minWidth: 1200 }}>
                <Box m={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>

                            <Typography mt={1} mb={1} variant='body1'>
                                Memory Tree
                                <IconButton aria-label="fingerprint" color="info" size="small" onClick={refresh_tree}>
                                    <RefreshIcon fontSize="small" />
                                </IconButton>
                            </Typography>
                            <Alert severity="info">
                                The memory tree includes all ancestors for a given prompt. <br></br>
                                You can travel left or right to periodically move to the next prompt.<br></br>
                                Click on refresh button to fletch the latest prompt.<br></br>
                            </Alert>

                            {root_node && <RecursiveMemoryTree data={root_node} />}
                            {!root_node &&
                                <Typography variant='body2'>
                                    There is no memory yet.
                                </Typography>
                            }
                            {total_node && root_node &&
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    m={1}

                                > <Pagination count={total_node} showFirstButton showLastButton onChange={getnextnode} />
                                </Box>}
                        </Grid>
                        <Grid item xs={6}>
                            <ChatBox
                                inputsize={660}
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
                        <Grid item xs={2}>
                            <Box mb={3}>
                                <ChatExport
                                    chat_message={chat_message}
                                    choosen_export_format_chatlog={choosen_export_format_chatlog}
                                    setChoosenExportFormatChatLog={setChoosenExportFormatChatLog}
                                    number_of_remove_message={1}
                                >
                                </ChatExport>
                            </Box>
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
