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
import { Divider, Typography } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
function UserInstruction() {
    const [root_node, setRootNode] = useState(null);
    const [default_expand_node, setDefaultExpandNode] = useState([])
    const [total_node, setTotalNode] = useState(null)
    const [children_instruction_list, setChildInstructionList] = useState([])
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
            axios.get(`/frontend-api/get-user-instruction`),
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

            axios.get('/frontend-api/get-user-instruction'),
        ])
            .then(axios.spread((memory_object) => {

                if (memory_object.status != 204) {
                    console.log(memory_object.data.root_nodes)
                    var make_tree = treeify(memory_object.data.root_nodes)
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
                                <Typography pl={1} pr={1} pt={1} variant='body2'> {"Prompt: " + parent.prompt} </Typography>
                                <Typography pl={1} pr={1} pb={1} variant='body2'>{"Response: " + parent.response} </Typography>
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
                                Instruction Template
                                <IconButton aria-label="fingerprint" color="info" size="small" onClick={refresh_tree}>
                                    <RefreshIcon fontSize="small" />
                                </IconButton>
                            </Typography>

                            {root_node && <RecursiveMemoryTree data={root_node} />}
                            {!root_node &&
                                <Typography variant='body2'>
                                    No template yet.
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
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Parent Instruction"
                                    multiline
                                    rows={4}
                                    maxRows={8}
                                />
                                <Divider />
                                <DragDropContext>
                                    <Droppable droppableId="childrens">
                                        {(provided) => (
                                            <ul className="childrens"  {...provided.droppableProps} ref={provided.innerRef}>
                                                <Draggable key="0" draggableId="0" index={0}>
                                                    {(provided) => (
                                                        <Box p={1}  className="childrens"
                                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                                                <TextField
                                                                    label="Children Instruction 1"
                                                                    multiline
                                                                    rows={4}
                                                                    maxRows={8}
                                                                />
                                                            </FormControl>
                                                        </Box>
                                                    )}
                                                </Draggable>

                                                {provided.placeholder}
                                            </ul>
                                        )}
                                    </Droppable>
                                </DragDropContext>

                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Container >
    );
}

export default UserInstruction;
