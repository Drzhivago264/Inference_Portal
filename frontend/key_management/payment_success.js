import { KeyCheckDisplay, XMRWConfirmationDisplay, XMRWalletDisplay } from '../component/custom_ui_component/KeyDisplay.js';
import React, { useEffect, useState } from 'react';
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
import ResponsiveAppBar from '../component/nav/Navbar';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import StyledPaper from '../component/custom_ui_component/StyledPaper';
import SuccessErrorAlert from '../component/Alert/SuccessErrorAlert.js';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { basePost } from '../api_hook/basePost';
import { useGetProduct } from '../api_hook/useGetProduct';
import { useMutation } from 'react-query';

function KeyManagement() {
    const { t } = useTranslation();
    let fontsizetheme = createTheme();
    fontsizetheme = responsiveFontSizes(fontsizetheme);
    const { product_objects } = useGetProduct()
    const [key, setKey] = useState("")
    const [keyError, setKeyError] = useState(false)
    const [keynamepay, setKeyNamePay] = useState("")
    const [keynamepayError, setKeyNamePayError] = useState(false)
    const [amount, setAmount] = useState(1)

    const { mutate: keycheckmutate, isLoading: keycheckisLoading, error: keycheckerror, data: keycheckdata } = useMutation(basePost);
    const { mutate: xmrretrievemutate, isLoading: xmrretrieveisLoading, error: xmrretrieveerror, data: xmrretrievedata } = useMutation(basePost);
    const { mutate: xmrconfirmmutate, isLoading: xmrconfirmisLoading, error: xmrconfirmerror, data: xmrconfirmdata } = useMutation(basePost);
    const handlePostRequest = (event, url, type) => {
        event.preventDefault()
        setKeyNamePayError(false)
        setKeyNamePayError(keynamepay === '');
        setKeyError(key === '');

        if (keynamepay && key) {
            const data = {
                key_name: keynamepay,
                key: key
            }
            if (type === "keycheck") {
                keycheckmutate({ url: url, data: data })
            }
            else if (type === "xmrretrieve") {
                xmrretrievemutate({ url: url, data: data })
            }
            else if (type === "xmrconfirm") {
                xmrconfirmmutate({ url: url, data: data })
            }
        }
    }
    
    const { mutate: stripemutate, isSuccess: stripeisSuccess, error: stripeerror, data: stripedata } = useMutation(basePost);
    const handleStripeRedirect = (event) => {
        event.preventDefault()
        setKeyNamePayError(false)
        setKeyNamePayError(keynamepay === '');
        setKeyError(key === '');

        if (keynamepay && key && amount) {
            const data = {
                key_name: keynamepay,
                key: key,
                product_id: amount,
            }
            stripemutate({ url: "/frontend-api/stripe-redirect", data: data })
        }
    }
    useEffect(() => {
        if (stripeisSuccess) {
            window.location.replace(stripedata.stripe_checkout_url);
        }
    }, [stripeisSuccess, stripedata]);

    return (
        <Container maxWidth={false} disableGutters>
            <title>Payment Success</title>
            <ResponsiveAppBar max_width="lg" />
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
                            <Box sx={{ lineHeight: 2, fontWeight: '700', mt: 1 }}>{t('key_management.2_Add_credit_to_your_key')}</Box>
                        </Typography>
                        <Stack spacing={1}>
                            <Alert variant="outlined" severity="info">
                                {t('key_management.Info_1')}
                            </Alert>
                            <Alert variant="outlined" severity="warning">
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
                                            {t('key_management.21_Check_credit_balance')}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {t('key_management.21_info')}
                                        </Typography>
                                        <Box mt={2}>
                                            <LoadingButton loading={keycheckisLoading} variant="contained" name="checkcredit" onClick={(e) => { handlePostRequest(e, "/frontend-api/check-credit", "keycheck") }} type="submit" endIcon={<LocalAtmIcon />}>Check Credit</LoadingButton>
                                        </Box>
                                        {keycheckdata && <KeyCheckDisplay t={t} key_={keycheckdata.key} key_name={keycheckdata.key_name} monero_balance={keycheckdata.monero_balance} fiat_balance={keycheckdata.fiat_balance} />}
                                        {keycheckerror && <SuccessErrorAlert type="error" detail={keycheckerror.response.data.detail} />}
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
                                            <Button variant="contained" onClick={(e) => { handleStripeRedirect(e) }} name="topup" type="submit" endIcon={<AccountBalanceIcon />}>Stripe</Button>
                                        </Box>
                                        {stripeerror && <SuccessErrorAlert type="error" detail={stripeerror.response.data.detail} />}
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
                                            <LoadingButton loading={xmrretrieveisLoading} variant="contained" type="submit" onClick={(e) => { handlePostRequest(e, "/frontend-api/get-xmr-wallet", "xmrretrieve") }} endIcon={<AccountBalanceWalletIcon />}>Check XMR Wallet</LoadingButton>
                                        </Box>
                                        {xmrretrievedata && <XMRWalletDisplay t={t} key_={xmrretrievedata.key} key_name={xmrretrievedata.key_name} payment_id={xmrretrievedata.payment_id} integrated_wallet={xmrretrievedata.integrated_wallet} />}
                                        {xmrretrieveerror && <SuccessErrorAlert detail={xmrretrieveerror.response.data.detail} type="error"/>}
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
                                            <LoadingButton loading={xmrconfirmisLoading} variant="contained" type="submit" onClick={(e) => { handlePostRequest(e, "/frontend-api/confirm-xmr-payment", "xmrconfirm") }} endIcon={<SvgIcon><svg xmlns="http://www.w3.org/2000/svg" width="226.777" height="226.777" viewBox="0 0 226.777 226.777"><path d="M39.722 149.021v-95.15l73.741 73.741 73.669-73.669v95.079h33.936a113.219 113.219 0 0 0 5.709-35.59c0-62.6-50.746-113.347-113.347-113.347C50.83.085.083 50.832.083 113.432c0 12.435 2.008 24.396 5.709 35.59h33.93z" /><path d="M162.54 172.077v-60.152l-49.495 49.495-49.148-49.148v59.806h-47.48c19.864 32.786 55.879 54.7 97.013 54.7 41.135 0 77.149-21.914 97.013-54.7H162.54z" /></svg></SvgIcon>}>Confirm XMR Payment</LoadingButton>
                                        </Box>
                                        {xmrconfirmdata && <XMRWConfirmationDisplay t={t} detail={xmrconfirmdata.detail} />}
                                        {xmrconfirmerror && <SuccessErrorAlert detail={xmrconfirmerror.response.data.detail} type="error" />}
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