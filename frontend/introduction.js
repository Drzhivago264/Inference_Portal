import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import ApiIcon from '@mui/icons-material/Api';
import ArticleIcon from '@mui/icons-material/Article';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import LayersIcon from '@mui/icons-material/Layers';
import ChatIcon from '@mui/icons-material/Chat';
import KeyIcon from '@mui/icons-material/Key';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box';
import ResponsiveAppBar from './navbar';
import VerticalNav from './component/vertical_nav';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

function Information() {
    const [intro, setMessage] = useState('');
    const [link_list, setMessage_link] = useState('');
    useEffect(() => {
        axios.all([
            axios.get('/frontend-api/article/index/introduction'),
            axios.get('/frontend-api/article/index/link')
        ])

            .then(axios.spread((intro_object, link_list_object) => {
                setMessage(intro_object.data.article.content);
                setMessage_link(link_list_object.data.article.content);
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
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <div dangerouslySetInnerHTML={{ __html: intro }} ></div>
                    </Grid>
                    <Grid item md={4}>
                        <Box sx={{ maxWidth: 225, display: { xs: 'none', sm: 'block' } }}>
                            <VerticalNav />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}

export default Information;