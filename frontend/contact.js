import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import CreateIcon from '@mui/icons-material/Create';
import { styled } from '@mui/system';
import { FormControl } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ResponsiveAppBar from './component/navbar';
import LoadingButton from '@mui/lab/LoadingButton';
import Footer from './component/footer';
const StyledPaper = styled(Paper)(({ theme }) => ({

    padding: theme.spacing(4),
    ...theme.typography.body2,
}));

function Contact() {
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const [sendloading, setSendLoading] = useState(false);
    const [key, setKey] = useState("")
    const [keyError, setKeyError] = useState(false)
    const [keyname, setKeyName] = useState("")
    const [keynameError, setKeyNameError] = useState(false)
    const [username, setUserName] = useState("")
    const [usernameError, setUserNameError] = useState(false)
    const [mail, setMail] = useState("")
    const [mailError, setMailFieldError] = useState(false)
    const [message, setMessage] = useState("")
    const [messageError, setMessageError] = useState(false)
    const [mailsentresponse, setMailResponse] = useState(null);
    const [mailsenterror, setMailError] = useState(false);

    const handleCreateKey = (event) => {
        event.preventDefault()
        setKeyNameError(false)
        setSendLoading(true)
        if (keyname == '') {
            setKeyNameError(true)
        }
        if (keyname == '') {
            setKeyError(true)
        }
        if (username == '') {
            setUserNameError(true)
        }
        if (message == '') {
            setMessageError(true)
        }
        if (key == '') {
            setKeyError(true)
        }
        if (mail == '') {
            setMailFieldError(true)
        }
        if (keyname && key && username && message && mail) {
            const csrftoken = getCookie('csrftoken');
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                key_name: keyname,
                key: key,
                username: username,
                message: message,
                mail: mail
            }
            axios.post("/frontend-api/send-mail", data, config)
                .then((response) => {
                    setMailResponse(response.data)
                }).catch(error => {
                    setMailError(error.response.data.detail)
                });
        }
        setSendLoading(false)
    }
    const ErrorAlert = ({ error }) => {
        return (
            <Box mt={4}>
                <Typography variant="body1"  >
                    Request Failed!
                </Typography>
                <Box textAlign='center' my={2}>
                    <Alert variant="filled" severity="error">
                        {error}
                    </Alert>
                </Box>
            </Box >
        );
    };

    const SuccessAlert = ({ detail }) => {
        return (
            <Box mt={4}>
                <Typography variant="body1"  >
                    Request Successed!
                </Typography>
                <Box textAlign='center' my={2}>
                    <Alert variant="filled" severity="success">
                        {detail}
                    </Alert>
                </Box>
            </Box >
        );
    };
    return (
        <Container maxWidth={false} disableGutters>
            <title>Contact</title>
            <ResponsiveAppBar />
            <Container maxWidth="md">
                <Box
                    my={1}
                    alignItems="center"
                    gap={4}
                    p={2}
                >
                    <StyledPaper variant="outlined">
                        <Box textAlign='center' my={4}>
                            <Typography variant="h4" >
                                <Box sx={{ mb: 2, fontWeight: 'bold' }}>Contact Us</Box>
                            </Typography>
                            <form autoComplete="off" onSubmit={handleCreateKey}>
                                <FormControl defaultValue="" margin='normal' required>
                                    <Stack direction={{ xs: 'column' }} spacing={1}>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                                            <TextField
                                                margin="normal"
                                                label="Key Name"
                                                type="text"
                                                size="small"
                                                onChange={e => setKeyName(e.target.value)}
                                                value={keyname}
                                                error={keynameError}
                                                autoComplete="off"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CreateIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
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
                                        </Stack>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                                            <TextField
                                                margin="normal"
                                                label="Your Name"
                                                type="text"
                                                size="small"
                                                onChange={e => setUserName(e.target.value)}
                                                value={username}
                                                error={usernameError}
                                                autoComplete="off"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccountBoxIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <TextField
                                                m={1}
                                                margin="normal"
                                                label="Email"
                                                type="text"
                                                size="small"
                                                onChange={e => setMail(e.target.value)}
                                                value={mail}
                                                error={mailError}
                                                autoComplete="off"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EmailIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Stack>
                                        <TextField
                                            p={1}
                                            id="filled-multiline-flexible"
                                            label="Message"
                                            multiline
                                            rows={4}
                                            onChange={e => setMessage(e.target.value)}
                                            value={message}
                                            error={messageError}
                                        />
                                        <LoadingButton size="small" loading={sendloading}  variant="contained" type="submit" endIcon={<ForwardToInboxIcon />}>Send</LoadingButton>
                                    </Stack>
                                </FormControl>
                            </form>
                        </Box>
                        {mailsentresponse && <SuccessAlert detail={mailsentresponse.detail} />}
                        {mailsenterror && <ErrorAlert error={mailsenterror} />}
                    </StyledPaper>
                </Box>
            </Container >
            <Footer />
        </Container>
    );
}

export default Contact;