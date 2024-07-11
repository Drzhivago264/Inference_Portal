import React, { useEffect, useState } from 'react';
import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from '@mui/material/styles';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Alert from '@mui/material/Alert';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CreateIcon from '@mui/icons-material/Create';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../component/nav/Footer';
import { FormControl } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import KeyIcon from '@mui/icons-material/Key';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ResponsiveAppBar from '../component/nav/Navbar';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({

    padding: theme.spacing(4),
    ...theme.typography.body2,
}));

function KeyManagement() {
    let fontsizetheme = createTheme();
    fontsizetheme = responsiveFontSizes(fontsizetheme);
    const [product_objects, setProduct] = useState([]);

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
    const [keycheckloading, setKeyCheckLoading] = useState(false);
    const [xmrretrieveloading, setXMRRetrieveLoading] = useState(false);
    const [xmrconfirmationloading, setXMRConfirmationLoading] = useState(false);

    const [key, setKey] = useState("")
    const [keyError, setKeyError] = useState(false)
    const [keynamepay, setKeyNamePay] = useState("")
    const [keynamepayError, setKeyNamePayError] = useState(false)

    const [amount, setAmount] = useState(1)

    const [keycheckerror, setKeyCheckError] = useState(null);
    const [keycheckresponse, setKeyCheckResponse] = useState(null);
    const [xmrwalleterror, setXMRWalletError] = useState(null);
    const [xmrwalletresponse, setXMRWalletResponse] = useState(null);
    const [xmrconfirmationerror, setXMRConfirmationError] = useState(null);
    const [xmrconfirmationresponse, setXMRConfirmationResponse] = useState(null);
    const [striperedirecterror, setStripeRedirectError] = useState(null);

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
                    Your Key and Key Name are correct!
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
                    Wallet Information:
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
                    Confirmation Status:
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
            <Box mt={4}>
                <Box textAlign='center' my={2}>
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
                                <Box sx={{ mb: 2, fontWeight: 'bold' }}> Congrats! You Payment is Successful</Box>
                            </Typography>
                        </ThemeProvider>

                        <Divider></Divider>
                        <Typography variant="h5" >
                            <Box sx={{ lineHeight: 2, fontWeight: '700', mt: 1 }}>1. Check credit of your key</Box>
                        </Typography>
                        <Stack spacing={1}>
                            <Alert variant="outlined" severity="info">
                                We offer 2 payment methods via Stripe or XMR transfer.  <br></br>
                                <li> To pay by Stripe, include the Key and Key Name in the form below and click Stripe. </li>
                                <li>{` To pay by XMR, transfer your desired amount into the intergrated address provided in your Key file (you don't need to matched the amount listed in the below form.) `}</li>
                            </Alert>
                            <Alert variant="outlined" severity="warning">
                                <li> If you pay by XMR, you need to click on confirm XMR payment after 10 confirmation blocks. </li>
                                <li> To ensure that people with access to your computer or session cannot retrieve your wallet information, you are required to fill up the credit-related forms, even if you are logged in. </li>
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
                                            1.1 Check credit balance
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Before paying, you may check your current balance (and Key and Key Name) to avoid undesirable accidents.
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
                                            1.2 Pay by Stripe
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            You will be redirected to Stripe Payment portal by choosing this payment option.
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
                                            1.3 Retrieve XMR wallet
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            If (for issues with our XMR node) your Key is not associated with a XMR intergrated wallet, you can associate your Key with a Wallet here.
                                            You can also use this function to retrieve your Wallet before payment.
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
                                            1.4 Confirm XMR Payment
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Processing the XMR payment may take up to 30 minutes after it has been confirmed on the blockchain.
                                            Use sufficient fees so the transactions gets confirmed on time.
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
                            <Box sx={{ lineHeight: 2, fontWeight: '700', mt: 1 }}> 2. Check user manual </Box>
                        </Typography>
                        <Typography variant="body1" >
                            Check the <Link href="/frontend/manual/key" variant="body1">
                                {'User Manual'}
                            </Link> to learn more about how to pay and use our services.
                        </Typography>
                    </StyledPaper>
                </Box>
            </Container >
            <Footer />
        </Container >
    );
}
export default KeyManagement;