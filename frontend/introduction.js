import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

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
            axios.get('http://127.0.0.1:8000/frontend-api/article/index/introduction'),
            axios.get('http://127.0.0.1:8000/frontend-api/article/index/link')
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
        <Container maxWidth="lg">
            <title>Introduction</title>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <div dangerouslySetInnerHTML={{__html:intro}} ></div> 
                </Grid>
                <Grid item  md={4}>
              <div dangerouslySetInnerHTML={{__html:link_list}} ></div> 
                </Grid>
            </Grid>
        </Container>
    );
}

export default Information;