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
import authentication_en from '../../docs/Manual/en/authentication_en.md'
import behavior_en from '../../docs/Manual/en/behavior_en.md'
import behavior_toc_en from '../../docs/Manual/en/behavior_toc_en.md'
import key_en from '../../docs/Manual/en/create_key_en.md'
import key_toc_en from '../../docs/Manual/en/create_key_toc_en.md'
import errorlimit_en from '../../docs/Manual/en/error_ratelimit_en.md'
import errorlimit_toc_en from '../../docs/Manual/en/error_ratelimit_toc_en.md'
import inference_en from '../../docs/Manual/en/inference_en.md'
import inference_toc_en from '../../docs/Manual/en/inference_toc_en.md'
import authentication_toc_en from '../../docs/Manual/en/authentication_toc_en.md'
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
import { useQuery } from "react-query";
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import TableOfContents from '../component/TableofContent';
import Paper from '@mui/material/Paper';

const retrieveManual = async (destination_refs, doc, default_language, id) => {
    const response = await axios.get(
        destination_refs[doc][default_language][id]
    );
    return response.data;
}

function Manual() {
    useEffect(() => {
        Prism.highlightAll();
    });
    const { doc } = useParams();
    const [default_language, setDefaultLanguage] = useState(i18next.language)
    const [displaydoc, setDisplayDoc] = useState('')
    const [displaytoc, setDisplayToc] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };



    const destination_refs = {
        key: {
            "en": [key_en, key_toc_en],
            "vi": [key_vi, key_toc_vi]
        },
        authentication: {
            "en": [authentication_en, authentication_toc_en],
            "vi": [authentication_vi, authentication_toc_vi]
        },
        inference: {
            "en": [inference_en, inference_toc_en],
            "vi": [inference_vi, inference_toc_vi]
        },
        errorlimit: {
            "en": [errorlimit_en, errorlimit_toc_en],
            "vi": [errorlimit_vi, errorlimit_toc_vi]
        },
        behavior: {
            "en": [behavior_en, behavior_toc_en],
            "vi": [behavior_vi, behavior_toc_vi]
        },
    }
    const { t, i18n } = useTranslation();

    useEffect(() => {
        setDefaultLanguage(i18n.language)
    }, [i18n.language]);
    useEffect(() => {
        setSelectedIndex(Object.keys(destination_refs).indexOf(doc))
    }, []);
    const docRequest = useQuery(["ManualDocData", destination_refs , doc, default_language], () => retrieveManual(destination_refs, doc, default_language, 0), { staleTime: Infinity, retry: false });

    const tocRequest = useQuery(["ManualTocData", destination_refs, doc, default_language], () => retrieveManual(destination_refs, doc, default_language, 1), { staleTime: Infinity, retry: false });

    useEffect(() => {

        if (docRequest.status === 'success' && docRequest.data) {
            setDisplayDoc(docRequest.data);
        }
        if (tocRequest.status === 'success' && docRequest.data) {
            setDisplayToc(tocRequest.data)
        }


    }, [docRequest.status, tocRequest.status, docRequest.data, tocRequest.data]);
    return (
        <Container maxWidth={false} disableGutters>
            <title>Manual</title>
            <ResponsiveAppBar max_width="xl" />
            <Container maxWidth='xl'>
                <Box
                    display="flex"
                    alignItems="center"
                >
                    <Grid container spacing={1}>
                        <Grid item md={3} lg={2}>
                            <Box mt={3} mb={5} sx={{ display: { xs: 'none', sm: 'none ', md: 'block' } }} >

                                <List dense={true}>
                                    {[{ link: '/frontend/manual/key', tranlate: 'manual.Setting_Up_Your_API_Key' },
                                    { link: '/frontend/manual/authentication', tranlate: 'manual.Authentication' },
                                    { link: '/frontend/manual/inference', tranlate: 'manual.Inference' },
                                    { link: '/frontend/manual/errorlimit', tranlate: 'manual.Common_Errors_and_Ratelimits' },
                                    { link: '/frontend/manual/behavior', tranlate: 'manual.The_Behaviors_of_This_Website' }
                                    ].map((object, index) => {
                                        return (
                                            <ListItemButton
                                                selected={selectedIndex === index}
                                                onClick={(event) => handleListItemClick(event, index)}
                                                key={object.link}
                                                component={Link}
                                                to={object.link}>
                                                <Typography component='span' variant="body2" > {t(object.tranlate)} </Typography>
                                            </ListItemButton>
                                        )
                                    })}

                                </List>

                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px", display: { xs: 'none', sm: 'block' } }} />
                        <Grid item xs={12} md={8} lg={8}>
                          
                            <Box mt={3} sx={{ display: { sm: 'block ', md: 'none' } }} >
                                
                                <List dense={true}>
                                    <ListItemButton component={Link} to='/frontend/manual/key'> <Typography>{t('manual.Setting_Up_Your_API_Key')}  </Typography> </ListItemButton>
                                    <ListItemButton component={Link} to='/frontend/manual/authentication' ><Typography> {t('manual.Authentication')} </Typography> </ListItemButton>
                                    <ListItemButton component={Link} to='/frontend/manual/inference' ><Typography> {t('manual.Inference')} </Typography> </ListItemButton>
                                    <ListItemButton component={Link} to='/frontend/manual/errorlimit' ><Typography> {t('manual.Common_Errors_and_Ratelimits')}  </Typography> </ListItemButton>
                                    <ListItemButton component={Link} to='/frontend/manual/behavior' ><Typography> {t('manual.The_Behaviors_of_This_Website')} </Typography> </ListItemButton>
                                </List>
                            </Box>
                            <Box m={3}>
                                {docRequest.isLoading &&  <Skeleton variant="rounded" animation="wave" height={350} />}
                                {docRequest.error && <Alert variant="outlined" severity="error">
                                    Cannot find the manual from server! Contact us ...
                                </Alert>}
                                {!docRequest.isLoading && <MuiMarkdown overrides={{
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
                                </MuiMarkdown>}
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem sx={{ mr: "-1px", display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }} />
                        <Grid item xs={0} sm={2}>
                            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
                                {displaydoc && <Paper variant='outlined' style={{position: 'fixed', marginTop: 7, width: 270}}> 
                                <Typography m={1} variant= 'body1'>
                                    Table of Contents
                                </Typography>
                                <Divider />
                                <Box mr={2}> <TableOfContents mdfile = {displaydoc} />  </Box> 
                                </Paper> }
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