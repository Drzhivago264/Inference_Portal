import { KeyCheckDisplay, XMRWConfirmationDisplay, XMRWalletDisplay } from '../component/custom_ui_component/KeyDisplay.js';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../component/nav/Footer.js';
import  FormControl  from '@mui/material/FormControl';
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
import SuccessErrorAlert from '../component/Alert/SuccessErrorAlert.js';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UserContext } from '../App.js'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useGetLogout } from '../api_hook/useGetLogout.js';
import { useGetProduct } from '../api_hook/useGetProduct.js';
import { usePostKeyCheck } from '../api_hook/usePostKeyCheck.js';
import { usePostKeyCreate } from '../api_hook/usePostKeyCreate.js';
import { usePostStripeRedirect } from '../api_hook/usePostStripeRedirect.js';

function KeyManagement() {
    const { t } = useTranslation();
    let fontsizetheme = createTheme();
    fontsizetheme = responsiveFontSizes(fontsizetheme);
    const [showPassword, setShowPassword] = useState(false);
    const { is_authenticated, setIsAuthenticated, setUserKeyName, setWebsocketHash } = useContext(UserContext);
    const [randomanimation, setRandomAnimation] = useState(false);
    const [key, setKey] = useState("")
    const [keyError, setKeyError] = useState(false)
    const [keynamepay, setKeyNamePay] = useState("")
    const [keynamepayError, setKeyNamePayError] = useState(false)
    const [keyname, setKeyName] = useState("")
    const [keynameError, setKeyNameError] = useState(false)
    const [amount, setAmount] = useState(1)
    const { product_objects } = useGetProduct()
    const [keycreateloading, setKeyCreateLoading] = useState(false)
    const [localkeycreateerror, setLocalKeyCreateError] = useState("")
    
    const {refetch} = useGetLogout(setIsAuthenticated, setUserKeyName, setWebsocketHash)
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const { fetch: postKeyCreate, error: serverkeycreateerror, data: serverkeycreatedata } = usePostKeyCreate({ setKeyNameError, setKeyCreateLoading, setRandomAnimation, setLocalKeyCreateError, keyname });
    const { fetch: postKeyCheck, isLoading: keycheckisLoading, error: keycheckerror, data: keycheckdata } = usePostKeyCheck({setKeyError, setKeyNamePayError, key, keynamepay})
    const { fetch: xmrretrieve, isLoading: xmrretrieveisLoading, error: xmrretrieveerror, data: xmrretrievedata } = usePostKeyCheck({setKeyError, setKeyNamePayError, key, keynamepay});
    const { fetch: xmrconfirm, isLoading: xmrconfirmisLoading, error: xmrconfirmerror, data: xmrconfirmdata } = usePostKeyCheck({setKeyError, setKeyNamePayError, key, keynamepay});
    const { fetch: stripepostredirect, isSuccess: stripeisSuccess, error: stripeerror, data: stripedata } = usePostStripeRedirect({setKeyError, setKeyNamePayError, key, keynamepay, amount});

    useEffect(() => {
        if (stripeisSuccess) {
            window.location.replace(stripedata.stripe_checkout_url);
        }
    }, [stripeisSuccess, stripedata]);
    const [expanded, setExpanded] = useState('panel1');
    const handleAccordionExpand = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <Container maxWidth={false} disableGutters>
            <title>Key Management</title>
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
                            <form autoComplete="off" onSubmit={(e) => postKeyCreate(e, "/frontend-api/generate-key")}>
                                <FormControl defaultValue="" required>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                                        <TextField
                                            disabled={is_authenticated}
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
                                        {!is_authenticated && <LoadingButton size="small" loading={keycreateloading} loadingPosition="end" variant="contained" type="submit" endIcon={<LockOpenIcon />}>Generate</LoadingButton>}
                                        {is_authenticated && <Button variant="outlined" onClick={refetch} color="error" endIcon={<LogoutIcon />}>Logout</Button>}
                                    </Stack>
                                </FormControl>
                            </form>
                        </Box>
                        {serverkeycreatedata &&
                            <KeyCreateExport
                                key_={serverkeycreatedata.key}
                                key_name={serverkeycreatedata.key_name}
                                payment_id={serverkeycreatedata.payment_id}
                                integrated_wallet={serverkeycreatedata.integrated_wallet}
                                t={t}
                                setIsAuthenticated={setIsAuthenticated}
                                setKeyCreateLoading={setKeyCreateLoading}
                                setRandomAnimation={setRandomAnimation}
                                randomanimation={randomanimation}
                            />
                        }
                        {serverkeycreateerror && <SuccessErrorAlert detail={serverkeycreateerror.response.data.detail} type="error" />}
                        {localkeycreateerror && <SuccessErrorAlert detail={localkeycreateerror} type="error"/>}
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
                                <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionExpand('panel1')}>
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
                                            <LoadingButton loading={keycheckisLoading} variant="contained" name="checkcredit" onClick={(e) => { postKeyCheck(e, "/frontend-api/check-credit") }} type="submit" endIcon={<LocalAtmIcon />}>Check Credit</LoadingButton>
                                        </Box>
                                        {keycheckdata && <KeyCheckDisplay t={t} key_={keycheckdata.key} key_name={keycheckdata.key_name} monero_balance={keycheckdata.monero_balance} fiat_balance={keycheckdata.fiat_balance} />}
                                        {keycheckerror && <SuccessErrorAlert detail={keycheckerror.response.data.detail} type="error" />}
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionExpand('panel2')}>
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
                                            <Button variant="contained" onClick={(e) => { stripepostredirect(e) }} name="topup" type="submit" endIcon={<AccountBalanceIcon />}>Stripe</Button>
                                        </Box>
                                        {stripeerror && <SuccessErrorAlert detail={stripeerror.response.data.detail} type="error" />}
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionExpand('panel3')}>
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
                                            <LoadingButton loading={xmrretrieveisLoading} variant="contained" type="submit" onClick={(e) => { xmrretrieve(e, "/frontend-api/get-xmr-wallet") }} endIcon={<AccountBalanceWalletIcon />}>Check XMR Wallet</LoadingButton>
                                        </Box>
                                        {xmrretrievedata && <XMRWalletDisplay t={t} key_={xmrretrievedata.key} key_name={xmrretrievedata.key_name} payment_id={xmrretrievedata.payment_id} integrated_wallet={xmrretrievedata.integrated_wallet} />}
                                        {xmrretrieveerror && <SuccessErrorAlert detail={xmrretrieveerror.response.data.detail} type="error"/>}
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel4'} onChange={handleAccordionExpand('panel4')}>
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
                                            <LoadingButton loading={xmrconfirmisLoading} variant="contained" type="submit" onClick={(e) => { xmrconfirm(e, "/frontend-api/confirm-xmr-payment") }} endIcon={<SvgIcon><svg xmlns="http://www.w3.org/2000/svg" width="226.777" height="226.777" viewBox="0 0 226.777 226.777"><path d="M39.722 149.021v-95.15l73.741 73.741 73.669-73.669v95.079h33.936a113.219 113.219 0 0 0 5.709-35.59c0-62.6-50.746-113.347-113.347-113.347C50.83.085.083 50.832.083 113.432c0 12.435 2.008 24.396 5.709 35.59h33.93z" /><path d="M162.54 172.077v-60.152l-49.495 49.495-49.148-49.148v59.806h-47.48c19.864 32.786 55.879 54.7 97.013 54.7 41.135 0 77.149-21.914 97.013-54.7H162.54z" /></svg></SvgIcon>}>Confirm XMR Payment</LoadingButton>
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