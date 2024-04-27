import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Prism from "prismjs";
import Link from '@mui/material/Link';
import "prismjs/themes/prism-okaidia.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
import Paper from '@mui/material/Paper';

import { styled } from '@mui/system';
require("prismjs/components/prism-c");
require("prismjs/components/prism-python");
require("prismjs/components/prism-bash");
require("prismjs/plugins/normalize-whitespace/prism-normalize-whitespace");
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { colors } from '@mui/material';

function Manual() {
    useEffect(() => {
        Prism.highlightAll();
    });

    const StickyBox = styled(Box)`
        position: -webkit-sticky;
        position: sticky;
        display: inline-block;
        top: 100px;
    
        `;


    const [intro, setMessage] = useState('');
    const [inference, setMessage_inference] = useState('');
    const [behavior, setMessage_behavior] = useState('');
    const [authentication, setMessage_authentication] = useState('');
    useEffect(() => {
        axios.all([
            axios.get('/frontend-api/article/manual/behavior'),
            axios.get('/frontend-api/article/manual/inference'),
            axios.get('/frontend-api/article/manual/introduction'),
            axios.get('/frontend-api/article/manual/authentication'),
        ])

            .then(axios.spread((behavior_object, inference_object, introduction_object, authentication_object) => {
                setMessage(introduction_object.data.article.content);
                setMessage_inference(inference_object.data.article.content);
                setMessage_behavior(behavior_object.data.article.content);
                setMessage_authentication(authentication_object.data.article.content);
            }))
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Box
                my={1}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
            >
                <title>Manual</title>
                <Grid container spacing={2}>
                    <Grid item md={4} lg={3}>
                  
                        <StickyBox sx={{ display: { xs: 'none', sm: 'none', md: 'block',  p: 1, border: '1px solid grey',  borderRadius: 5,  } }}>

                            <List dense={true}
                                    subheader={<ListSubheader>Content</ListSubheader>}>

                                <ListItemButton  component={Link} to='#1'> 1. Setting Up Your API Key </ListItemButton>
                                <ListItemButton component={Link} to='#1.1' sx={{ pl: 4 }}>1.1 Creating a New API Key</ListItemButton>
                                <ListItemButton component={Link} to='#1.2' sx={{ pl: 4 }}>1.2 Making API Request</ListItemButton>
                                <ListItemButton component={Link} to='#1.3' sx={{ pl: 4 }}>1.3 Edit or Delete API Key</ListItemButton>
                                <ListItemButton component={Link} to='#1.4' sx={{ pl: 4 }}>1.4 API Usage Report</ListItemButton>
                                <ListItemButton component={Link} to='#2' >2. Credit & Authentication</ListItemButton>
                                <ListItemButton component={Link} to='#2.1' sx={{ pl: 4 }}>2.1 Payment Methods</ListItemButton>
                                <ListItemButton component={Link} to='#2.2' sx={{ pl: 4 }}>2.2 Cost Calculation</ListItemButton>
                                <ListItemButton component={Link} to='#2.3' sx={{ pl: 4 }}>2.3 Authentication</ListItemButton>
                                <ListItemButton component={Link} to='#3'>3. Inference Modes</ListItemButton>
                                <ListItemButton component={Link} to='#3.1' sx={{ pl: 4 }}>3.1 API Endpoints</ListItemButton>
                                <ListItemButton component={Link} to='#3.2' sx={{ pl: 4 }}>3.2 Chat Bot Mode</ListItemButton>
                                <ListItemButton component={Link} to='#3.3' sx={{ pl: 4 }}>3.3 Engineering Mode</ListItemButton>
                                <ListItemButton component={Link} to='#4'>4. Website Behaviors</ListItemButton>
                            </List>

                        </StickyBox>
            
                    </Grid>
                    <Grid item md={8} lg={9}>
                        <div dangerouslySetInnerHTML={{ __html: intro }} ></div>
                        <div dangerouslySetInnerHTML={{ __html: authentication }} ></div>
                        <div dangerouslySetInnerHTML={{ __html: inference }} ></div>
                        <div dangerouslySetInnerHTML={{ __html: behavior }} ></div>

                    </Grid>


                </Grid>
            </Box>
        </Container>
    );
}

export default Manual;