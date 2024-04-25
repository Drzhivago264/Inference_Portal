import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function Manual() {
    const [intro, setMessage] = useState('');
    const [inference, setMessage_inference] = useState('');
    const [behavior, setMessage_behavior] = useState('');
    const [authentication, setMessage_authentication] = useState('');
    useEffect(() => {
        axios.all([
            axios.get('http://127.0.0.1:8000/frontend-api/article/manual/behavior'),
            axios.get('http://127.0.0.1:8000/frontend-api/article/manual/inference'),
            axios.get('http://127.0.0.1:8000/frontend-api/article/manual/introduction'),
            axios.get('http://127.0.0.1:8000/frontend-api/article/manual/authentication'),
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
            <title>Introduction</title>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <div dangerouslySetInnerHTML={{__html:intro}} ></div> 
                    <div dangerouslySetInnerHTML={{__html:authentication}} ></div> 
                    <div dangerouslySetInnerHTML={{__html:inference}} ></div> 
                    <div dangerouslySetInnerHTML={{__html:behavior}} ></div> 
                </Grid>
                <Grid item  md={4}>
              
                </Grid>
            </Grid>
        </Container>
    );
}

export default Manual;