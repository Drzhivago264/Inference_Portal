import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min";
require("prismjs/components/prism-c");
require("prismjs/components/prism-python");
require("prismjs/components/prism-bash");
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../component/navbar';
import { VerticalNav } from '../component/vertical_nav';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { MuiMarkdown, getOverrides } from 'mui-markdown';
import Typography from '@mui/material/Typography';
import { TypeAnimation } from 'react-type-animation';
import introduction_ from '../../docs/PageContent/introduction.md'
import { Highlight, themes } from 'prism-react-renderer';
import Footer from '../component/footer';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../component/css/background_video.css'
function Information() {
    useEffect(() => {
        Prism.highlightAll();
    });
    const videoRef = useRef(null);
    const [intro, setMessage] = useState('');
    const [videoloaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        axios.all([
            axios.get(introduction_),
        ])
            .then(axios.spread((intro_object) => {
                setMessage(intro_object.data);
            }))
            .catch(error => {
                console.log(error);
            });
        if (videoRef) {
            videoRef.current.play();
            setVideoLoaded(true)
        }
    }, []);
    const [destination, setDestination] = React.useState(null)
    const navigate = useNavigate();
    React.useEffect(() => {
        if (destination) {
            navigate(destination, { replace: true })
        }
    }, [destination]);
    return (
        <Container maxWidth={false} disableGutters>
            <div className="video-container">
                <video ref={videoRef} className='videoTag' autoPlay loop muted playsinline disablePictureInPicture controlsList="nodownload" onPlay={() => { console.log('yeet'); setVideoLoaded(true) }}>
                    <source src="/static/video/introduction_background.mp4" type='video/mp4' />
                </video>
            </div>
            <title>Introduction</title>
            <ResponsiveAppBar />
            {!videoloaded && <Container maxWidth="lg" ><Stack mt={{ xs: 75 }} spacing={1}>
                <Skeleton variant="rounded" animation="wave" height={350} />
                <Skeleton variant="rounded" animation="wave" height={350} />
                <Skeleton variant="rounded" animation="wave" height={300} />
            </Stack>
            </Container>
            }
            {videoloaded && <Container maxWidth="lg">
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        width: 1,
                        mt: { xs: 12, sm: 12, md: 15, lg: 17 },
                        height: { xs: "240px", sm: '270px', md: '220px', lg: '180px' },
                        fontSize: { xs: "1.3em", sm: '1.5em', md: '1.75em' },

                    },
                }}>
                    <Box sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, .25)' : 'rgba(255, 255, 255, .25)', borderRadius: '12px' }} >
                        <TypeAnimation style={{ whiteSpace: 'pre-line', display: 'inline-block', padding: '20px', lineHeight: 1.7, }}
                            sequence={[
                                `Newspaper, radio, television, the internet, social media and now large language models.`,
                                1500,
                                `Newspaper, radio, television, the internet, social media and now large language models.\nWe are building a new medium for your voices.`,
                                1500,
                                "Newspaper, radio, television, the internet, social media and now large language models.\nWe are building a new medium for your voices. \n Or the voice that you want to be heard.",
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
                <Grid mt={{ xs: 15, sm: 15, md: 18, lg: 20 }} container spacing={0}>
                    <Grid item sm={12} md={8} lg={10}>
                        <Box mt={5} mb={5} p={1}>
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

                            }}>{intro}</MuiMarkdown>
                            <Typography mt={2}>
                                The two examples below can be currently generated by a popular large language model. In fact, we just input the prompts into our chatbots.
                                You can generate a key and try it by yourself.
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
                                        Prompt: You are an educated man in your 20s, you believe in equality, freedom and justice. You must response to the following sentence based on what you believe in. <br></br>
                                        Sentence: The reality is deterministic, there is no freedom.
                                    </Typography>
                                    <Divider></Divider>
                                    <TypeAnimation style={{ whiteSpace: 'pre-line', display: 'block', padding: '10px', lineHeight: 1.7, }}
                                        sequence={[

                                            `Answer: I respectfully disagree. The concept of determinism suggests that every event, including human cognition and behavior, decision and action, is causally determined by an unbroken chain of prior occurrences. While this view might hold some scientific grounding, it undermines the essence of human agency and free will. I believe in freedom - the ability to choose, to act, to shape our own destiny. This freedom is what allows us to learn, grow, and make decisions that can change the course of our lives. Even if some aspects of reality are deterministic, it doesn't negate the existence of personal freedom.`,
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
                                The current models are pretty smart, they have a great understanding of human society. At least, they understand Western society that generates the majority of their training datasets.
                                Imagine we can train our own models (smaller, cheaper, and quicker) on our (localised) data to speak up the voices that we want them to speak and at the scale that hardware can support.
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
                                        Prompt: You are a man in your 30s, you come from a working class family, you are tired of paying for your mortgage. You must response to the following sentence based on who you are. <br></br>
                                        Sentence: It is important to raise income taxes for education.
                                    </Typography>
                                    <Divider></Divider>
                                    <TypeAnimation style={{ whiteSpace: 'pre-line', display: 'block', padding: '10px', lineHeight: 1.7, }}
                                        sequence={[
                                            `Answer: While I understand the value of investing in education, I must say that the prospect of raising interest rates and income taxes is a tough pill to swallow for folks like me. Many of us are already struggling to make ends meet, paying mortgages and trying to secure a decent life for our families. It seems like we're always the ones shouldering the burden. I think it's important to find a balance and look at other ways to fund education, without putting the entire weight on the working class.`,
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
                    </Grid>
                    <Grid item md={3} lg={2}>
                        <Box mt={10.32} sx={{ minWidth: 225, display: { xs: 'none', sm: 'none ', md: 'block' } }}>
                            <VerticalNav navigate={setDestination} />
                        </Box>
                    </Grid>
                </Grid>
            </Container >}
            {videoloaded && <Footer />}
        </Container >
    );
}

export default Information;