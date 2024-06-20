import React, { useState, useContext } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import ResponsiveAppBar from '../component/navbar.js';
import { Link, useNavigate } from "react-router-dom";
import { FormControl, FormLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import Divider from '@mui/material/Divider';
import Footer from '../component/footer.js';
import { UserContext } from '../App.js'
import { getCookie } from '../component/getCookie.js';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Snackbar from '@mui/material/Snackbar';


function Hub() {
    const { is_authenticated, setIsAuthenticated } = useContext(UserContext);
    const theme = useTheme();
    const check_orientation = useMediaQuery(theme.breakpoints.down("md")) ? "horizontal" : "vertical";
    const { t, i18n } = useTranslation();

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
                .then((response) => {
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
                        navigate(response.data.redirect_link, { replace: true, state: { credential: key } });
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
                            <Box m={1}>
                                <CardActionArea onClick={() => { redirect('chat') }}>
                                    <Card sx={{ display: 'flex' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5">
                                                    {t('redirect.Chatbot_Mode')}
                                                </Typography>
                                                <Typography variant="subtitle1"
                                                    sx={{
                                                        display: '-webkit-box',
                                                        overflow: 'hidden',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: 5,
                                                    }} color="text.secondary" component="div">
                                                    {t('redirect.Chatbot_Mode_Content')}
                                                </Typography>
                                            </CardContent>

                                            <CardActions >
                                                <Button component="span" size="small" color="primary">
                                                    {t('redirect.Redirect')}
                                                </Button>
                                            </CardActions>
                                        </Box>
                                        {!image_1_loaded && <CardMedia sx={{ width: 200, height: 200 }}>
                                            <Skeleton animation="wave" height={200} width={200} />
                                        </CardMedia>}
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 200, display: image_1_loaded ? "block" : "none" }}
                                            image="https://static.professorparakeet.com/image/robot_line.jpg"
                                            onLoad={() => { setImage1Load(true) }}
                                        />
                                    </Card>
                                </CardActionArea>
                            </Box>
                            <Box m={1}>
                                <CardActionArea onClick={() => { redirect('engineer') }}>
                                    <Card sx={{ display: 'flex' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5">
                                                    {t('redirect.Agent_Mode')}
                                                </Typography>
                                                <Typography variant="subtitle1"
                                                    sx={{
                                                        display: '-webkit-box',
                                                        overflow: 'hidden',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: 5,
                                                    }}
                                                    color="text.secondary" component="div">
                                                    {t('redirect.Agent_Mode_Content')}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button component="span" size="small" color="primary">
                                                    {t('redirect.Redirect')}
                                                </Button>
                                            </CardActions>
                                        </Box>
                                        {!image_2_loaded && <CardMedia sx={{ width: 200, height: 200 }}>
                                            <Skeleton animation="wave" height={200} width={200} />
                                        </CardMedia>}
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 200, display: image_2_loaded ? "block" : "none" }}
                                            image="https://static.professorparakeet.com/image/Robot_folow_instruct.jpg"
                                            onLoad={() => { setImage2Load(true) }}
                                        />
                                    </Card>
                                </CardActionArea>
                            </Box>
                            <Box m={1}>
                                <CardActionArea onClick={() => { redirect('toolbox') }}>
                                    <Card sx={{ display: 'flex' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5">
                                                    {t('redirect.LLM_Functions')}
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{
                                                    display: '-webkit-box',
                                                    overflow: 'hidden',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 5,
                                                }}
                                                    color="text.secondary" component="div">
                                                    {t('redirect.LLM_Functions_Content')}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button component="span" size="small" color="primary">
                                                    {t('redirect.Redirect')}
                                                </Button>
                                            </CardActions>
                                        </Box>
                                        {!image_3_loaded && <CardMedia sx={{ width: 200, height: 200 }}>
                                            <Skeleton animation="wave" height={200} width={200} />
                                        </CardMedia>}
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 200, display: image_3_loaded ? "block" : "none" }}
                                            image="https://static.professorparakeet.com/image/Robot_label.jpg"
                                            onLoad={() => { setImage3Load(true) }}
                                        />

                                    </Card>
                                </CardActionArea>
                            </Box>
                            <Box m={1}>
                                <CardActionArea onClick={() => { redirect('hotpot') }}>
                                    <Card sx={{ display: 'flex' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5">
                                                    {t('redirect.Hotpot_Mode')}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        display: '-webkit-box',
                                                        overflow: 'hidden',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: 5,
                                                    }}
                                                    variant="subtitle1" color="text.secondary" component="div">
                                                    {t('redirect.Hotpot_Mode_Content')}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button component="span" size="small" color="primary">
                                                    {t('redirect.Redirect')}
                                                </Button>
                                            </CardActions>
                                        </Box>
                                        {!image_4_loaded && <CardMedia sx={{ width: 200, height: 200 }}>
                                            <Skeleton animation="wave" height={200} width={200} />
                                        </CardMedia>}
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 200, display: image_4_loaded ? "block" : "none" }}
                                            image="https://static.professorparakeet.com/image/face_to_face.jpeg"
                                            onLoad={() => { setImage4Load(true) }}
                                        />
                                    </Card>
                                </CardActionArea>
                            </Box>

                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Container>
    );
}

export default Hub;