import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min";
require("prismjs/components/prism-c");
require("prismjs/components/prism-python");
require("prismjs/components/prism-bash");
import Box from '@mui/material/Box';
import ResponsiveAppBar from './component/navbar';
import VerticalNav from './component/vertical_nav';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
function Information() {
    useEffect(() => {
        Prism.highlightAll();
    });
    const [intro, setMessage] = useState('');
    const [introloading, setIntroLoading] = useState(true);
    useEffect(() => {
        axios.all([
            axios.get('/frontend-api/article/index/introduction'),
        ])
            .then(axios.spread((intro_object) => {
                setIntroLoading(false)
                setMessage(intro_object.data.article.content);
            }))
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <Container maxWidth={false} disableGutters>
            <title>Introduction</title>
            <ResponsiveAppBar />
            <Container maxWidth="lg">
                <Grid container spacing={1}>
                    <Grid item md={9}>

                        <Box mt={5} mb={5} p={1}>
                            <Typography variant="h4" >
                                <Box sx={{ mb: 2, fontWeight: 'bold' }}>About</Box>
                            </Typography>
                            {introloading && <Stack spacing={1}>
                                <Skeleton variant="rounded" animation="wave"  height={150} />
                                <Skeleton variant="rounded" animation="wave" height={150} />
                                <Skeleton variant="rounded" animation="wave" height={100} />
                            </Stack>
                            }
                            <div dangerouslySetInnerHTML={{ __html: intro }} ></div>
                        </Box>

                    </Grid>
                    <Grid item md={3}>
                        <Box m={7} sx={{ width: 225, display: { xs: 'none', sm: 'none ', md: 'block' } }}>
                            <VerticalNav />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}

export default Information;