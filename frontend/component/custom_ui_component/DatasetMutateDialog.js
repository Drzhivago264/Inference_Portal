import React, { useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { basePost } from '../../api_hook/basePost';
import { basePut } from '../../api_hook/basePut';
import { useMutation } from 'react-query';

export default function DatasetMutateDialog({

    setAllowAddDataset,
    max_evaluation_num,
    setDatasetList,
    dataset_list,
    dataset_id,
    old_default_system_prompt,
    old_default_evaluation,
    old_dataset_name,
    method,
    setCurrentEvaluation,
    setCurrentSystemPrompt

}) {
    const [open, setOpen] = useState(false);
    const [saveerror, setSaveError] = useState(false);
    const [default_system_prompt, setDefaultSystemPrompt] = useState(method === "put" ? old_default_system_prompt : "")
    const [default_evaluation, setDefaultEvaluation] = useState(method === "put" ? old_default_evaluation : [{ "evaluation_name": "", score: "" }])
    const [dataset_name, setDatasetName] = useState(method === "put" ? old_dataset_name : "")
    const [saveerrormessage, setSaveErrorMessage] = useState('');
    const [savesuccess, setSaveSuccess] = useState(false);
    const [allow_mutate, setAllowMutate] = useState(true)
    const { mutate: postmutate } = useMutation(basePost);
    const { mutate: putmutate } = useMutation(basePut)
    const createDataset = () => {
        const default_evaluation_without_null = default_evaluation.filter(item => item.evaluation_name && item.score);
        setAllowMutate(false)
        if (dataset_name) {
            const data = {
                'name': dataset_name,
                'default_system_prompt': default_system_prompt,
                'default_evaluation': default_evaluation_without_null
            }
            postmutate({ url: "/frontend-api/create-dataset", data: data }, {
                onSuccess: (data) => {
                    setSaveSuccess(true)
                    setAllowAddDataset(true)
                    setDatasetList([...dataset_list, { id: data.id, name: data.name, default_system_prompt: default_system_prompt, default_evaluation: default_evaluation_without_null }])
                    setCurrentEvaluation(default_evaluation_without_null),
                        setCurrentSystemPrompt(default_system_prompt)
                },
                onError: (error) => {
                    setSaveError(true)
                    if (error.code === "ERR_BAD_RESPONSE") {
                        setSaveErrorMessage("Failed, Internal Server Error!");
                    } else {
                        setSaveErrorMessage(error.response.data.detail);
                    }
                    setAllowMutate(true)
                }
            }
            )
        }
        else {
            setSaveError(true)
            setSaveErrorMessage("Dataset Name Cannot be Empty!");
            setAllowMutate(true)
        }
    }

    const updateDataset = () => {
        const default_evaluation_without_null = default_evaluation.filter(item => item.evaluation_name && item.score);
        setAllowMutate(false)
        if (dataset_name) {
            const data = {
                'id': dataset_id,
                'new_name': dataset_name,
                'new_default_system_prompt': default_system_prompt,
                'new_default_evaluation': default_evaluation_without_null
            }

            putmutate({ url: "/frontend-api/update-dataset", data: data }, {
                onSuccess: () => {
                    setSaveSuccess(true)
                    setAllowAddDataset(true)
                    const new_dataset_list = dataset_list.map((item) => {
                        if (item.id === dataset_id) {
                            return { id: dataset_id, name: dataset_name, default_system_prompt: default_system_prompt, default_evaluation: default_evaluation_without_null };
                        }
                        return item;
                    });
                    setDatasetList(new_dataset_list);
                    setCurrentEvaluation(default_evaluation_without_null),
                        setCurrentSystemPrompt(default_system_prompt)
                },
                onError: (error) => {
                    setSaveError(true)
                    if (error.code === "ERR_BAD_RESPONSE") {
                        setSaveErrorMessage("Failed, Internal Server Error!");
                    } else {
                        setSaveErrorMessage(error.response.data.detail);
                    }
                    setAllowMutate(true)
                }
            }
            )
        }
        else {
            setSaveError(true)
            setSaveErrorMessage("Dataset Name Cannot be Empty!");
            setAllowMutate(true)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (method === "post") {
            setDatasetName('')
            setDefaultEvaluation([{ evaluation_name: "", score: "" }])
            setDefaultSystemPrompt('')
        }
    };
    const deleteEvaluation = (index) => {
        setDefaultEvaluation(prev => prev.filter((_, i) => i !== index));
    };

    const addEvaluation = () => {
        if (default_evaluation.length < max_evaluation_num) {
            const newEvaluation = {
                evaluation_name: "",
                score: ""
            };
            setDefaultEvaluation([...default_evaluation, newEvaluation]);
        }
    };
    const updateEvaluationValue = (v, index) => {
        const new_evaluation_list = default_evaluation.map((item, i) => {
            if (i === index) {
                return { ...item, ["evaluation_name"]: v };
            }
            return item;
        });
        setDefaultEvaluation(new_evaluation_list);
    }
    return (
        <React.Fragment>
            <IconButton aria-label="add" onClick={handleClickOpen}>
                {method === "post" ? <AddCircleOutlineIcon /> : <EditIcon />}
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {method === "post" ? "Create a new dataset" : "Update your dataset"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText mb={1} id="alert-dialog-description">
                        {method === "put" ? `Change your Dataset's name` : `Give a name for your Dataset`}
                    </DialogContentText>
                    <TextField
                        fullWidth
                        id="eval-name"
                        size='small'
                        label="Dataset name"
                        onChange={(e) => { setDatasetName(e.target.value) }}
                        value={dataset_name}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <DialogContentText mt={1} id="alert-dialog-description">
                        {method === "put" ? `Change your default system prompt and evaluation (this does not change the system prompt and evaluation in each record).` : `You can provide the default system prompt and evaluation score for all records of your database. You can also leave them blank and specified them for each records.`}
                    </DialogContentText>
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            label="System Prompt"
                            multiline
                            minRows={4}
                            maxRows={6}
                            value={default_system_prompt}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => { setDefaultSystemPrompt(e.target.value) }}
                            inputProps={{ maxLength: 2500 }}
                        />
                    </Box>
                    <DialogContentText mt={2} id="alert-dialog-description">
                        Evaluation
                    </DialogContentText>
                    <Stack mt={1} spacing={1}>
                        {default_evaluation && default_evaluation.map((ev, index) => {
                            return (
                                <Grid key={index} container>
                                    <Grid xs={11} item>
                                        <TextField
                                            fullWidth
                                            id="eval-name"
                                            size='small'
                                            label="Name"
                                            onChange={(e) => { updateEvaluationValue(e.target.value, index) }}
                                            value={ev.evaluation_name}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid xs={1} item>
                                        <IconButton aria-label="delete" onClick={() => { deleteEvaluation(index) }}>
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
                        {default_evaluation && default_evaluation.length < max_evaluation_num &&
                            <IconButton aria-label="add" onClick={() => { addEvaluation() }}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        }
                    </Box>
                    {
                        [
                            { open: savesuccess, autoHideDuration: 500, onClose: () => { setSaveSuccess(false), handleClose(), setAllowMutate(true) }, severity: "success", message: "Saved!" },
                            { open: saveerror, autoHideDuration: 6000, onClose: () => setSaveError(false), severity: "error", message: saveerrormessage },
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={!allow_mutate} autoFocus>
                        Cancel
                    </Button>
                    {method === "post" ? <Button onClick={createDataset} disabled={!allow_mutate} autoFocus>
                        Create
                    </Button> : <Button onClick={updateDataset} disabled={!allow_mutate} autoFocus>
                        Update
                    </Button>
                    }
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
DatasetMutateDialog.propTypes = {
    setAllowAddDataset: PropTypes.func.isRequired,
    max_evaluation_num: PropTypes.number.isRequired,
    setDatasetList: PropTypes.func.isRequired,
    dataset_list: PropTypes.array.isRequired,
    dataset_id: PropTypes.number,
    old_default_system_prompt: PropTypes.string,
    old_default_evaluation: PropTypes.array,
    old_dataset_name: PropTypes.string,
    method: PropTypes.string.isRequired,
    setCurrentEvaluation: PropTypes.func.isRequired,
    setCurrentSystemPrompt: PropTypes.func.isRequired,
};