import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ResponsiveAppBar from './component/navbar';
import Footer from './component/footer';
import { Divider, List, Typography } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { getCookie } from './component/getCookie';
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
function UserInstruction() {
    const [loading, setLoading] = useState(false);
    const [savesuccess, setSaveSuccess] = useState(false);
    const [template_list, setTemplateList] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [add_child_error, setAddChildError] = useState(false)
    const [add_parent_error, setAddParentError] = useState(false)
    const [children_instruction_list, setChildInstructionList] = useState([
        { id: null, name: "", instruction: "" },
    ])
    const [default_parent_instruction, setDefaultParentInstruction] = useState({ id: null, name: "", instruction: "" });
    const handleOnDragEnd = (result) => {
        const items = Array.from(children_instruction_list);

        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log(items)
        setChildInstructionList(items);

    }

    const updateParentTemplate = (v, property) => {
        const new_parent_instruction = default_parent_instruction
        new_parent_instruction[property] = v
        setDefaultParentInstruction(new_parent_instruction)

        const new_template_list = [...template_list]
        const new_template = { ...template_list[default_parent_instruction['template_list_index']] }
        new_template[property] = v
        new_template_list[default_parent_instruction['template_list_index']] = new_template
        setTemplateList(new_template_list)
    }



    const submitTemplate = () => {
        setLoading(true)
        const csrftoken = getCookie('csrftoken');
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        }
        const data = {
            "parent_instruction": default_parent_instruction,
            "childrens": children_instruction_list
        }

        axios.post("/frontend-api/crud-user-instruction", data, config)
            .then((response) => {
                setSaveSuccess(true)
                setLoading(false)


            }).catch(error => {
                setLoading(false)
            });
    }
    const handleTextFieldChange = (index, property, value) => {
        const new_children_instruction_list = [...children_instruction_list];
        const new_instruction = { ...children_instruction_list[index] };
        new_instruction[property] = value;
        new_children_instruction_list[index] = new_instruction;
        console.log(new_children_instruction_list)
        setChildInstructionList(new_children_instruction_list)
    }

    const handleListItemClick = (event, index) => {
        const new_parent = {
            'template_list_index': index,
            'id': template_list[index]['id'],
            'name': template_list[index]['name'],
            'instruction': template_list[index]['instruction']
        }
        setDefaultParentInstruction(new_parent)
        console.log(default_parent_instruction)
        let default_child_instruction = []
        if (template_list[index]['children'] === null) {
            setChildInstructionList([{ id: null, name: "", instruction: "" }])
        }
        else {
            for (let c in template_list[index]['children']) {
                default_child_instruction.push({
                    'id': template_list[index]['children'][c]['id'],
                    'name': template_list[index]['children'][c]['displayed_name'],
                    'instruction': template_list[index]['children'][c]['instruct']
                })
            }
            setChildInstructionList(default_child_instruction)
        }

        setSelectedIndex(index);
    };

    const addParent = (operation) => {
        let length = template_list.length
        if (length < 5) {
            if (operation == "add") {
                const new_template_list = [...template_list, { id: null, name: "Empty Template", instruction: "", children: null }];
                setTemplateList(new_template_list)
                setChildInstructionList([
                    { id: null, name: "", instruction: "" },
                ])
                setDefaultParentInstruction({ 'id': null, 'name': "", 'instruction': "", 'template_list_index': null })
            }
        }
    }
    const addChild = (operation) => {
        let length = children_instruction_list.length

        if (length < 3) {
            setAddChildError(false)
            if (operation == "add") {
                const new_children_instruction_list = [...children_instruction_list, { id: null, name: "", instruction: "" }];
                setChildInstructionList(new_children_instruction_list)
            }
            else {
                const new_children_instruction_list = [...children_instruction_list];
                new_children_instruction_list.splice(-1);
                setChildInstructionList(new_children_instruction_list)
            }
        }
        else {
            setAddChildError(true)
            if (operation == "delete") {
                const new_children_instruction_list = [...children_instruction_list];
                new_children_instruction_list.splice(-1);
                setChildInstructionList(new_children_instruction_list)
                setAddChildError(false)
            }

        }
    }
    const request_instruction = () => {
        axios.all([
            axios.get('/frontend-api/get-user-instruction'),
        ])
            .then(axios.spread((template_object) => {

                if (template_object.status != 204) {
                    let template_list = []
                    if (template_object.data.root_nodes.length >= 5) {
                        setAddParentError(true)
                    }
                    if (template_object.data.root_nodes.length == 0) {

                        setTemplateList([{
                            'template_list_index': 0,
                            'id': null,
                            'name': "Empty template",
                            'instruction': "",
                            'children': [{
                                'id': null,
                                'name': "",
                                'instruction': "",
                            }],
                        }])

                    }
                    else {
                        for (let template in template_object.data.root_nodes) {
                            if (template == 0) {
                                setDefaultParentInstruction({
                                    'template_list_index': template,
                                    'id': template_object.data.root_nodes[template]['id'],
                                    'name': template_object.data.root_nodes[template]['displayed_name'],
                                    'instruction': template_object.data.root_nodes[template]['instruct']
                                })
                                let default_child_instruction = []
                                for (let c in template_object.data.root_nodes[template].children) {
                                    default_child_instruction.push({
                                        'id': template_object.data.root_nodes[0].children[c]['id'],
                                        'name': template_object.data.root_nodes[0].children[c]['displayed_name'],
                                        'instruction': template_object.data.root_nodes[0].children[c]['instruct']
                                    })
                                }
                                setChildInstructionList(default_child_instruction)
                            }
                            template_list.push({
                                'id': template_object.data.root_nodes[template]['id'],
                                'name': template_object.data.root_nodes[template]['displayed_name'],
                                'instruction': template_object.data.root_nodes[template]['instruct'],
                                'children': template_object.data.root_nodes[template]['children']
                            })
                        }
                        setTemplateList(template_list)
                    }
                }
            }))
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        request_instruction()
    }, []);

    return (
        <Container maxWidth={false} sx={{ minWidth: 1200 }} disableGutters>
            <title>Templates</title>
            <ResponsiveAppBar />
            <Container maxWidth="lg" >
                <Box m={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography mt={1} mb={1} variant='body1'>
                                Instruction Template
                            </Typography>
                            <List>
                                {template_list.map((t, index) => {
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
                                            }} primary={t.name} />
                                        </ListItemButton>
                                    )
                                })}
                                {add_parent_error && <Alert severity="warning">Reaching the maximum number of parent (5).</Alert>}

                                {!add_parent_error &&
                                    <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center">
                                        <IconButton aria-label="add" onClick={() => { addParent("add") }}>
                                            <AddCircleOutlineIcon />
                                        </IconButton>
                                    </Box>
                                }
                            </List>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                {template_list.map((t, index) => {

                                    if (selectedIndex == index) {
                                        return (
                                            <Box key={index} display="flex">
                                                <FormControl fullWidth variant="standard">
                                                    <Stack direction="column" spacing={1} mb={1} style={{ width: '100%' }}>
                                                        <TextField
                                                            label="Template Name"
                                                            multiline
                                                            maxRows={1}
                                                            InputLabelProps={{ shrink: true }}
                                                            defaultValue={t['name']}
                                                            onChange={(e) => { updateParentTemplate(e.target.value, 'name') }}
                                                            inputProps={{ maxLength: 35 }}
                                                        />

                                                        <TextField
                                                            label="Parent Instruction"
                                                            multiline
                                                            minRows={4}
                                                            maxRows={8}
                                                            InputLabelProps={{ shrink: true }}
                                                            onChange={(e) => { updateParentTemplate(e.target.value, 'instruction') }}
                                                            defaultValue={t['instruction']}
                                                            inputProps={{ maxLength: 2500 }}
                                                        />
                                                    </Stack>
                                                </FormControl>

                                            </Box>
                                        )
                                    }
                                })}

                                <Divider />
                                <DragDropContext onDragEnd={handleOnDragEnd}>
                                    <Droppable droppableId="childrens">
                                        {(provided) => (
                                            <Box className="childrens"  {...provided.droppableProps} ref={provided.innerRef}>
                                                {children_instruction_list && children_instruction_list.map((child, index) => {
                                                    return (
                                                        <Draggable key={child.id} draggableId={`${child.id}`} index={index}>
                                                            {(provided) => (
                                                                <Box mt={1} mb={1} display='flex' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                    <Stack direction="row" spacing={2} style={{ width: '100%' }}>
                                                                        <Box>
                                                                            <IconButton aria-label="delete" >
                                                                                <DragHandleIcon />
                                                                            </IconButton>
                                                                        </Box>
                                                                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                                                            <TextField
                                                                                label={`Children No.${index} Name`}
                                                                                inputProps={{ maxLength: 35 }}
                                                                                maxRows={1}
                                                                                defaultValue={child.name}
                                                                                InputLabelProps={{ shrink: true }}
                                                                                onChange={(e) => handleTextFieldChange(index, "name", e.target.value)}
                                                                            />
                                                                            <Box mt={1} mb={1}>
                                                                                <TextField
                                                                                    label={`Child No.${index} Instruction`}
                                                                                    multiline
                                                                                    minRows={4}
                                                                                    inputProps={{ maxLength: 2500 }}
                                                                                    InputLabelProps={{ shrink: true }}
                                                                                    fullWidth
                                                                                    maxRows={8}
                                                                                    defaultValue={child.instruction}
                                                                                    onChange={(e) => handleTextFieldChange(index, "instruction", e.target.value)}
                                                                                />
                                                                            </Box>
                                                                        </FormControl>

                                                                    </Stack>
                                                                </Box>
                                                            )}
                                                        </Draggable>


                                                    )
                                                })}
                                                {provided.placeholder}
                                            </Box>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                                <Box display="flex"
                                    justifyContent="center"
                                    alignItems="center">
                                    <LoadingButton size="small" loading={loading} loadingPosition="end" variant="contained" onClick={submitTemplate} endIcon={<SaveIcon />}>Save</LoadingButton>

                                    {add_child_error && <Alert severity="warning">Reaching the maximum number of child (3).</Alert>}

                                    {!add_child_error && <IconButton aria-label="add" onClick={() => { addChild("add") }}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                    }
                                    <IconButton aria-label="delete" onClick={() => { addChild("delete") }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Snackbar
                                        open={savesuccess}
                                        autoHideDuration={3000}
                                        onClose={() => { setSaveSuccess(false) }}
                                        message="Saved !"
                                    />
                                </Box>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Container >
            <Footer />
        </Container >
    );
}

export default UserInstruction;
