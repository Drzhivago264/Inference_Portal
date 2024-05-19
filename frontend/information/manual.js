import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../component/navbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import authentication_ from '../../docs/Manual/authentication.md'
import behavior_ from '../../docs/Manual/behavior.md'
import behavior_toc from '../../docs/Manual/behavior_toc.md'
import key_ from '../../docs/Manual/create_key.md'
import key_toc from '../../docs/Manual/create_key_toc.md'
import errorlimit_ from '../../docs/Manual/error_ratelimit.md'
import errorlimit_toc from '../../docs/Manual/error_ratelimit_toc.md'
import inference_ from '../../docs/Manual/inference.md'
import inference_toc from '../../docs/Manual/inference_toc.md'
import authentication_toc from '../../docs/Manual/authentication_toc.md'
import { MuiMarkdown, getOverrides } from 'mui-markdown';
import { Highlight, themes } from 'prism-react-renderer';
import { useParams } from 'react-router';
import Prism from "prismjs";
import Footer from '../component/footer';
function Manual() {
    useEffect(() => {
        Prism.highlightAll();
    });
    const { doc } = useParams();

    const [displaydoc, setDisplayDoc] = useState('')
    const [displaytoc, setDisplayToc] = useState('')
    const destination_refs = {
        key: [key_, key_toc],
        errorlimit: [errorlimit_, errorlimit_toc],
        authentication: [authentication_, authentication_toc],
        behavior: [behavior_, behavior_toc],
        inference: [inference_, inference_toc]
    }
    useEffect(() => {
        axios.all([
            axios.get(destination_refs[doc][0]),
            axios.get(destination_refs[doc][1]),
        ])
            .then(axios.spread((display_doc_object, display_toc_object) => {
                setDisplayDoc(display_doc_object.data);
                setDisplayToc(display_toc_object.data)

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
                        <Grid item md={3} lg={2}>
                            <Box mt={3} mb={5} sx={{ display: { xs: 'none', sm: 'none ', md: 'block' } }} >
                                <Typography variant="body1" component="body1">
                                    <List dense={true}>
                                        <ListItemButton component={Link} to='/frontend/manual/key'> <Typography variant="body2" component="body2"> Setting Up Your API Key </Typography> </ListItemButton>
                                        <ListItemButton component={Link} to='/frontend/manual/authentication' ><Typography variant="body2" component="body2"> Authentication </Typography> </ListItemButton>
                                        <ListItemButton component={Link} to='/frontend/manual/inference' ><Typography variant="body2" component="body2"> Inference </Typography> </ListItemButton>
                                        <ListItemButton component={Link} to='/frontend/manual/errorlimit' ><Typography variant="body2" component="body2"> Common Errors and Ratelimits </Typography> </ListItemButton>
                                        <ListItemButton component={Link} to='/frontend/manual/behavior' ><Typography variant="body2" component="body2">The behaviors of this website </Typography> </ListItemButton>
                                    </List>
                                </Typography>
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px", display: { xs: 'none', sm:'block' }  }} />
                        <Grid item xs={12} md={8} lg={8}>
                            <Box mt={3} sx={{ display: { sm: 'block ', md: 'none' } }} >
                                <Typography variant="body1" component="body1">
                                    <List dense={true}>
                                        <ListItemButton component={Link} to='/frontend/manual/key'> <Typography> Setting Up Your API Key </Typography> </ListItemButton>
                                        <ListItemButton component={Link} to='/frontend/manual/authentication' ><Typography> Authentication </Typography> </ListItemButton>
                                        <ListItemButton component={Link} to='/frontend/manual/inference' ><Typography> Inference </Typography> </ListItemButton>
                                        <ListItemButton component={Link} to='/frontend/manual/errorlimit' ><Typography> Common Errors and Ratelimits </Typography> </ListItemButton>
                                        <ListItemButton component={Link} to='/frontend/manual/behavior' ><Typography>The behaviors of this website </Typography> </ListItemButton>
                                    </List>
                                </Typography>
                            </Box>
                            <Box m={3}>

                                <MuiMarkdown overrides={{
                                    ...getOverrides({ Highlight, themes, theme: themes.okaidia }),
                                    h1: {
                                        component: 'h1',
                                    },
                                    h2: {
                                        component: 'h2',
                                    },
                                    h3: {
                                        component: 'h3',
                                    },

                                }}>{displaydoc}
                                </MuiMarkdown>

                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px", display: {  xs:'none', sm: 'none', md: 'none',  lg:'block' } }} />
                        <Grid item xs={0} sm={2}>
                            <Box m={2}  	sx={{ display: { xs:'none', sm: 'none', md: 'none', lg:'block' } }}>
                                <MuiMarkdown overrides={{
                                    ...getOverrides({ Highlight, themes, theme: themes.okaidia }),
                                    h1: {
                                        component: 'h1',
                                    },
                                    h2: {
                                        component: 'h2',
                                    },
                                    h3: {
                                        component: 'h3',
                                    },

                                }}>{displaytoc}
                                </MuiMarkdown>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Container>
    );
}

export default Manual;