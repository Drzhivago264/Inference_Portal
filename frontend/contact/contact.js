import React, { useState } from 'react';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CreateIcon from '@mui/icons-material/Create';
import EmailIcon from '@mui/icons-material/Email';
import Footer from '../component/nav/Footer.js';
import { FormControl } from '@mui/material';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import LoadingButton from '@mui/lab/LoadingButton';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import Stack from '@mui/material/Stack';
import StyledPaper from '../component/custom_ui_component/StyledPaper.js';
import SuccessErrorAlert from '../component/Alert/SuccessErrorAlert.js';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { basePost } from '../api_hook/basePost.js';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';

function Contact() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
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

    const { mutate: postmutate } = useMutation(basePost);
    const handleSendMail = (event) => {
        event.preventDefault()
        setKeyNameError(false)
        setSendLoading(true)
        if (keyname == '') {
            setKeyNameError(true)
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

            const data = {
                key_name: keyname,
                key: key,
                username: username,
                message: message,
                mail: mail
            }
            postmutate({url: "/frontend-api/send-mail", data: data}, {
                onSuccess: (data) => setMailResponse(data),
                onError: (error) => setMailError(error.response.data.detail)
            })
        }
        setSendLoading(false)
    }
    return (
        <Container maxWidth={false} disableGutters>
            <title>{t('contact.Contact')}</title>
            <ResponsiveAppBar max_width="lg"  />
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
                                <Box sx={{ mb: 2, fontWeight: 'bold' }}>{t('contact.Contact')}</Box>
                            </Typography>
                            <form autoComplete="off" onSubmit={handleSendMail}>
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
                                                fullWidth
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
                                        <LoadingButton size="small" loading={sendloading} variant="contained" type="submit" endIcon={<ForwardToInboxIcon />}>Send</LoadingButton>
                                    </Stack>
                                </FormControl>
                            </form>
                        </Box>
                        {mailsentresponse && <SuccessErrorAlert detail={mailsentresponse.detail} type="success"/>}
                        {mailsenterror && <SuccessErrorAlert detail={mailsenterror} type="error"/>}
                    </StyledPaper>
                </Box>
            </Container >
            <Footer />
        </Container>
    );
}

export default Contact;