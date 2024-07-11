import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Footer from '../component/nav/Footer.js';
import { FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { RedirectMediaCards } from '../component/RedirectMediaCard.js';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UserContext } from '../App.js'
import axios from 'axios';
import { getCookie } from '../component/getCookie.js';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next';

function Hub() {
    const { is_authenticated, setIsAuthenticated } = useContext(UserContext);
    const theme = useTheme();
    const check_orientation = useMediaQuery(theme.breakpoints.down("md")) ? "horizontal" : "vertical";
    const { t } = useTranslation();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState("")
    const [keyError, setKeyError] = useState(false)
    const [loginerror, setLoginError] = useState(false);
    const [redirecterror, setRedirectError] = useState(null);
    const [opensnack, setOpenSnack] = useState(false)
    const [image_1_loaded, setImage1Load] = useState(false)
    const [image_2_loaded, setImage2Load] = useState(false)
    const [image_3_loaded, setImage3Load] = useState(false)
    const [image_4_loaded, setImage4Load] = useState(false)
    const [image_5_loaded, setImage5Load] = useState(false)
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const handleLogin = (event) => {
        event.preventDefault()
        setLoading(true)
        setKeyError(false)
        setLoginError(false)
        if (key == '') {
            setKeyError(true)

        }
        if (key) {
            const csrftoken = getCookie('csrftoken');
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                key: key,
            }
            axios.post("/frontend-api/login", data, config)
                .then(() => {
                    setIsAuthenticated(true)
                    navigate('/frontend/hub');
                }).catch(error => {
                    setLoginError(error.response.data.detail)
                    setKeyError(false)
                    setRedirectError(false)
                });
        }
        setLoading(false)
    }
    const LoginErrorAlert = ({ error }) => {
        return (
            <Box mt={4}>
                <Typography variant="body1"  >
                    Request Failed!
                </Typography>
                <Box textAlign='center'>
                    <Alert variant="filled" severity="error">
                        {error}
                    </Alert>
                </Box>
            </Box >
        );
    };

    const ErrorAlert = ({ error }) => {
        return (
            <Box mt={4}>
                <Typography variant="body1"  >
                    Request Failed!
                </Typography>
                <Box textAlign='center'>
                    <Alert variant="filled" severity="error">
                        {error}
                    </Alert>
                </Box>
            </Box >
        );
    };
    const redirect = (destination) => {
        setKeyError(false)
        setLoginError(false)
        if (!is_authenticated && key == '') {
            setKeyError(true)
            setOpenSnack(true)
        }
        else {
            if (destination) {
                const csrftoken = getCookie('csrftoken');
                const config = {
                    headers: {
                        'content-type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    }
                }
                const data = {
                    key: key,
                    check_login: is_authenticated,
                    destination: destination
                }
                axios.post("/frontend-api/hub-redirect", data, config)
                    .then((response) => {
                        setIsAuthenticated(true)
                        navigate(response.data.redirect_link, { replace: true });
                    }).catch(error => {
                        setRedirectError(error.response.data.detail)
                        if (error.response.status == "400") {
                            setRedirectError("Your key is incorrect")
                        }
                    });
            }
        }
    }
    return (
        <Container maxWidth={false} disableGutters>
            <title>Hub</title>
            <ResponsiveAppBar max_width="xl" />
            <Container maxWidth="lg">
                <Snackbar
                    open={opensnack}
                    autoHideDuration={5000}
                    onClose={handleCloseSnack}
                   
                >
                    <Alert
                        onClose={handleCloseSnack}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        You need an API key!
                    </Alert>
                </Snackbar>
                <Box
                    my={1}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                >
                    <Grid container alignItems="center"
                        justify="center" direction="column" spacing={2}>
                        {!is_authenticated && <Grid item md={12} lg={12}>
                            <form autoComplete="off" onSubmit={handleLogin}>
                                <FormControl defaultValue="" required>
                                    <Stack ml={1} mt={3} direction={{ xs: "column", md: "row" }} spacing={{ xs: 1, md: 1 }}>
                                        <TextField
                                            margin="normal"
                                            label="Key"
                                            type="password"
                                            size="small"
                                            onChange={e => setKey(e.target.value)}
                                            value={key}
                                            error={keyError}
                                            autoComplete="off"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <KeyIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <LoadingButton loading={loading} variant="contained" type="submit" endIcon={<LoginIcon />}>Login</LoadingButton>
                                        <Divider orientation={check_orientation}
                                            flexItem={true} />

                                        <LoadingButton variant="contained" component={Link} to='/frontend/key-management'>  Create New Key </LoadingButton>

                                    </Stack>
                                    {loginerror && <LoginErrorAlert error={loginerror} />}
                                    {redirecterror && <ErrorAlert error={redirecterror} />}
                                </FormControl>
                            </form>
                        </Grid>
                        }
                        <Grid item md={12} lg={12}>
                        <RedirectMediaCards
                                image_link={"https://static.professorparakeet.com/image/robot_line.jpg"}
                                redirect={redirect}
                                destination={'chat'}
                                image_loaded={image_1_loaded}
                                setImageLoad={setImage1Load}
                                t={t}
                                name={'Chatbot_Mode'}
                            />
                            <RedirectMediaCards
                                image_link={"https://static.professorparakeet.com/image/Robot_folow_instruct.jpg"}
                                redirect={redirect}
                                destination={'engineer'}
                                image_loaded={image_2_loaded}
                                setImageLoad={setImage2Load}
                                t={t}
                                name={'Agent_Mode'}
                            />
                            <RedirectMediaCards
                                image_link={"https://static.professorparakeet.com/image/Robot_label.jpg"}
                                redirect={redirect}
                                destination={'toolbox'}
                                image_loaded={image_3_loaded}
                                setImageLoad={setImage3Load}
                                t={t}
                                name={'LLM_Functions'}
                            />
                            <RedirectMediaCards
                                image_link={"https://static.professorparakeet.com/image/face_to_face.jpeg"}
                                redirect={redirect}
                                destination={'hotpot'}
                                image_loaded={image_4_loaded}
                                setImageLoad={setImage4Load}
                                t={t}
                                name={'Hotpot_Mode'}
                            />
                            <RedirectMediaCards
                                image_link={"/static/image/data_synthesis.jpg"}
                                redirect={redirect}
                                destination={'data-synthesis'}
                                image_loaded={image_5_loaded}
                                setImageLoad={setImage5Load}
                                t={t}
                                name={'Data_Synthesis'}
                            />
                           

                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Container>
    );
}

export default Hub;