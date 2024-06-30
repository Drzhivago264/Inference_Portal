import React, { useState, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/system';
import { FormControl } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import LoadingButton from '@mui/lab/LoadingButton';
import Footer from '../component/nav/Footer.js';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App.js'
import Divider from '@mui/material/Divider';
import { getCookie } from '../component/getCookie.js';
const StyledPaper = styled(Paper)(({ theme }) => ({

    padding: theme.spacing(4),
    ...theme.typography.body2,
}));

function Contact() {
    const [showPassword, setShowPassword] = React.useState(false);
    const { is_authenticated, setIsAuthenticated } = useContext(UserContext);
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState("")
    const [keyError, setKeyError] = useState(false)

    const [loginerror, setLoginError] = useState(false);
    const handleLogin = (event) => {
        event.preventDefault()
        setLoading(true)
        if (key == '') {
            setKeyError(true)
        }
        if (key) {
            console.log(key)
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
                });
        }
        setLoading(false)
    }
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


    return (
        <Container maxWidth={false} disableGutters>
            <title>Login</title>
            <ResponsiveAppBar max_width="xl" />
            <Container maxWidth="sm">
                <Box
                    my={1}
                    alignItems="center"
                    gap={4}
                    p={2}
                >
                    <StyledPaper variant="outlined">
                        <Box textAlign='center' my={1}>
                            <Typography variant="h4" >
                                <Box sx={{ mb: 1, fontWeight: 'bold' }}>Login</Box>
                            </Typography>
                            <Box sx={{ p: 2 }}>
                                <form autoComplete="off" onSubmit={handleLogin}>
                                    <FormControl defaultValue="" margin='normal' required>
                                        <Stack direction={{ xs: 'column' }} spacing={1}>

                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                label="Key"
                                                type={showPassword ? 'text' : 'password'}
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
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />

                                            <LoadingButton loading={loading} variant="contained" type="submit" endIcon={<LoginIcon />}>Login</LoadingButton>
                                        </Stack>

                                    </FormControl>
                                </form>
                            </Box>
                            <Divider />
                            <Box sx={{ pt: 4 }}>
                                <LoadingButton size="medium" variant="contained" component={Link} to='/frontend/key-management'>  Create New Key </LoadingButton>
                            </Box>
                        </Box>

                        {loginerror && <ErrorAlert error={loginerror} />}
                    </StyledPaper>
                </Box>
            </Container >
            <Footer />
        </Container>
    );
}

export default Contact;