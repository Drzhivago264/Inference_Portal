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
import authentication_ from '../docs/Manual/authentication.md'
import behavior_ from '../docs/Manual/behavior.md'
import key_ from '../docs/Manual/create_key.md'
import errorlimit_ from '../docs/Manual/error_ratelimit.md'
import inference_ from '../docs/Manual/inference.md'
import { MuiMarkdown, getOverrides } from 'mui-markdown';
import { Highlight, themes } from 'prism-react-renderer';
import { useParams } from 'react-router';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

function APIDoc() {


    const [displaydoc, setDisplayDoc] = useState(null)
    const ui = SwaggerUI({
        dom_id: '#swaggerContainer',
        url: '/api/openapi.json',
    });

    return (
        <Container maxWidth={false} disableGutters>
            <title>API Doc</title>
            <ResponsiveAppBar />
            <Container maxWidth='xl'>
                <Box>
                    <Box p={1} m={5} sx={{ bgcolor: 'white', borderRadius: 2 }}>
                        {ui}
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}

export default APIDoc;