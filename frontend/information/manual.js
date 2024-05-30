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
import authentication_en from '../../docs/Manual/en/authentication.md'
import behavior_en from '../../docs/Manual/en/behavior.md'
import behavior_toc_en from '../../docs/Manual/en/behavior_toc.md'
import key_en from '../../docs/Manual/en/create_key.md'
import key_toc_en from '../../docs/Manual/en/create_key_toc.md'
import errorlimit_en from '../../docs/Manual/en/error_ratelimit.md'
import errorlimit_toc_en from '../../docs/Manual/en/error_ratelimit_toc.md'
import inference_en from '../../docs/Manual/en/inference.md'
import inference_toc_en from '../../docs/Manual/en/inference_toc.md'
import authentication_toc_en from '../../docs/Manual/en/authentication_toc.md'

import authentication_vi from '../../docs/Manual/vi/authentication_vi.md'
import behavior_vi from '../../docs/Manual/vi/behavior_vi.md'
import behavior_toc_vi from '../../docs/Manual/vi/behavior_toc_vi.md'
import key_vi from '../../docs/Manual/vi/create_key_vi.md'
import key_toc_vi from '../../docs/Manual/vi/create_key_toc_vi.md'
import errorlimit_vi from '../../docs/Manual/vi/error_ratelimit_vi.md'
import errorlimit_toc_vi from '../../docs/Manual/vi/error_ratelimit_toc_vi.md'
import inference_vi from '../../docs/Manual/vi/inference_vi.md'
import inference_toc_vi from '../../docs/Manual/vi/inference_toc_vi.md'
import authentication_toc_vi from '../../docs/Manual/vi/authentication_toc_vi.md'
import { useTranslation } from 'react-i18next';
import { MuiMarkdown, getOverrides } from 'mui-markdown';
import { Highlight, themes } from 'prism-react-renderer';
import { useParams } from 'react-router';
import Prism from "prismjs";
import Footer from '../component/footer';
import i18next from "i18next";


function Manual() {
    useEffect(() => {
        Prism.highlightAll();
    });
    const { doc } = useParams();
    const [default_language, setDefaultLanguage] = useState(i18next.language == 'en' || i18next.language == 'vi' ? i18next.language : 'en')

    const [displaydoc, setDisplayDoc] = useState('')
    const [displaytoc, setDisplayToc] = useState('')
    const destination_refs = {
        key: {
            "en": [key_en, key_toc_en],
            "vi": [key_vi, key_toc_vi]
        },
        errorlimit: {
            "en": [errorlimit_en, errorlimit_toc_en],
            "vi": [errorlimit_vi, errorlimit_toc_vi]
        },
        authentication: {
            "en": [authentication_en, authentication_toc_en],
            "vi": [authentication_vi, authentication_toc_vi]
        },
        behavior: {
            "en": [behavior_en, behavior_toc_en],
            "vi": [behavior_vi, behavior_toc_vi]
        },
        inference: {
            "en": [inference_en, inference_toc_en],
            "vi": [inference_vi, inference_toc_vi]
        }
    }
    const { t, i18n } = useTranslation();

    useEffect(() => {
        setDefaultLanguage(i18n.language)
    }, [i18n.language]);
    
    useEffect(() => {
     
            axios.all([
                axios.get(destination_refs[doc][default_language][0]),
                axios.get(destination_refs[doc][default_language][1]),
            ])
                .then(axios.spread((display_doc_object, display_toc_object) => {
                    setDisplayDoc(display_doc_object.data);
                    setDisplayToc(display_toc_object.data)

                }))
                .catch(error => {
                    console.log(error);
                });
        
    }, [doc, default_language]);
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
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px", display: { xs: 'none', sm: 'block' } }} />
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
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px", display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }} />
                        <Grid item xs={0} sm={2}>
                            <Box m={2} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
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