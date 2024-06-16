import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../component/navbar';
import Typography from '@mui/material/Typography';
import Footer from '../component/footer';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../component/css/background_video.css'
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { TypeWriterText } from '../component/animation_text_change'
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import ReactPlayer from "react-player";
import Backdrop from '@mui/material/Backdrop';
import { ParticleBackground } from '../component/particle';
import { Stack } from '@mui/material';

function Information() {
    const { t, i18n } = useTranslation();
    const [videoloaded, setVideoLoaded] = useState(false);
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

            {videoloaded && <ResponsiveAppBar max_width="xl" timeout={2000} /> }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={!videoloaded}
            >
            </Backdrop>
            <div className='player-container'>
                <div className='video-container'>
                    <ReactPlayer
                        style={{ pointerEvents: "none" }}
                        url={[
                            { src: "https://d2f6jmzr77qqg6.cloudfront.net/video/introduction_background.mp4", type: 'video/mp4' },
                            { src: "/static/video/introduction_background.mp4", type: 'video/mp4' },
                        ]}
                        className="react-player"
                        playing={true}
                        loop={true}
                        controls={false}
                        playsinline={true}
                        muted={true}
                        width="100%"
                        height="100%"
                        onPlay={() => { setVideoLoaded(true) }}
                    />
                </div>
            </div>
        
            {videoloaded && <Container maxWidth="lg"

            >
                   
                <Box alignItems="center" justifyContent='center' sx={{
                    display: 'flex',
                    flexWrap: 'wrap',

                    '& > :not(style)': {
                        width: 1,
                        mt: { xs: 12, sm: 12, md: 15, lg: 17 },
                        height: { xs: "220px", sm: '230px', md: '270px', lg: '180px' },
                        fontSize: { xs: "1.25em", sm: '1.5em', md: '1.75em' },

                    },
                }}>
                     <ParticleBackground />
                    <Fade in={videoloaded} timeout={2000}>
                        <Box display="flex" alignItems="center" sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, .25)' : 'rgba(255, 255, 255, .25)', borderRadius: '12px' }} >
                            <TypeWriterText style={{ whiteSpace: 'pre-line', display: 'block', padding: '20px', lineHeight: 1.7, }}
                                sequence={[
                                    t('introduction.introduction_animation', { returnObjects: true })[0],
                                    1500,
                                    t('introduction.introduction_animation', { returnObjects: true })[1],
                                    1500,
                                    t('introduction.introduction_animation', { returnObjects: true })[2],
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

                        </Box>
                    </Fade>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box maxWidth="md"
                        mt={{ xs: 14, sm: 12, md: 10, lg: 16, xl: 22 }}
                    >
                        <Grow in={videoloaded} style={{ transformOrigin: '0 0 0' }} {...(videoloaded ? { timeout: 2000 } : {})}>

                            <Stack mt={5} mb={5}  direction='column' spacing={5}>
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
                                    <Box m={1}  sx={{
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
                        </Grow>
                    </Box>
                </Box>

            </Container >}
            {videoloaded && <Footer />}
        
        </Container >
    );
}

export default Information;