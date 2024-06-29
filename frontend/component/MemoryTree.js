import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

export const MemoryTree = () => {
    const [root_node, setRootNode] = useState(null);
    const [default_expand_node, setDefaultExpandNode] = useState([])
    const [total_node, setTotalNode] = useState(null)
    useEffect(() => {
        axios.all([
            axios.get('/frontend-api/memory-tree'),
        ])
            .then(axios.spread((memory_object) => {

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
    const RecursiveMemoryTree = ({ data }) => {
        return (
            <SimpleTreeView
                defaultExpandedItems={default_expand_node}
                aria-label="file system navigator"
                sx={{ maxHeight: 485, flexGrow: 1, maxWidth: 600, overflowY: 'auto' }}
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
    }
    return (
        <Paper variant='outlined'>
            <Box m={1}>
                <Typography sx={{ color: 'text.secondary' }}>
                    Memory Tree
                    <IconButton aria-label="fingerprint" color="info" size="small" onClick={refresh_tree}>
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                </Typography>
            </Box>
            <Divider />

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
        </Paper>
    )
}