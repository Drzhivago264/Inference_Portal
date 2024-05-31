import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../component/navbar';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Footer from '../component/footer';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../component/css/background_video.css'
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { TypeWriterText } from '../component/animation_text_change'

function Information() {

    const videoRef = useRef(null);
    const { t, i18n } = useTranslation();
    const [videoloaded, setVideoLoaded] = useState(false);

    useEffect(() => {

        if (videoRef) {
            videoRef.current.play();
            setVideoLoaded(true)
        }
    }, [videoRef]);
    const [destination, setDestination] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        if (destination) {
            navigate(destination, { replace: true })
        }
    }, [destination]);
    return (
        <Container maxWidth={false} disableGutters>
            <div className="video-container">
                <video ref={videoRef} className='videoTag' autoPlay loop muted playsInline disablePictureInPicture controlsList="nodownload" onPlay={() => { setVideoLoaded(true) }}>
                    <source src="/static/video/introduction_background.mp4" type='video/mp4' />
                </video>
            </div>
            <title>Introduction</title>
            <ResponsiveAppBar max_width="xl"  />
            {!videoloaded && <Container maxWidth="lg" ><Stack mt={{ xs: 75 }} spacing={1}>
                <Skeleton variant="rounded" animation="wave" height={350} />
                <Skeleton variant="rounded" animation="wave" height={350} />
                <Skeleton variant="rounded" animation="wave" height={300} />
            </Stack>
            </Container>
            }
            {videoloaded && <Container maxWidth="lg"

            >
                <Box   alignItems="center" justifyContent='center' sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    
                    '& > :not(style)': {
                        width: 1,
                        mt: { xs: 12, sm: 12, md: 15, lg: 17 },
                        height: { xs: "220px", sm: '230px', md: '270px', lg: '180px' },
                        fontSize: { xs: "1.25em", sm: '1.5em', md: '1.75em' },

                    },
                }}>
                    <Box  display="flex" alignItems="center"  sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, .25)' : 'rgba(255, 255, 255, .25)', borderRadius: '12px' }} >
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
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box maxWidth="md"
                        mt={{ xs: 18, sm: 20, md: 20, lg: 22 }}
                    >
                        <Box mt={5} mb={5} p={1} >
                            <Box mt={2} mb={2}>
                                <Typography variant='h4'>
                                    {t('introduction.about_title')}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box mt={2} mb={8}>
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
                            <Box mt={2} mb={2}>
                                <Typography variant='h4'>
                                    {t('introduction.tool_title')}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box mt={2} mb={6}>
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
                            <Box mt={2} mb={2}>
                                <Typography variant='h4'>
                                    {t('introduction.example_title')}
                                </Typography>
                            </Box>
                            <Divider />
                            <Typography mt={2}>
                                {t('introduction.example_chunk_1')}
                            </Typography>
                            <Box mt={1} mb={1} sx={{
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

                                     <TypeWriterText  style={{ whiteSpace: 'pre-line', display: 'block', padding: '10px', lineHeight: 1.7, }}
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
                            <Typography mt={2}>
                                {t('introduction.example_chunk_2')}
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    width: 1,
                                    mt: 2,
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
                                    <TypeWriterText  style={{ whiteSpace: 'pre-line', display: 'block', padding: '10px', lineHeight: 1.7, }}
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
                        </Box>
                    </Box>
                </Box>
            </Container >}
            {videoloaded && <Footer />}
        </Container >
    );
}

export default Information;