import React, { useState, useEffect, useContext } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import Alert from '@mui/material/Alert';
import KeyIcon from '@mui/icons-material/Key';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import CreateIcon from '@mui/icons-material/Create';
import LoadingButton from '@mui/lab/LoadingButton';
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
import { useTranslation, Trans } from 'react-i18next';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { saveAs } from "file-saver";
import { RandomReveal } from 'react-random-reveal'
import SvgIcon from '@mui/material/SvgIcon';
import Footer from '../component/nav/Footer.js';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import AlertTitle from '@mui/material/AlertTitle';
import { logout } from '../component/checkLogin.js';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { UserContext } from '../App.js'
import { getCookie } from '../component/getCookie.js';
const StyledPaper = styled(Paper)(({ theme }) => ({

    padding: theme.spacing(4),
    ...theme.typography.body2,
}));

function KeyManagement() {
    const { t, i18n } = useTranslation();
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

    const XMRWalletDisplay = ({ key_, key_name, integrated_wallet, payment_id }) => {
        return (
            <Box my={4}>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {t('key_management.xmr_check_success')}
                </Alert>
                <Box textAlign='center' mt={4}>
                    <Textarea
                        defaultValue={`Key: ${key_}\nKey Name: ${key_name}\nIntergrated Wallet: ${integrated_wallet} \nPayment id: ${payment_id}`}
                        minRows={4}
                        maxRows={10}
                    />
                </Box>
            </Box >
        );
    };
    const XMRWConfirmationDisplay = ({ detail }) => {
        return (
            <Box my={4}>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {t('key_management.xmr_confirmation_success')}
                </Alert>
                <Box textAlign='center' mt={4}>
                    <Textarea
                        defaultValue={`${detail}`}
                        minRows={2}
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
            <title>Key Management</title>
            <ResponsiveAppBar max_width="xl" />
            <Container maxWidth="md">
                <Box
                    my={1}
                    alignItems="center"
                    gap={4}
                    p={2}
                >
                    <StyledPaper variant="outlined">
                        <ThemeProvider theme={fontsizetheme}>
                            <Typography variant="h4" >
                                <Box sx={{ mb: 2, fontWeight: 'bold' }}> {t('key_management.Get_started_with_Professor_Parakeet')}</Box>
                            </Typography>
                        </ThemeProvider>
                        <Typography variant="h5" >
                            <Box sx={{ lineHeight: 2, fontWeight: '700' }}> {t('key_management.1_Create_a_Key')} </Box>
                        </Typography>
                        <Typography variant="body1" >
                        {t('key_management.Start_by_generating_a_random_key_by_giving_it_a_name')}
                        </Typography>
                        <Box my={4} justifyContent="center" alignItems="center" display="flex" >
                            {!is_authenticated && <form autoComplete="off" onSubmit={handleCreateKey}>
                                <FormControl defaultValue="" required>
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
                                        <LoadingButton size="small" loading={keycreateloading} loadingPosition="end" variant="contained" type="submit" endIcon={<LockOpenIcon />}>Generate</LoadingButton>
                                    </Stack>
                                </FormControl>
                            </form>
                            }
                            {is_authenticated && <form autoComplete="off" onSubmit={handleCreateKey}>
                                <FormControl defaultValue="" required>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                                        <TextField
                                            disabled
                                            margin="normal"
                                            label="Key Name"
                                            type="text"
                                            size="small"
                                            defaultValue="You are logged in"
                                            autoComplete="off"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CreateIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Button variant="outlined" onClick={() => { logout(setIsAuthenticated) }} color="error" endIcon={<LogoutIcon />}>Logout</Button>
                                    </Stack>
                                </FormControl>
                            </form>
                            }
                        </Box>
                        {keycreateresponse && <KeyCreateExport key_={keycreateresponse.key} key_name={keycreateresponse.key_name} payment_id={keycreateresponse.payment_id} integrated_wallet={keycreateresponse.integrated_wallet} />}
                        {keycreateerror && <ErrorAlert error={keycreateerror} />}
                        <Divider></Divider>
                        <Typography variant="h5" >
                            <Box sx={{ lineHeight: 2, fontWeight: '700', mt: 1 }}> {t('key_management.2_Add_credit_to_your_key')}</Box>
                        </Typography>
                        <Stack spacing={1}>
                            <Alert variant="outlined" severity="info" sx={{ whiteSpace: 'pre-line' }} >
                                <AlertTitle>Info</AlertTitle>
                                {t('key_management.Info_1')}
                            </Alert>
                            <Alert variant="outlined" severity="warning" sx={{ whiteSpace: 'pre-line' }}>
                                <AlertTitle>Warning</AlertTitle>
                                {t('key_management.Warning_1')}
                            </Alert>
                        </Stack>
                        <Box my={4} >
                            <form autoComplete="off" >

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} mb={2} justifyContent="center" alignItems="center" display="flex" >
                                    <TextField
                                        margin="normal" label="Key Name" type="text" size="small" onChange={e => setKeyNamePay(e.target.value)} value={keynamepay} error={keynamepayError} autoComplete="off"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CreateIcon />
                                                </InputAdornment>
                                            ),
                                        }} />
                                    <TextField
                                        margin="normal"
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
                                    <FormControl defaultValue="" required size="small">
                                        <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={e => setAmount(e.target.value)}
                                            value={amount}
                                            label="Amount"
                                        >
                                            {product_objects.map((product_object) => {
                                                return (
                                                    <MenuItem key={product_object.id} value={product_object.id}>{product_object.name}</MenuItem>
                                                )
                                            })}

                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Accordion defaultExpanded>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography variant="h6" >
                                        {t('key_management.21_Check_credit_balance')} 
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                        {t('key_management.21_info')}
                                        </Typography>
                                        <Box mt={2}>
                                            <LoadingButton loading={keycheckloading} variant="contained" name="checkcredit" onClick={handleCheckKey.bind(this)} type="submit" endIcon={<LocalAtmIcon />}>Check Credit</LoadingButton>
                                        </Box>
                                        {keycheckresponse && <KeyCheckDisplay key_={keycheckresponse.key} key_name={keycheckresponse.key_name} monero_balance={keycheckresponse.monero_balance} fiat_balance={keycheckresponse.fiat_balance} />}
                                        {keycheckerror && <ErrorAlert error={keycheckerror} />}
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Typography variant="h6" >
                                        {t('key_management.22_Pay_by_Stripe')}                                     
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                        {t('key_management.22_info')}
                                        </Typography>
                                        <Box mt={2}>
                                            <Button variant="contained" onClick={handleStripeRedirect.bind(this)} name="topup" type="submit" endIcon={<AccountBalanceIcon />}>Stripe</Button>
                                        </Box>
                                        {striperedirecterror && <ErrorAlert error={striperedirecterror} />}
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3-content"
                                        id="panel3-header"
                                    >
                                        <Typography variant="h6" >
                                        {t('key_management.23_Retrieve_XMR_wallet')}            
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                        {t('key_management.23_info')}
                                        </Typography>
                                        <Box mt={2}>
                                            <LoadingButton loading={xmrretrieveloading} variant="contained" type="submit" onClick={handleXMRRetrive.bind(this)} endIcon={<AccountBalanceWalletIcon />}>Check XMR Wallet</LoadingButton>
                                        </Box>
                                        {xmrwalletresponse && <XMRWalletDisplay key_={xmrwalletresponse.key} key_name={xmrwalletresponse.key_name} payment_id={xmrwalletresponse.payment_id} integrated_wallet={xmrwalletresponse.integrated_wallet} />}
                                        {xmrwalleterror && <ErrorAlert error={xmrwalleterror} />}
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel4-content"
                                        id="panel4-header"
                                    >
                                        <Typography variant="h6" >
                                        {t('key_management.24_Confirm_XMR_Payment')}
                                            
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                        {t('key_management.24_info')}
                                        </Typography>
                                        <Box mt={2}>
                                            <LoadingButton loading={xmrconfirmationloading} variant="contained" type="submit" onClick={handleXMRConfirmation.bind(this)} endIcon={<SvgIcon><svg xmlns="http://www.w3.org/2000/svg" width="226.777" height="226.777" viewBox="0 0 226.777 226.777"><path d="M39.722 149.021v-95.15l73.741 73.741 73.669-73.669v95.079h33.936a113.219 113.219 0 0 0 5.709-35.59c0-62.6-50.746-113.347-113.347-113.347C50.83.085.083 50.832.083 113.432c0 12.435 2.008 24.396 5.709 35.59h33.93z" /><path d="M162.54 172.077v-60.152l-49.495 49.495-49.148-49.148v59.806h-47.48c19.864 32.786 55.879 54.7 97.013 54.7 41.135 0 77.149-21.914 97.013-54.7H162.54z" /></svg></SvgIcon>}>Confirm XMR Payment</LoadingButton>
                                        </Box>
                                        {xmrconfirmationresponse && <XMRWConfirmationDisplay detail={xmrconfirmationresponse.detail} />}
                                        {xmrconfirmationerror && <ErrorAlert error={xmrconfirmationerror} />}
                                    </AccordionDetails>
                                </Accordion>
                            </form>
                        </Box>
                        <Divider></Divider>
                        <Typography variant="h5" >
                            <Box sx={{ lineHeight: 2, fontWeight: '700', mt: 1 }}> {t('key_management.3_Check_user_manual')} </Box>
                        </Typography>
                        <Typography variant="body1" >
                        <Trans
                            i18nKey="key_management.3_infor"
                                 t={t}
                                components={{ Link: <Link href="/frontend/manual/key" /> }}>
                            </Trans>

                        </Typography>
                    </StyledPaper>
                </Box>
            </Container >
            <Footer />
        </Container >
    );
}
export default KeyManagement;