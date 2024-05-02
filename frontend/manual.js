import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ResponsiveAppBar from './component/navbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import "./component/editor-js.css"
import authentication_ from '../docs/Manual/authentication.md'
import behavior_ from '../docs/Manual/behavior.md'
import key_ from '../docs/Manual/create_key.md'
import errorlimit_ from '../docs/Manual/error_ratelimit.md'
import inference_ from '../docs/Manual/inference.md'
import { MuiMarkdown, getOverrides } from 'mui-markdown';
import { Highlight, themes } from 'prism-react-renderer';
import { useParams } from 'react-router';
import Prism from "prismjs";

function Manual() {
    useEffect(() => {
        Prism.highlightAll();
    });
    const { doc } = useParams();

    const [displaydoc, setDisplayDoc] = useState('')
    const destination_refs = {
        key: key_,
        errorlimit: errorlimit_,
        authentication: authentication_,
        behavior: behavior_,
        inference: inference_
    }


    useEffect(() => {
        console.log(doc)
        axios.all([
            axios.get(destination_refs[doc]),
        ])
            .then(axios.spread((display_doc_object) => {

                setDisplayDoc(display_doc_object.data);

            }))
            .catch(error => {
                console.log(error);
            });


    }, [doc]);

    return (
        <Container maxWidth={false} disableGutters>
            <title>Manual</title>
            <ResponsiveAppBar />
            <Container maxWidth='xl'>
                <Box
                    display="flex"
                    alignItems="center"
                >
                    <Grid container spacing={1}>
                        <Grid item md={2} lg={2}>
                            <Box mt={3} mb={5}>
                                <Typography variant="h6" component="h2">
                                    <List dense={true}>
                                        <ListItemButton component={Link} to='/frontend/manual/key'> <Typography> Setting Up Your API Key </Typography> </ListItemButton>
                                        <ListItemButton component={Link} to='/frontend/manual/authentication' ><Typography> Authentication </Typography> </ListItemButton>
                                        <ListItemButton component={Link} to='/frontend/manual/inference' ><Typography> Inference </Typography> </ListItemButton>
                                        <ListItemButton component={Link} to='/frontend/manual/errorlimit' ><Typography> Common Errors and Ratelimits </Typography> </ListItemButton>
                                        <ListItemButton component={Link} to='/frontend/manual/behavior' ><Typography>The behaviors of this website </Typography> </ListItemButton>
                                    </List>
                                </Typography>
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                        <Grid item md={8} lg={8}>
                            <Box m={3}>

                                <MuiMarkdown overrides={{
                                    ...getOverrides({ Highlight,  themes, theme: themes.okaidia }), 
                                    h1: {
                                        component: 'h1',
                                    },
                                    h2: {
                                        component: 'h2',
                                    },
                                    h3: {
                                        component: 'h3',
                                    },
                  
                                }}>{displaydoc}</MuiMarkdown>

                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />

                    </Grid>
                </Box>
            </Container>
        </Container>
    );
}

export default Manual;