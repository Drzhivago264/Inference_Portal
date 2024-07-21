import { Divider, List, Typography } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext, WebSocketContext } from '../App.js'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { ChatBox } from '../component/chat_components/Chatbox.js';
import ChatInput from '../component/chat_components/ChatInput.js';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Footer from '../component/nav/Footer.js';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoadingButton from '@mui/lab/LoadingButton';
import { OpenAPIParameter } from '../component/chat_components/OpenaiParameters.js';
import Paper from '@mui/material/Paper';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { agentsocket } from '../component/websocket/AgentSocket';
import axios from 'axios';
import { baseDelete } from '../api_hook/baseDelete.js';
import { basePost } from '../api_hook/basePost.js';
import { basePut } from '../api_hook/basePut.js';
import { nanoid } from 'nanoid'
import { styled } from '@mui/material/styles';
import { useGetModel } from '../api_hook/useGetModel.js';
import { useGetRedirectAnon } from '../api_hook/useGetRedirectAnon.js';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const ChatPaper = styled(Paper)(({ theme }) => ({
    minWidth: 300,
    height: 500,
    overflow: 'auto',
    padding: theme.spacing(2),
    ...theme.typography.body2,
}));

function PromptWriting() {
    const navigate = useNavigate();

    const [instruct_change, setInstructChange] = useState(false)

    const [choosen_dataset, setChoosenDataset] = useState("Empty Dataset");

    const [loading, setLoading] = useState(false);
    const [savesuccess, setSaveSuccess] = useState(false);
    const [saveerror, setSaveError] = useState(false);
    const [saveerrormessage, setSaveErrorMessage] = useState('');
    const [deletesuccess, setDeleteSuccess] = useState(false);
    const [deleteerror, setDeleteError] = useState(false);
    const [deleteerrormessage, setDeleteErrorMessage] = useState('');
    const [dataset_list, setDatasetList] = useState([{name:  "Empty Dataset"}])
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [add_child_error, setAddChildError] = useState(false)
    const [add_parent_error, setAddParentError] = useState(false)
    const [is_save, setIsSaved] = useState(true)
    const [reload, setReload] = useState(false)
    const [max_parent_num, setMaxParentNum] = useState(null)
    const [max_child_num, setMaxChildNum] = useState(null)
    const [disable_save, setDisableSave] = useState(true)
    const [children_instruction_list, setChildInstructionList] = useState([
        { id: null, dislayed_name: "", instruct: "", unique: nanoid(), add: false },
    ])
    const { is_authenticated } = useContext(UserContext);
    useGetRedirectAnon(navigate, is_authenticated)

    const updateParentTemplate = (v, property) => {
        setInstructChange(true)
        const new_dataset_list = [...dataset_list]
        const new_template = { ...dataset_list[selectedIndex] }
        new_template[property] = v
        new_dataset_list[selectedIndex] = new_template
        setDatasetList(new_dataset_list)
        if (property == "name") {
            setChoosenDataset(v)
        }
    }
    const { mutate: templatepostemutate } = useMutation(basePost);
    const { mutate: templateputemutate } = useMutation(basePut);
    const submitTemplate = () => {
        setLoading(true)
        const data = {
            "parent_instruction": dataset_list[selectedIndex],
            "childrens": children_instruction_list
        }

        if (!dataset_list[selectedIndex]['id']) {
            templatepostemutate({ url: "/frontend-api/post-user-instruction", data: data },
                {
                    onSuccess: () => {
                        setReload(true)
                        setSaveSuccess(true)
                        setLoading(false)
                        setIsSaved(true)
                    }
                    ,
                    onError: (error) => {
                        setLoading(false)
                        setSaveError(true)
                        if (error.code === "ERR_BAD_RESPONSE") {
                            setSaveErrorMessage("Failed, Internal Server Error!")
                        }
                        else {
                            setSaveErrorMessage(error.response.data.detail)
                        }
                    }
                }
            )
            setDisableSave(true)
        }
        else {
            templateputemutate({ url: "/frontend-api/update-user-instruction", data: data },
                {
                    onSuccess: () => {
                        setSaveSuccess(true)
                        setLoading(false)
                        setIsSaved(true)
                    }
                    ,
                    onError: (error) => {
                        setLoading(false)
                        setSaveError(true)
                        if (error.code === "ERR_BAD_RESPONSE") {
                            setSaveErrorMessage("Failed, Internal Server Error!")
                        }
                        else {
                            setSaveErrorMessage(error.response.data.detail)
                        }
                    }
                })

            setDisableSave(true)
        }
    }
    const { mutate: templatedeletemutate } = useMutation(baseDelete);
    const deleteTemplate = (id) => {
        const data = {
            'id': id
        }
        templatedeletemutate({ url: "/frontend-api/delete-user-instruction", data: data },
            {
                onSuccess: () =>
                    setDeleteSuccess(true)
                ,
                onError: (error) => {
                    if (error.code === "ERR_BAD_RESPONSE") {
                        setSaveErrorMessage("Failed, Internal Server Error!")
                    }
                    else {
                        setDeleteErrorMessage(error.response.data.detail)
                    }
                }
            })
    }
    const handleTextFieldChange = (index, property, value) => {
        const new_children_instruction_list = [...children_instruction_list];
        const new_instruction = { ...children_instruction_list[index] };
        new_instruction[property] = value;
        new_children_instruction_list[index] = new_instruction;
        setChildInstructionList(new_children_instruction_list)
        updateParentTemplate(new_children_instruction_list, 'children')
    }
    const handleListItemClick = (event, index) => {
        if (!disable_save) {
            submitTemplate()
        }
        let default_child_instruction = []
        if (dataset_list[index]['children'] === null) {
            setChildInstructionList([{ id: null, name: "", instruct: "", unique: nanoid(), add: false }])
        }
        else {
            for (let c in dataset_list[index]['children']) {
                default_child_instruction.push({
                    'id': dataset_list[index]['children'][c]['id'],
                    'name': dataset_list[index]['children'][c]['name'],
                    'instruct': dataset_list[index]['children'][c]['instruct'],
                    'add': false
                })
            }
            setChildInstructionList(default_child_instruction)
        }
        setSelectedIndex(index);
    };
    const addParent = (operation) => {
        let length = dataset_list.length
        if (length < max_parent_num) {
            if (operation == "add") {
                setIsSaved(false)
                const new_dataset_list = [...dataset_list, {
                    id: null,
                    name: "",
                    instruct: "",
                    children: [{ id: null, name: "", instruct: "", unique: nanoid(), add: false }]
                }];
                setDatasetList(new_dataset_list)
                setChildInstructionList([])
                setSelectedIndex(dataset_list.length)
            }
            else if (operation == "delete") {
                setIsSaved(true)
                const new_dataset_list = [...dataset_list];
                const node_to_delete = dataset_list[selectedIndex]
                if (node_to_delete.id !== null) {
                    deleteTemplate(node_to_delete.id)
                    setDeleteSuccess(true)
                }
                new_dataset_list.splice(selectedIndex, 1);
                setDatasetList(new_dataset_list)
                if (new_dataset_list.length > 0) {
                    handleListItemClick(null, 0)
                    setDeleteSuccess(true)
                }
                else {
                    handleListItemClick(null, 0)
                    const new_dataset_list = [{ id: null, name: "", instruct: "", children: null }];
                    setDatasetList(new_dataset_list)
                    setChildInstructionList([
                        { id: null, name: ``, instruct: "", unique: nanoid(), add: false },
                    ])
                }
            }
        }
        else {
            setAddParentError(true)
            if (operation == "delete") {
                setIsSaved(true)
                const new_dataset_list = [...dataset_list];
                const node_to_delete = dataset_list[selectedIndex]
                if (node_to_delete.id !== null) {
                    deleteTemplate(node_to_delete.id)
                    setDeleteSuccess(true)
                }
                new_dataset_list.splice(selectedIndex, 1);
                setDatasetList(new_dataset_list)
                setAddParentError(false)
                handleListItemClick(null, 0)
            }
        }
    }
    const addChild = (operation, index) => {
        let length = children_instruction_list.length
        var node_to_delete = null;
        setReload(false)
        if (length < max_child_num) {
            setAddChildError(false)
            if (operation == "add") {
                const new_children_instruction_list = [...children_instruction_list, { id: null, name: ``, instruct: "", unique: nanoid(), add: false }];
                setChildInstructionList(new_children_instruction_list)
            }
            else if (operation == "delete") {
                const new_children_instruction_list = [...children_instruction_list];
                node_to_delete = children_instruction_list[index]
                new_children_instruction_list.splice(index, 1);
                setChildInstructionList(new_children_instruction_list)
                if (node_to_delete.id !== null) {
                    deleteTemplate(node_to_delete.id)
                    setDeleteSuccess(true)
                }
            }
        }
        else {
            setAddChildError(true)
            if (operation == "delete") {
                const new_children_instruction_list = [...children_instruction_list];
                node_to_delete = children_instruction_list[index]
                new_children_instruction_list.splice(-1);
                setChildInstructionList(new_children_instruction_list)
                setAddChildError(false)
                if (node_to_delete.id !== null) {
                    deleteTemplate(node_to_delete.id)
                    setDeleteSuccess(true)
                }
            }
        }
    }
    return (
        <Container maxWidth={false} sx={{ minWidth: 1200 }} disableGutters>
            <title>Templates</title>
            <ResponsiveAppBar max_width={false} />
            <Container maxWidth="xxl" >
                <Box m={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Paper sx={{ mr: 2 }} variant='outlined'>
                                <Typography m={1} variant='body1' sx={{ color: 'text.secondary' }}>
                                    Dataset
                                </Typography>
                                <List>
                                    {dataset_list.map((t, index) => {
                                        return (
                                            <ListItemButton sx={{ height: 38 }}
                                                key={index}
                                                selected={selectedIndex === index}
                                                onClick={(event) => handleListItemClick(event, index)}
                                            >
                                                <ListItemIcon>
                                                    {selectedIndex === index && <FolderOpenIcon />}
                                                    {selectedIndex !== index && <FolderIcon />}
                                                </ListItemIcon>
                                                <ListItemText primaryTypographyProps={{
                                                    fontWeight: 'medium',
                                                    variant: 'body2',
                                                    style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
                                                }} primary={t.name} />
                                            </ListItemButton>
                                        )
                                    })}
                                    <Box display="flex" justifyContent="center"
                                        alignItems="center">
                                        {add_parent_error && <Alert severity="warning">Reaching the maximum number of dataset ({max_parent_num}).</Alert>}
                                        {!add_parent_error && is_save &&
                                            <IconButton aria-label="add" onClick={() => { addParent("add") }}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        }
                                        {dataset_list.length > 1 && <IconButton aria-label="delete" onClick={() => { addParent("delete") }}>
                                            <DeleteIcon />
                                        </IconButton>}
                                    </Box>
                                </List>
                            </Paper>
                            <Box sx={{ mr: 2, mt: 2 }} >
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item xs={6}>
                            <Box mr={4}>
                                <Grid container>
                                    <Grid sm={12} md={8} item>
                                        <Typography ml={1} mb={1} mt={1} variant='body1'>
                                            Record
                                        </Typography>
                                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                            <Stack direction='column' spacing={2}>
                                                <TextField
                                                    label="Prompt"
                                                    multiline
                                                    minRows={6}
                                                    maxRows={8}
                                                    InputLabelProps={{ shrink: true }}
                                                    onChange={(e) => { updateParentTemplate(e.target.value, 'instruct'); setDisableSave(false) }}
                                                    inputProps={{ maxLength: 2500 }}
                                                />
                                                <TextField
                                                    label="Response"
                                                    multiline
                                                    minRows={6}
                                                    inputProps={{ maxLength: 2500 }}
                                                    InputLabelProps={{ shrink: true }}
                                                    fullWidth
                                                    maxRows={8}
                                                    onChange={(e) => { handleTextFieldChange("instruct", e.target.value); setDisableSave(false) }}
                                                />
                                            </Stack>
                                        </FormControl>
                                    </Grid>
                                    <Grid sm={12} md={4} item>
                                        <Typography ml={1} mb={1} mt={1} variant='body1'>
                                            Evaluation
                                        </Typography>
                                    </Grid>

                                </Grid>


                                <Box display="flex"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Box mr={1}>
                                        <LoadingButton size="small" loading={loading} disabled={disable_save} loadingPosition="end" variant="contained" onClick={submitTemplate} endIcon={<SaveIcon />}>Save</LoadingButton>
                                    </Box>
                                    {add_child_error && <Alert severity="warning">Reaching the maximum number of child ({max_child_num}).</Alert>}
                                    {!add_child_error && <IconButton aria-label="add" onClick={() => { addChild("add", null) }}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                    }
                                    {
                                        [
                                            { open: savesuccess, autoHideDuration: 3000, onClose: () => setSaveSuccess(false), severity: "success", message: "Saved!" },
                                            { open: saveerror, autoHideDuration: 6000, onClose: () => setSaveError(false), severity: "error", message: saveerrormessage },
                                            { open: deletesuccess, autoHideDuration: 3000, onClose: () => setDeleteSuccess(false), severity: "success", message: "Deleted!" },
                                            { open: deleteerror, autoHideDuration: 6000, onClose: () => setDeleteError(false), severity: "error", message: deleteerrormessage }
                                        ].map((item, index) => (
                                            <Snackbar
                                                key={index}
                                                open={item.open}
                                                autoHideDuration={item.autoHideDuration}
                                                onClose={item.onClose}
                                            >
                                                <Alert
                                                    severity={item.severity}
                                                    sx={{ width: '100%' }}
                                                >
                                                    {item.message}
                                                </Alert>
                                            </Snackbar>
                                        ))
                                    }
                                </Box>

                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item xs={4}>
                            <Typography mt={1} mb={1} variant='body1'>
                                Dataset
                            </Typography>

                        </Grid>
                    </Grid>
                </Box >
            </Container >
            <Footer />
        </Container >
    );
}
export default PromptWriting;