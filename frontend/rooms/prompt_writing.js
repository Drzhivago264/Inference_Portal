import { Divider, List, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Footer from '../component/nav/Footer.js';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { UserContext } from '../App.js'
import { baseDelete } from '../api_hook/baseDelete.js';
import { basePost } from '../api_hook/basePost.js';
import { basePut } from '../api_hook/basePut.js';
import { useGetRedirectAnon } from '../api_hook/useGetRedirectAnon.js';
import { useGetUserDataset } from '../api_hook/useGetUserDataset.js';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

function PromptWriting() {
    const navigate = useNavigate();
    const [instruct_change, setInstructChange] = useState(false)
    const [current_system_prompt, setCurrentSystemPrompt] = useState("")
    const [current_evaluation, setCurrentEvaluation] = useState([{ evaluation_name: "Score", score: null }])
    const [current_prompt, setCurrentPrompt] = useState("")
    const [current_response, setCurrentResponse] = useState("")
    const [current_record_id, setCurrentRecordId] = useState(null)
    const [allow_save_dataset, setAllowSaveDataset] = useState(false)
    const [allow_save_record, setAllowSaveRecord] = useState(false)
    const [loading, setLoading] = useState(false);
    const [savesuccess, setSaveSuccess] = useState(false);
    const [saveerror, setSaveError] = useState(false);
    const [saveerrormessage, setSaveErrorMessage] = useState('');
    const [deletesuccess, setDeleteSuccess] = useState(false);
    const [deleteerror, setDeleteError] = useState(false);
    const [deleteerrormessage, setDeleteErrorMessage] = useState('');
    const [dataset_list, setDatasetList] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [add_child_error, setAddChildError] = useState(false)
    const [add_parent_error, setAddParentError] = useState(false)
    const [allow_add_dataset, setAllowAddDataset] = useState(true)

    const [max_dataset_num, setMaxDatasetNum] = useState(10)

    const [disable_save, setDisableSave] = useState(true)
 
    const { is_authenticated } = useContext(UserContext);
    useGetRedirectAnon(navigate, is_authenticated)


    const handleDatasetChange = (v, property) => {
        if (property !== 'id') {
            setAllowSaveDataset(true)
        }
        setInstructChange(true)
        const new_dataset_list = [...dataset_list]
        const new_template = { ...dataset_list[selectedIndex] }
        new_template[property] = v
        new_dataset_list[selectedIndex] = new_template
        setDatasetList(new_dataset_list)
    }

    const updateEvaluationValue = (v, property, index) => {

        const new_evaluation_list = [...current_evaluation]
        const new_evaluation = { ...new_evaluation_list[index] }
        new_evaluation[property] = v
        new_evaluation_list[index] = new_evaluation
        setCurrentEvaluation(new_evaluation_list)

    }
    const { mutate: postmutate } = useMutation(basePost);
    const { mutate: putmutate } = useMutation(basePut);
    const saveDataset = () => {
        setLoading(true)
        const dataset = dataset_list[selectedIndex]
        if (!dataset.id) {
            const data = {
                'name': dataset.name
            }
            postmutate({ url: "/frontend-api/create-dataset", data: data }, {
                onSuccess: (data) => {
                    setSaveSuccess(true)
                    setAllowAddDataset(true)
                    handleDatasetChange(data.id, 'id')
                    setAllowSaveDataset(false)
                }
            }
            )
        }
        else {
            const data = {
                'id': dataset.id,
                'new_name': dataset.name
            }
            putmutate({ url: "/frontend-api/update-dataset", data: data }, {
                onSuccess: () => {
                    setSaveSuccess(true)
                    setAllowAddDataset(true)
                    setAllowSaveDataset(false)
                },
                onError: (error) => {
                    setSaveError(true)
                    if (error.code === "ERR_BAD_RESPONSE") {
                        setSaveErrorMessage("Failed, Internal Server Error!")
                    }
                    else {
                        setSaveErrorMessage(error.response.data.detail)
                    }
                }
            })
        }
        setLoading(false)
    }

    const { mutate: deletemutate } = useMutation(baseDelete);
    const deleteReq = (id) => {
        const data = {
            'id': id
        }
        deletemutate({ url: "/frontend-api/delete-dataset", data: data },
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

    const saveRecord = () => {
        setLoading(true)
        const dataset = dataset_list[selectedIndex]
        if (!dataset.id) {
            saveDataset()
        }
        const current_evaluation_without_null = []
        for (let i in current_evaluation) {
            if (current_evaluation[i].evaluation_name && current_evaluation[i].score) {
                current_evaluation_without_null.push(current_evaluation[i])
            }
        }
        if (current_prompt && current_response && current_system_prompt) {
            if (!current_record_id) {

                const data = {
                    'dataset_id': dataset.id,
                    'prompt': current_prompt,
                    'response': current_response,
                    'system_prompt': current_system_prompt,
                    'evaluation': current_evaluation_without_null
                }
                postmutate({ url: "/frontend-api/create-record", data: data }, {
                    onSuccess: (data) => {
                        setSaveSuccess(true)
                        setAllowSaveRecord(false)
                        handleDatasetChange(data.id, 'id')
                        setAllowSaveDataset(false)
                    }
                }
                )
            }
            else {
                const data = {
                    'record_id': current_record_id,
                    'dataset_id': dataset.id,
                    'prompt': current_prompt,
                    'response': current_response,
                    'system_prompt': current_system_prompt,
                    'evaluation': current_evaluation_without_null
                }
                putmutate({ url: "/frontend-api/update-record", data: data }, {
                    onSuccess: () => {
                        setAllowSaveRecord(false)
                        setSaveSuccess(true)
                        setAllowAddDataset(true)
                        setAllowSaveDataset(false)
                    },
                    onError: (error) => {
                        setSaveError(true)
                        if (error.code === "ERR_BAD_RESPONSE") {
                            setSaveErrorMessage("Failed, Internal Server Error!")
                        }
                        else {
                            setSaveErrorMessage(error.response.data.detail)
                        }
                    }
                })
            }
        }
        else {
            setSaveErrorMessage("Field is empty!")
        }
        setLoading(false)
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const deleteDataset = () => {
        setAllowAddDataset(true)
        const new_dataset_list = [...dataset_list];
        const node_to_delete = dataset_list[selectedIndex]
        if (node_to_delete.id !== null) {
            deleteReq(node_to_delete.id)
            setDeleteSuccess(true)
        }
        if (new_dataset_list.length > 1) {
            setDatasetList(prev => {
                return prev.filter((obj, i) => i !== selectedIndex)
            })
            setDeleteSuccess(true)
        }
        else {
            const new_dataset_list = [{ id: null, name: "Empty Template" }];
            setDatasetList(new_dataset_list)
        }
    }

    const addDataset = () => {
        let length = dataset_list.length
        if (length < max_dataset_num) {
            setAllowAddDataset(false)
            const new_dataset_list = [...dataset_list, {
                id: null,
                name: "",
            }];
            setDatasetList(new_dataset_list)
            setSelectedIndex(dataset_list.length)
        }
    }
    const addEvaluation = () => {
        let length = current_evaluation.length
        if (length < max_dataset_num) {
            const new_evaluation = [...current_evaluation, {
                evaluation_name: null,
                score: null,
            }];
            setCurrentEvaluation(new_evaluation)
        }
    }
    const deleteEvaluation = (index) => {
        setCurrentEvaluation(prev => {
            return prev.filter((obj, i) => i !== index)
        })
    }


    useGetUserDataset(setDatasetList, setMaxDatasetNum)
    return (
        <Container maxWidth={false} sx={{ minWidth: 1200 }} disableGutters>
            <title>Dataset</title>
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
                                            <ListItem
                                                key={t.id}
                                                disablePadding
                                            >
                                                <ListItemButton sx={{ height: 38 }}
                                                    selected={selectedIndex === index}
                                                    onClick={(event) => handleListItemClick(event, index)}
                                                >
                                                    <ListItemIcon >
                                                        {selectedIndex === index && <FolderOpenIcon />}
                                                        {selectedIndex !== index && <FolderIcon />}
                                                    </ListItemIcon>
                                                    <ListItemText primaryTypographyProps={{
                                                        fontWeight: 'medium',
                                                        variant: 'body2',
                                                        style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
                                                    }} primary={<TextField id="outlined-basic" defaultValue={t.name} size='small' variant="standard"
                                                        onChange={(e) => handleDatasetChange(e.target.value, 'name')} />} />
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    })}
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        mt={1}>
                                        {add_parent_error && <Alert severity="warning">Reaching the maximum number of dataset ({max_dataset_num}).</Alert>}
                                        {!add_parent_error && allow_add_dataset && dataset_list.length < max_dataset_num &&
                                            <IconButton aria-label="add" onClick={() => { addDataset() }}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        }
                                        {dataset_list.length > 1 && <IconButton aria-label="delete" onClick={() => { deleteDataset() }}>
                                            <DeleteIcon />
                                        </IconButton>}
                                        <Box mr={1}>
                                            <LoadingButton size="small" disabled={!allow_save_dataset} loading={loading} loadingPosition="end" variant="contained" onClick={() => saveDataset()} endIcon={<SaveIcon />}>Save Dataset</LoadingButton>
                                        </Box>
                                    </Box>
                                </List>
                            </Paper>
                            <Box sx={{ mr: 2, mt: 2 }} >
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item xs={6}>
                            <Box mr={4}>
                                <Grid container spacing={1}>
                                    <Grid sm={12} md={8} item>
                                        <Typography ml={1} mb={1} mt={1} variant='body1'>
                                            Record
                                        </Typography>
                                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                            <Stack direction='column' spacing={2}>
                                                <TextField
                                                    label="System Prompt"
                                                    multiline
                                                    minRows={4}
                                                    maxRows={6}
                                                    InputLabelProps={{ shrink: true }}
                                                    onChange={(e) => { setCurrentSystemPrompt(e.target.value); setAllowSaveDataset(true) }}
                                                    inputProps={{ maxLength: 2500 }}
                                                />
                                                <TextField
                                                    label="Prompt"
                                                    multiline
                                                    minRows={6}
                                                    maxRows={8}
                                                    InputLabelProps={{ shrink: true }}
                                                    onChange={(e) => { setCurrentPrompt(e.target.value); setAllowSaveRecord(true) }}
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
                                                    onChange={(e) => { setCurrentResponse(e.target.value); setAllowSaveRecord(true) }}
                                                />
                                            </Stack>
                                        </FormControl>
                                    </Grid>
                                    <Grid sm={12} md={4} item>
                                        <Typography ml={1} mb={1} mt={1} variant='body1'>
                                            Evaluation
                                        </Typography>

                                        <Stack spacing={1}>
                                            {current_evaluation.map((ev, index) => {
                                                return (
                                                    <Grid key={ev.evaluation_name} container spacing={1}>
                                                        <Grid sm={12} md={8} item>
                                                            <TextField
                                                                id="eval-name"
                                                                size='small'
                                                                label="Name"
                                                                onChange={(e) => { updateEvaluationValue(e.target.value, "evaluation_name", index); setAllowSaveRecord(true) }}
                                                                value={ev.evaluation_name}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid sm={11} md={3} item>
                                                            <TextField
                                                                id="eval-number"
                                                                size='small'
                                                                label={ev.evaluation_name}
                                                                value={ev.score}
                                                                onChange={(e) => { updateEvaluationValue(e.target.value, "score", index); setAllowSaveRecord(true) }}
                                                                type="number"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid sm={1} md={1} item>
                                                            <IconButton aria-label="delete" onClick={() => { deleteEvaluation(index); setAllowSaveRecord(true) }}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            }
                                            )}
                                        </Stack>
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            mt={1}>
                                            {current_evaluation.length < max_dataset_num &&
                                                <IconButton aria-label="add" onClick={() => { addEvaluation(); setAllowSaveRecord(true)}}>
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                            }
                                        </Box>

                                    </Grid>

                                </Grid>
                                <Box display="flex"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Box mr={1}>
                                        <LoadingButton size="small" loading={loading} disabled={!allow_save_record} loadingPosition="end" variant="contained" onClick={() => { saveRecord() }} endIcon={<SaveIcon />}>Save</LoadingButton>
                                    </Box>


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