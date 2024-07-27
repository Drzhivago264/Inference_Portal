import { Divider, List, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
    DataGrid
} from '@mui/x-data-grid';
import { DatasetExportServerSide } from '../component/import_export/DatasetExportServerSide.js';
import DatasetMutateDialog from '../component/dialog/DatasetMutateDialog.js';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Footer from '../component/nav/Footer.js';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
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
import { useGetUserDatasetRecord } from '../api_hook/useGetUserDatasetRecord.js';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

function PromptWriting() {
    const navigate = useNavigate();
    const [dataset_row, setDatasetRow] = useState([]);
    const [dataset_column, setDatasetColumn] = useState([]);
    const [record_list, setRecordList] = useState([])
    const [pagnation_page, setPaginationPage] = useState(1)
    const [next_pagnation, setNextPaginationPage] = useState(null)
    const [previous_pagnation, setPreviousPaginationPage] = useState(null)
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [current_system_prompt, setCurrentSystemPrompt] = useState("")
    const [current_evaluation, setCurrentEvaluation] = useState([{ evaluation_name: "", score: "" }])
    const [current_prompt, setCurrentPrompt] = useState("")
    const [current_response, setCurrentResponse] = useState("")
    const [current_system_prompt_error, setCurrentSystemPromptError] = useState(false)
    const [current_prompt_error, setCurrentPromptError] = useState(false)
    const [current_response_error, setCurrentResponseError] = useState(false)
    const [current_record_id, setCurrentRecordId] = useState(null)
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
    const [allow_add_dataset, setAllowAddDataset] = useState(true)
    const [max_dataset_num, setMaxDatasetNum] = useState(10)
    const [max_evaluation_num, setMaxEvaluationNum] = useState(10)

    const { is_authenticated } = useContext(UserContext);
    useGetRedirectAnon(navigate, is_authenticated)

    const navigatePagination = (direction) => {
        var new_pagnation_page = pagnation_page
        if (direction === "next" && next_pagnation) {
            new_pagnation_page += 1
        }
        else if (direction === "previous" && previous_pagnation) {
            new_pagnation_page -= 1
        }
        setPaginationPage(new_pagnation_page)
    }
    const navigateRow = (direction) => {
        let old_row_id = rowSelectionModel;
        let new_row = null;

        if (typeof rowSelectionModel !== "number") {
            if (direction === "next") {
                new_row = dataset_row[0];
            } else if (direction === "previous") {
                new_row = dataset_row[dataset_row.length - 1];
            }
        } else {
            for (let i = 0; i < dataset_row.length; i++) {
                if (dataset_row[i].id === old_row_id) {
                    new_row = dataset_row[i + (direction === "next" ? 1 : -1)] || dataset_row[direction === "next" ? 0 : dataset_row.length - 1];
                    break;
                }
            }
        }
        setRowSelectionModel(new_row.id);
        setCurrentRecordId(new_row.id);
        setCurrentPrompt(new_row.prompt);
        setCurrentResponse(new_row.response);
        setCurrentSystemPrompt(new_row.system_prompt);
        for (let i = 0; i < record_list.results.record_serializer.length; i++) {
            if (record_list.results.record_serializer[i].id === new_row.id) {
                setCurrentEvaluation(record_list.results.record_serializer[i].evaluation);
                break;
            }
        }
    }
    const updateEvaluationValue = (v, property, index) => {
        const new_evaluation_list = current_evaluation.map((item, i) => {
            if (i === index) {
                return { ...item, [property]: v };
            }
            return item;
        });
        setCurrentEvaluation(new_evaluation_list);
    }
    const { mutate: postmutate } = useMutation(basePost);
    const { mutate: putmutate } = useMutation(basePut);
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
        const current_evaluation_without_null = current_evaluation.filter(item => item.evaluation_name && item.score);
        setCurrentPromptError(false)
        setCurrentResponseError(false)
        setCurrentSystemPromptError(false)
        if (!current_prompt) {
            setCurrentPromptError(true)
        }
        if (!current_response) {
            setCurrentResponseError(true)
        }
        if (!current_system_prompt) {
            setCurrentSystemPromptError(true)
        }
        if (current_prompt && current_response && current_system_prompt && dataset) {
            var data = {
                'dataset_id': dataset.id,
                'prompt': current_prompt,
                'response': current_response,
                'system_prompt': current_system_prompt,
                'evaluation': current_evaluation_without_null
            }
            if (!current_record_id) {
                postmutate({ url: "/frontend-api/create-record", data: data }, {
                    onSuccess: () => {
                        record_refetch()
                        setSaveSuccess(true)
                        setAllowSaveRecord(false)
                    }
                }
                )
            }
            else {
                data['record_id'] = current_record_id
                putmutate({ url: "/frontend-api/update-record", data: data }, {
                    onSuccess: () => {
                        record_refetch()
                        setAllowSaveRecord(false)
                        setSaveSuccess(true)
                        setAllowAddDataset(true)
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
        else if (!dataset) {
            setSaveError(true)
            setSaveErrorMessage("You need to create a dataset first!")
        }
        else {
            setSaveError(true)
            setSaveErrorMessage("Record contains empty Field(s)!")
        }
        setLoading(false)
    }

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        setCurrentRecordId(null)
        setCurrentPrompt('')
        setCurrentResponse('')
        setCurrentSystemPrompt(dataset_list[index].default_system_prompt)
        setCurrentEvaluation(dataset_list[index].default_evaluation)
    };

    const deleteDataset = () => {
        setAllowAddDataset(true);
        const newDatasetList = [...dataset_list];
        const nodeToDelete = dataset_list[selectedIndex];
        if (nodeToDelete.id !== null) {
            deleteReq(nodeToDelete.id);
            setDeleteSuccess(true);
        }

        if (newDatasetList.length > 1) {
            setDatasetList(prev => prev.filter((_, i) => i !== selectedIndex));
            setDeleteSuccess(true);
        } else {
            setDatasetList([]);
        }
    }
    const deleteRecord = () => {
        if (current_record_id && dataset_list[selectedIndex]) {
            const data = {
                'record_id': current_record_id,
                'dataset_id': dataset_list[selectedIndex].id
            };

            deletemutate({ url: "/frontend-api/delete-record", data: data }, {
                onSuccess: () => {
                    setDeleteSuccess(true);
                    record_refetch();
                },
                onError: (error) => {
                    if (error.code === "ERR_BAD_RESPONSE") {
                        setSaveErrorMessage("Failed, Internal Server Error!");
                    } else {
                        setDeleteErrorMessage(error.response.data.detail);
                    }
                }
            });
        }
        setCurrentPrompt('');
        setCurrentResponse('');
        setCurrentRecordId(null);
        setCurrentEvaluation(dataset_list[selectedIndex].default_evaluation);
        setCurrentSystemPrompt(dataset_list[selectedIndex].default_system_prompt);
    }

    const addEvaluation = () => {
        if (current_evaluation.length < max_evaluation_num) {
            const newEvaluation = {
                evaluation_name: "",
                score: "",
            };
            setCurrentEvaluation([...current_evaluation, newEvaluation]);
        }
    };

    const deleteEvaluation = (index) => {
        setCurrentEvaluation(prev => prev.filter((_, i) => i !== index));
    };

    useGetUserDataset(setDatasetList, setMaxDatasetNum, setMaxEvaluationNum, selectedIndex, setCurrentSystemPrompt, setCurrentEvaluation)
    const { refetch: record_refetch } = useGetUserDatasetRecord(setRecordList, setNextPaginationPage, setPreviousPaginationPage, dataset_list, selectedIndex, pagnation_page, setDatasetColumn, setDatasetRow)
    const handleRowClick = (params) => {
        const { id, prompt, response, system_prompt } = params.row;
        setCurrentRecordId(id);
        setCurrentPrompt(prompt);
        setCurrentResponse(response);
        setCurrentSystemPrompt(system_prompt);
        const clickedRecord = record_list.results.record_serializer.find(record => record.id === id);
        if (clickedRecord) {
            setCurrentEvaluation(clickedRecord.evaluation);
        }
    };
    const addRecord = () => {
        setCurrentSystemPrompt(dataset_list[selectedIndex].default_system_prompt)
        setCurrentEvaluation(dataset_list[selectedIndex].default_evaluation)
        setCurrentPrompt('');
        setCurrentResponse('');
        setCurrentRecordId(null);
    };
    return (
        <Container maxWidth={false} sx={{ minWidth: 1200 }} disableGutters>
            <title>Dataset</title>
            <ResponsiveAppBar max_width={false} />
            <Container maxWidth="xxl" >
                <Box m={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Paper sx={{ mr: 2 }} variant='outlined'>
                                <Typography ml={2} mt={1} variant='body1' sx={{ color: 'text.secondary' }}>
                                    Dataset
                                </Typography>
                                <List>
                                    {dataset_list && dataset_list.map((dataset, index) => (
                                        <ListItem key={dataset.id} disablePadding>
                                            <ListItemButton sx={{ height: 38 }} selected={selectedIndex === index} onClick={() => handleListItemClick(index)}>
                                                <ListItemIcon>
                                                    {selectedIndex === index ? <FolderOpenIcon /> : <FolderIcon />}
                                                </ListItemIcon>
                                                <ListItemText primaryTypographyProps={{
                                                    fontWeight: 'medium',
                                                    variant: 'body2',
                                                    style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
                                                }} primary={dataset.name} />
                                                <DatasetMutateDialog
                                                    setAllowAddDataset={setAllowAddDataset}
                                                    setDatasetList={setDatasetList}
                                                    dataset_list={dataset_list}
                                                    max_evaluation_num={max_dataset_num}
                                                    method = "put"
                                                    dataset_id = {dataset.id}
                                                    old_dataset_name={dataset.name}
                                                    old_default_evaluation={dataset.default_evaluation}
                                                    old_default_system_prompt={dataset.default_system_prompt}
                                                    setCurrentEvaluation={setCurrentEvaluation}
                                                    setCurrentSystemPrompt={setCurrentSystemPrompt}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                    <Box display="flex" justifyContent="center" alignItems="center" mt={1}>

                                        { allow_add_dataset && dataset_list && dataset_list.length < max_dataset_num && max_evaluation_num && (
                                            <DatasetMutateDialog
                                                setAllowAddDataset={setAllowAddDataset}
                                                setDatasetList={setDatasetList}
                                                dataset_list={dataset_list}
                                                max_evaluation_num={max_dataset_num}
                                                method="post"
                                                setCurrentEvaluation={setCurrentEvaluation}
                                                setCurrentSystemPrompt={setCurrentSystemPrompt}
                                            />
                                        )}
                                        {dataset_list && dataset_list.length > 1 && (
                                            <IconButton aria-label="delete" onClick={deleteDataset}>
                                                <DeleteIcon />
                                            </IconButton>
                                        )}

                                    </Box>
                                </List>
                            </Paper>
                            <Box sx={{ mr: 2, mt: 2 }} >
                                <DatasetExportServerSide dataset_id={dataset_list[selectedIndex] ? dataset_list[selectedIndex].id : null } dataset_name={dataset_list[selectedIndex] ? dataset_list[selectedIndex].name : null} setSaveError={setSaveError} setSaveErrorMessage={setSaveErrorMessage}/>
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
                                                    error={current_system_prompt_error}
                                                    minRows={4}
                                                    maxRows={6}
                                                    value={current_system_prompt}
                                                    InputLabelProps={{ shrink: true }}
                                                    onChange={(e) => { setCurrentSystemPrompt(e.target.value); setAllowSaveRecord(true) }}
                                                    inputProps={{ maxLength: 2500 }}
                                                />
                                                <TextField
                                                    label="Prompt"
                                                    error={current_prompt_error}
                                                    multiline
                                                    minRows={6}
                                                    maxRows={8}
                                                    value={current_prompt}
                                                    InputLabelProps={{ shrink: true }}
                                                    onChange={(e) => { setCurrentPrompt(e.target.value); setAllowSaveRecord(true) }}
                                                    inputProps={{ maxLength: 2500 }}
                                                />
                                                <TextField
                                                    label="Response"
                                                    error={current_response_error}
                                                    multiline
                                                    minRows={6}
                                                    value={current_response}
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
                                                    <Grid key={index} container spacing={1}>
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
                                                <IconButton aria-label="add" onClick={() => { addEvaluation(); setAllowSaveRecord(true) }}>
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                            }
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box display="flex"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Stack direction='row' mt={1} spacing={1}>
                                        <LoadingButton size="small" loading={loading} disabled={!previous_pagnation} loadingPosition="start" variant="contained" onClick={() => { navigatePagination("previous") }} startIcon={<KeyboardDoubleArrowLeftIcon />}>Previous (10)</LoadingButton>
                                        <LoadingButton size="small" loading={loading} disabled = {!dataset_row.length} loadingPosition="start" variant="contained" onClick={() => { navigateRow("previous") }} startIcon={<KeyboardArrowLeftIcon />}>Previous</LoadingButton>
                                        <IconButton aria-label="add" size='small' onClick={() => { addRecord(); setAllowSaveRecord(true) }}>
                                            <AddCircleOutlineIcon />
                                        </IconButton>
                                        <LoadingButton size="small" loading={loading} disabled={!allow_save_record} loadingPosition="end" variant="contained" onClick={() => { saveRecord() }} endIcon={<SaveIcon />}>Save</LoadingButton>
                                        <IconButton aria-label="delete" size='small' onClick={() => { deleteRecord() }}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <LoadingButton size="small" loading={loading} disabled = {!dataset_row.length} loadingPosition="end" variant="contained" onClick={() => { navigateRow("next") }} endIcon={<KeyboardArrowRightIcon />}>Next </LoadingButton> 
                                        <LoadingButton size="small" loading={loading} disabled={!next_pagnation} loadingPosition="end" variant="contained" onClick={() => { navigatePagination("next") }} endIcon={<KeyboardDoubleArrowRightIcon />}>Next (10)</LoadingButton>
                                    </Stack>
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
                                {`Dataset Page: ${pagnation_page}`}
                            </Typography>
                            <div style={{ height: 555, width: '100%' }}>
                                <DataGrid
                                    onRowClick={handleRowClick}
                                    disableColumnSorting
                                    disableAutosize
                                    rows={dataset_row}
                                    columns={dataset_column}
                                    hideFooter={true}
                                    onRowSelectionModelChange={(newRowSelectionModel) => {
                                        setRowSelectionModel(newRowSelectionModel);
                                    }}
                                    rowSelectionModel={rowSelectionModel}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Box >
            </Container >
            <Footer />
        </Container >
    );
}
export default PromptWriting;