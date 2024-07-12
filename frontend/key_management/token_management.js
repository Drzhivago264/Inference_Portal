import React, { useContext, useEffect, useState } from 'react';
import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from '@mui/material/styles';
import { Trans, useTranslation } from 'react-i18next';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CreateIcon from '@mui/icons-material/Create';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../component/nav/Footer.js';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import KeyIcon from '@mui/icons-material/Key';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { RandomReveal } from 'react-random-reveal'
import ResponsiveAppBar from '../component/nav/Navbar.js';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import TimerIcon from '@mui/icons-material/Timer';
import Typography from '@mui/material/Typography';
import { UserContext } from '../App.js'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { getCookie } from '../component/getCookie.js';
import { logout } from '../component/checkLogin.js';
import { saveAs } from "file-saver";
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({

    padding: theme.spacing(4),
    ...theme.typography.body2,
}));

function TokenManagement() {
    const { t } = useTranslation();
    let fontsizetheme = createTheme();
    fontsizetheme = responsiveFontSizes(fontsizetheme);
    const [product_objects, setProduct] = useState([]);
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const { is_authenticated, setIsAuthenticated } = useContext(UserContext);

    useEffect(() => {
        axios.all([
            axios.get('/frontend-api/products'),
        ])
            .then(axios.spread((server_object) => {
                setProduct(server_object.data.products);
            }))
            .catch(error => {
                console.log(error);
            });
    }, []);

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
        &:focus-visible {
          outline: 0;
        }
      `,
    );

    const [keycreateloading, setKeyCreateLoading] = useState(false);
    const [keycheckloading, setKeyCheckLoading] = useState(false);
    const [xmrretrieveloading, setXMRRetrieveLoading] = useState(false);
    const [xmrconfirmationloading, setXMRConfirmationLoading] = useState(false);
    const [randomanimation, setRandomAnimation] = useState(false);
    const [key, setKey] = useState("")
    const [keyError, setKeyError] = useState(false)
    const [keynamepay, setKeyNamePay] = useState("")
    const [keynamepayError, setKeyNamePayError] = useState(false)
    const [keyname, setKeyName] = useState("")
    const [ttl, setTTL] = useState(10)
    const [time_unit, setTimeUnit] = useState('day')
    const [keynameError, setKeyNameError] = useState(false)
    const [amount, setAmount] = useState(1)
    const [keycreateresponse, setKeyCreateResponse] = useState(null);
    const [keycreateerror, setKeyCreateError] = useState(null);
    const [keycheckerror, setKeyCheckError] = useState(null);
    const [keycheckresponse, setKeyCheckResponse] = useState(null);
    const [xmrwalleterror, setXMRWalletError] = useState(null);
    const [xmrwalletresponse, setXMRWalletResponse] = useState(null);
    const [xmrconfirmationerror, setXMRConfirmationError] = useState(null);
    const [xmrconfirmationresponse, setXMRConfirmationResponse] = useState(null);
    const [striperedirecterror, setStripeRedirectError] = useState(null);
    const handleCreateKey = (event) => {
        event.preventDefault()
        setKeyCreateLoading(true);
        setKeyCreateResponse(null)
        setKeyNameError(false)
        setRandomAnimation(false)
        if (keyname == '') {
            setKeyCreateLoading(false)
            setKeyNameError(true)
        }
        if (keyname) {
            const csrftoken = getCookie('csrftoken');
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                key_name: keyname,
            }
            axios.post("/frontend-api/generate-key", data, config)
                .then((response) => {
                    setKeyCreateResponse(response.data)
                }).catch(error => {
                    setKeyCreateError(error.response.data.detail)
                });
        }
    }
    const handleCheckKey = (event) => {
        event.preventDefault()
        setKeyCheckError(null)
        setKeyCheckResponse(null)
        setKeyCheckLoading(true)
        setKeyNamePayError(false)
        if (keynamepay == '') {
            setKeyNamePayError(true)
        }
        if (key == '') {
            setKeyError(true)
        }
        if (keynamepay && key) {
            const csrftoken = getCookie('csrftoken');
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                key_name: keynamepay,
                key: key
            }
            axios.post("/frontend-api/check-credit", data, config)

                .then((response) => {
                    setKeyCheckResponse(response.data)
                    setKeyCheckLoading(false)
                }).catch(error => {
                    setKeyCheckError(error.response.data.detail)
                    setKeyCheckLoading(false)
                });
        }

    }
    const handleXMRRetrive = (event) => {
        event.preventDefault()
        setXMRWalletError(null)
        setXMRWalletResponse(null)
        setXMRRetrieveLoading(true)
        setKeyNamePayError(false)
        if (keynamepay == '') {
            setKeyNamePayError(true)
        }
        if (key == '') {
            setKeyError(true)
        }
        if (keynamepay && key) {
            const csrftoken = getCookie('csrftoken');
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                key_name: keynamepay,
                key: key
            }
            axios.post("/frontend-api/get-xmr-wallet", data, config)
                .then((response) => {
                    setXMRWalletResponse(response.data)
                    setXMRRetrieveLoading(false)

                }).catch(error => {
                    setXMRWalletError(error.response.data.detail)
                    setXMRRetrieveLoading(false)
                });
        }
    }
    const handleXMRConfirmation = (event) => {
        event.preventDefault()
        setXMRConfirmationError(null)
        setXMRConfirmationResponse(null)
        setXMRConfirmationLoading(true)
        setKeyNamePayError(false)
        if (keynamepay == '') {
            setKeyNamePayError(true)
        }
        if (key == '') {
            setKeyError(true)
        }
        if (keynamepay && key) {
            const csrftoken = getCookie('csrftoken');
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                key_name: keynamepay,
                key: key
            }
            axios.post("/frontend-api/confirm-xmr-payment", data, config)
                .then((response) => {
                    setXMRConfirmationResponse(response.data)
                    setXMRConfirmationLoading(false)
                }).catch(error => {
                    setXMRConfirmationError(error.response.data.detail)
                    setXMRConfirmationLoading(false)
                });
        }
    }
    const handleStripeRedirect = (event) => {
        event.preventDefault()
        setKeyNamePayError(false)
        if (keynamepay == '') {
            setKeyNamePayError(true)
        }
        if (key == '') {
            setKeyError(true)
        }
        if (keynamepay && key && amount) {
            const csrftoken = getCookie('csrftoken');
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                key_name: keynamepay,
                key: key,
                product_id: amount,
            }
            axios.post("/frontend-api/stripe-redirect", data, config)
                .then((response) => {
                    window.location.replace(response.data.stripe_checkout_url)
                }).catch(error => {
                    console.log(error.response.data.detail)
                    setStripeRedirectError(error.response.data.detai)
                });
        }
    }
    function exportKey(keyfile) {
        var blob = new Blob([keyfile], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "Key_of_ProffesorParakeet_KEEP_IT_SECURE.txt");
    }
    const KeyCreateExport = ({ key_, key_name, integrated_wallet, payment_id }) => {

        return (
            <Box my={4}>
                {!randomanimation && <Box style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }} textAlign='center' my={1}>
                    <Alert severity="info"> Key: <RandomReveal
                        isPlaying
                        duration={4}
                        revealDuration={1.6}
                        characters={key_}
                        onComplete={() => (setRandomAnimation(true), setKeyCreateLoading(false), setIsAuthenticated(true))}

                    /></Alert>
                </Box>}
                {randomanimation && <Alert severity="success" sx={{ whiteSpace: 'pre-line' }}>
                    <AlertTitle>Success</AlertTitle>
                    {t('key_management.key_create_success')}
                </Alert>}
                {randomanimation && <Box textAlign='center' my={4}>
                    <Textarea
                        defaultValue={`Key: ${key_}\nKey Name: ${key_name}\nWallet: ${integrated_wallet} \nPayment id: ${payment_id}`}
                        minRows={4}
                        maxRows={10}
                    />
                    <Box textAlign='center' my={1}>
                        <Button size="small" variant="outlined" onClick={() => exportKey(`Key: ${key_}\nKey Name: ${key_name}\nWallet: ${integrated_wallet} \nPayment id: ${payment_id}`)}>Export Key</Button>
                    </Box>
                </Box>}
            </Box >
        );
    };

    const KeyCheckDisplay = ({ key_, key_name, monero_balance, fiat_balance }) => {
        return (
            <Box my={4}>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {t('key_management.key_check_success')}
                </Alert>
                <Box textAlign='center' mt={4}>
                    <Textarea
                        defaultValue={`Key: ${key_}\nKey Name: ${key_name}\nMonero Balance: ${monero_balance} \nFiat Balance: ${fiat_balance}`}
                        minRows={4}
                        maxRows={10}
                    />
                </Box>
            </Box >
        );
    };



    const ErrorAlert = ({ error }) => {
        return (
            <Box mt={2}>
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
            <title>Token Management</title>
            <ResponsiveAppBar max_width="xl" />
            <Container maxWidth="lg">
                <Box
                    my={1}
                    alignItems="center"
                    gap={4}
                    p={2}
                >
                    <StyledPaper variant="outlined">

                        <Typography variant="h5" >
                            <Box sx={{ lineHeight: 2, fontWeight: '700' }}> Create New Access Token </Box>
                        </Typography>

                        <Box my={4} justifyContent="center" alignItems="center" display="flex" >
                            <form autoComplete="off" onSubmit={handleCreateKey}>
                                <FormControl defaultValue="" required>
                                    <Stack direction='column' spacing={1}>
                                        <TextField
                                            margin="normal"
                                            label="Token Name"
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
                                        <Stack mb={1} direction={{ xs: 'row' }} spacing={1}>
                                            <TextField
                                                id="ttl"
                                                label="Time To Live"
                                                type="number"
                                                size='small'
                                                value={ttl}
                                                onChange={e => setTTL(e.target.value)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <TimerIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <TextField
                                                id="time-unit"
                                                select
                                                label="Unit"
                                                value={time_unit}
                                                onChange={e => setTimeUnit(e.target.value)}
                                                size='small'
                                            >
                                                {['day', 'hour', 'minute', 'second'].map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Stack>
                                        <LoadingButton size="small" loading={keycreateloading} loadingPosition="end" variant="contained" type="submit" endIcon={<LockOpenIcon />}>Generate</LoadingButton>
                                    </Stack>
                                </FormControl>
                            </form>


                        </Box>
                        {keycreateresponse && <KeyCreateExport key_={keycreateresponse.key} key_name={keycreateresponse.key_name} payment_id={keycreateresponse.payment_id} integrated_wallet={keycreateresponse.integrated_wallet} />}
                        {keycreateerror && <ErrorAlert error={keycreateerror} />}

                        <Typography variant="h5" >
                            <Box sx={{ lineHeight: 2, fontWeight: '700', mt: 1 }}>Token permissions</Box>
                        </Typography>

                        <Box m={2}>
                            <Grid container spacing={2}>
                                <Grid item sm={12} md={6}>
                                    <Stack direction='column'>
                                        <FormLabel component="legend">Inference permissions</FormLabel>
                                        <FormControlLabel control={<Checkbox />} label="Make Call to Chatroom via Websocket (Web Browser)" />
                                        <FormControlLabel control={<Checkbox />} label="Make Call to Agents via Websocket (Web Browser)" />
                                        <FormControlLabel control={<Checkbox />} label="Make Call to Toolbox via Websocket (Web Browser)" />
                                        <FormControlLabel control={<Checkbox />} label="Make Call to Data Synthesis via Websocket (Web Browser)" />
                                        <FormControlLabel control={<Checkbox />} label="Make Call to Chat and Text Completion APIs" />
                                        <FormControlLabel control={<Checkbox />} label="Make Call to Agent API" />
                                    </Stack>

                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <Stack direction='column'>
                                        <FormLabel component="legend">Data permissions</FormLabel>
                                        <FormControlLabel control={<Checkbox />} label="Access Log Data (via Web Browser and API)" />
                                        <FormControlLabel control={<Checkbox />} label="Access Cost Data (via Websocket and API)" />
                                        <FormControlLabel control={<Checkbox />} label="Create and Test Agent Template(s)" />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>

                    </StyledPaper>
                </Box>
            </Container >
            <Footer />
        </Container >
    );
}
export default TokenManagement;