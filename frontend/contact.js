import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import KeyIcon from '@mui/icons-material/Key';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { styled } from '@mui/system';
import { FormControl, FormLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Divider from '@mui/material/Divider';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { saveAs } from "file-saver";
import EmailIcon from '@mui/icons-material/Email';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ResponsiveAppBar from './navbar';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
const StyledPaper = styled(Paper)(({ theme }) => ({

    padding: theme.spacing(4),
    ...theme.typography.body2,
}));

function Contact() {

    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        width:100%;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
    );
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

    const StickyBox = styled(Box)`
        position: -webkit-sticky;
        position: sticky;
        display: inline-block;
        top: 100px;
        `;

    const [key, setKey] = useState("")
    const [keyError, setKeyError] = useState(false)
    const [keyname, setKeyName] = useState("")
    const [keynameError, setKeyNameError] = useState(false)
    const [username, setUserName] = useState("")
    const [usernameError, setUserNameError] = useState(false)
    const [mail, setMail] = useState("")
    const [mailError, seMailError] = useState(false)
    const [message, setMessage] = useState("")
    const [messageError, setMessageError] = useState(false)
    const [mailsentresponse, setMailResponse] = useState(null);
    const [mailsenterror, setMailError] = useState(false);

    const handleCreateKey = (event) => {
        event.preventDefault()
        setKeyNameError(false)
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
            setMailError(true)
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
                    <Alert variant="filled" severity="error">
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
            <Container maxWidth="lg">
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
                                        <Button size="small" variant="contained" type="submit" endIcon={<ForwardToInboxIcon />}>Send Mail</Button>
                                    </Stack>
                                </FormControl>
                            </form>
                        </Box>
                        {mailsentresponse && <SuccessAlert detail={mailsentresponse.detail} />}
                        {mailsenterror && <ErrorAlert error={mailsenterror} />}
                    </StyledPaper>
                </Box>
            </Container >
        </Container>
    );
}

export default Contact;