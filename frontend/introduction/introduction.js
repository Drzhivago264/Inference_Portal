import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../component/navbar';
import Typography from '@mui/material/Typography';
import Footer from '../component/footer';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { TypeWriterText } from '../component/animation_text_change'
import Slide from '@mui/material/Slide';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
function Information() {
    const { t, i18n } = useTranslation();
    const [destination, setDestination] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        if (destination) {
            navigate(destination, { replace: true })
        }
    }, [destination]);

    return (
        <Container maxWidth={false} disableGutters>
            <title>Introduction</title>
            <ResponsiveAppBar max_width="xl" timeout={2000} />

            <Container maxWidth="xxl"

            >
                <Grid container spacing={1} justify="flex-end"
                    alignItems="center" mt={{ xs:5, xl:0 }} >
                    <Grid item lg={12} xl={4} >
                        <Slide direction="right" in={true} timeout={1500} mountOnEnter unmountOnExit>
                            <Box ml={2}  >

                                <Typography variant='h2' style={{ fontWeight: 600 }}>
                                    {t('introduction.introduction_title')}
                                </Typography>
                                <Typography mt={3} variant='body1'>
                                    {t('introduction.introduction_explain')}
                                </Typography>

                                <Stack mt={5} direction='row' spacing={2}>
                                    <Button variant="contained" size="large" href="/frontend/key-management">
                                        Get Started
                                    </Button>
                                    <Button variant="outlined" size="large" href="/frontend/manual/key">
                                        Manual
                                    </Button>
                                </Stack>

                            </Box>
                        </Slide>
                    </Grid>
                    <Grid item lg={12} xl={8}>
                        <Box mr={2} mt={5} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                            <Slide direction="left" in={true} timeout={1000} mountOnEnter unmountOnExit>
                                <Paper square={false}>

                                    <CardMedia
                                        component="img"
                                        image="https://d2f6jmzr77qqg6.cloudfront.net/image/show_case.png"
                                        sx={{ objectFit: "contain", borderRadius: '3px', }}
                                    />

                                </Paper>
                            </Slide>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box maxWidth="md"

                    >
                        <Slide direction="up" in={true} timeout={2000} mountOnEnter unmountOnExit>

                            <Stack mt={5} mb={5} direction='column' spacing={5}>
                                <Paper variant='outlined'>
                                    <Box mt={2} ml={2} mb={1}>
                                        <Typography variant='h4'>
                                            {t('introduction.about_title')}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box m={2}>
                                        <Typography >
                                            {t('introduction.about_chunk_1')}
                                        </Typography>
                                        <Box ml={4}>
                                            <List sx={{ listStyleType: 'disc' }}>
                                                {t('introduction.user_list', { returnObjects: true }).map(l => (
                                                    < ListItem key={l} sx={{ display: 'list-item' }} >{l}</ListItem>
                                                )
                                                )
                                                }
                                            </List>
                                        </Box>
                                        <Typography style={{ whiteSpace: 'pre-line' }}>
                                            {t('introduction.about_chunk_2')}
                                        </Typography>
                                    </Box>
                                </Paper>
                                <Paper variant='outlined'>
                                    <Box mt={2} ml={2} mb={1} >
                                        <Typography variant='h4'>
                                            {t('introduction.tool_title')}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box m={2}>
                                        <Typography >
                                            {t('introduction.tool_chunk_1')}
                                        </Typography>
                                        <Box ml={4}>
                                            <List sx={{ listStyleType: 'disc' }}>
                                                {t('introduction.tool_list', { returnObjects: true }).map(l => (
                                                    < ListItem key={l} sx={{ display: 'list-item' }} >{l}</ListItem>
                                                )
                                                )
                                                }
                                            </List>
                                        </Box>
                                        <Typography >
                                            {t('introduction.tool_chunk_2')}
                                        </Typography>
                                        <Box ml={4}>
                                            <List sx={{ listStyleType: 'disc' }}>
                                                {t('introduction.call_to_act_list', { returnObjects: true }).map(l => (
                                                    < ListItem key={l} sx={{ display: 'list-item' }} >{l}</ListItem>
                                                )
                                                )
                                                }
                                            </List>
                                        </Box>
                                    </Box>
                                </Paper>
                                <Paper variant='outlined'>
                                    <Box mt={2} ml={2} mb={1} >
                                        <Typography variant='h4'>
                                            {t('introduction.example_title')}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Typography m={2}>
                                        {t('introduction.example_chunk_1')}
                                    </Typography>
                                    <Box m={1} sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        '& > :not(style)': {
                                            width: 1,
                                            height: { xs: "250px" },
                                            overflow: 'auto',
                                            fontSize: { xs: "1em" }
                                        }
                                    }}>

                                        <Paper variant="outlined">
                                            <Typography variant='body1' style={{ whiteSpace: 'pre-line', display: 'block', padding: '10px', lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                                                {t('introduction.example_1')}
                                            </Typography>
                                            <Divider></Divider>

                                            <TypeWriterText style={{ whiteSpace: 'pre-line', display: 'block', padding: '10px', lineHeight: 1.7, }}
                                                sequence={[
                                                    t('introduction.example_1_answer'),
                                                    3000,
                                                    ''
                                                    ,
                                                    () => {
                                                    },
                                                ]}
                                                wrapper="span"
                                                cursor={true}
                                                repeat={Infinity}
                                                speed={120}
                                                deletionSpeed={90}
                                            />

                                        </Paper>
                                    </Box>

                                    <Typography m={2}>
                                        {t('introduction.example_chunk_2')}
                                    </Typography>
                                    <Box m={1} sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        '& > :not(style)': {
                                            width: 1,
                                            height: { xs: "250px" },
                                            overflow: 'auto',
                                            fontSize: { xs: "1em" }
                                        }
                                    }}>
                                        <Paper variant="outlined">
                                            <Typography variant='body1' style={{ whiteSpace: 'pre-line', display: 'block', padding: '10px', lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                                                {t('introduction.example_2')}
                                            </Typography>
                                            <Divider></Divider>
                                            <TypeWriterText style={{ whiteSpace: 'pre-line', display: 'block', padding: '10px', lineHeight: 1.7, }}
                                                sequence={[
                                                    t('introduction.example_2_answer'),
                                                    3000,
                                                    ''
                                                    ,
                                                    () => {
                                                    },
                                                ]}
                                                wrapper="span"
                                                cursor={true}
                                                repeat={Infinity}
                                                speed={120}
                                                deletionSpeed={90}
                                            />

                                        </Paper>
                                    </Box>
                                </Paper>
                            </Stack>
                        </Slide>
                    </Box>
                </Box>

            </Container >
            <Footer />

        </Container >
    );
}

export default Information;