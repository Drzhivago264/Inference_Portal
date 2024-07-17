import React, { useContext, useEffect, useState } from 'react';
import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from '@mui/material/styles';
import { Trans, useTranslation } from 'react-i18next';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CreateIcon from '@mui/icons-material/Create';
import Divider from '@mui/material/Divider';
import ErrorAlert from '../component/custom_ui_component/ErrorAlert.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../component/nav/Footer.js';
import { FormControl } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import KeyCreateExport from '../component/import_export/KeyExport.js';
import KeyIcon from '@mui/icons-material/Key';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import StyledPaper from '../component/custom_ui_component/StyledPaper.js';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Textarea from '../component/custom_ui_component/CustomTextArea.js';
import Typography from '@mui/material/Typography';
import { UserContext } from '../App.js'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { getCookie } from '../component/getCookie.js';
import { logout } from '../component/checkLogin.js';

function KeyManagement() {
    const { t } = useTranslation();
    let fontsizetheme = createTheme();
    fontsizetheme = responsiveFontSizes(fontsizetheme);
    const [product_objects, setProduct] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const { is_authenticated, setIsAuthenticated } = useContext(UserContext);
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

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
        else if (keyname.length > 100) {
            setKeyCreateError("You tried to create a key name longer than 100 chars.")
            setKeyCreateLoading(false)
        }
        else {
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
                })
                .catch(error => {
                    if (error.response.data.hasOwnProperty("key_name")) {
                        setKeyCreateError(error.response.data.key_name[0])
                    }
                    else {
                        setKeyCreateError(error.response.data.detail)
                    }
                    setKeyCreateLoading(false)
                })
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
                        {keycreateresponse &&
                            <KeyCreateExport
                                key_={keycreateresponse.key}
                                key_name={keycreateresponse.key_name}
                                payment_id={keycreateresponse.payment_id}
                                integrated_wallet={keycreateresponse.integrated_wallet}
                                t={t}
                                setIsAuthenticated={setIsAuthenticated}
                                setKeyCreateLoading={setKeyCreateLoading}
                                setRandomAnimation={setRandomAnimation}
                                randomanimation={randomanimation}
                            />
                        }
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