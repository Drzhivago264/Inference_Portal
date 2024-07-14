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
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
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
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { RandomReveal } from 'react-random-reveal'
import ResponsiveAppBar from '../component/nav/Navbar.js';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TimerIcon from '@mui/icons-material/Timer';
import Typography from '@mui/material/Typography';
import { UserContext } from '../App.js'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { getCookie } from '../component/getCookie.js';
import { saveAs } from "file-saver";
import { server } from 'websocket';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({

    padding: theme.spacing(2),
    height: '100%',
    ...theme.typography.body2,
}));

function TokenManagement() {
    const { t } = useTranslation();
    let fontsizetheme = createTheme();
    fontsizetheme = responsiveFontSizes(fontsizetheme);

    const [reload_token, setReloadToken] = useState(reload_token);
    const { setIsAuthenticated } = useContext(UserContext);

    useEffect(() => {
        if (reload_token) {
            axios.all([
                axios.get('/frontend-api/get-token'),
            ])
                .then(axios.spread((server_object) => {
                    setTokenList(server_object.data.token_list)
                }))
                .catch(error => {
                    console.log(error);
                });
            setReloadToken(false)
        }
    }, [reload_token]);
    useEffect(() => {

        axios.all([
            axios.get('/frontend-api/get-token'),
        ])
            .then(axios.spread((server_object) => {
                setTokenList(server_object.data.token_list)
            }))
            .catch(error => {
                console.log(error);
            });
        setReloadToken(false)

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

    const [tokencreateloading, settokenCreateLoading] = useState(false);
    const [token_list, setTokenList] = useState([])
    const [use_ttl, setUseTTL] = useState(true)
    const [permission, setPermission] = useState(
        {
            allow_chat: false,
            allow_agent: false,
            allow_chat_api: false,
            allow_agent_api: false,
            allow_view_log: false,
            allow_view_cost: false,
            allow_toolbox: false,
            allow_toolbox_api: false,
            allow_create_template: false,
            allow_data_synthesis: false
        }
    )
    const [randomanimation, setRandomAnimation] = useState(false);
    const [tokenname, settokenName] = useState("")
    const [ttl, setTTL] = useState(10)
    const [time_unit, setTimeUnit] = useState('day')
    const [tokennameError, settokenNameError] = useState(false)
    const [tokencreateresponse, settokenCreateResponse] = useState(null);
    const [tokencreateerror, settokenCreateError] = useState(null);

    const setAllPermission = (value) => {
        setPermission({
            ...permission,
            allow_chat: value,
            allow_agent: value,
            allow_chat_api: value,
            allow_agent_api: value,
            allow_toolbox: value,
            allow_create_template: value,
            allow_toolbox_api: value,
            allow_data_synthesis: value,
            allow_view_log: value,
            allow_view_cost: value
        })
    }

    const handleCreateToken = (event) => {
        event.preventDefault()
        settokenCreateLoading(true);
        settokenCreateResponse(null)
        settokenNameError(false)
        setRandomAnimation(false)
        settokenCreateError(null)
        if (tokenname == '') {
            settokenCreateLoading(false)
            settokenNameError(true)
        }
        var perm_count = 0;
        for (var key in permission) {
            if (permission[key]) {
                perm_count++;
            }
        }
        if (perm_count === 0) {
            settokenCreateError("You tried to create a token without any permission, the key will be unusable. Associate at least one permission for the token.")
            settokenCreateLoading(false)
        }
        if (tokenname && perm_count > 0) {
            const csrftoken = getCookie('csrftoken');
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                token_name: tokenname,
                permission: permission,
                ttl: ttl,
                time_unit: time_unit,
                use_ttl: use_ttl
            }
            axios.post("/frontend-api/generate-token", data, config)
                .then((response) => {
                    settokenCreateResponse(response.data)

                }).catch(error => {
                    settokenCreateError(error.response.data.detail)
                    settokenCreateLoading(false)
                });
        }
    }

    function exporttoken(tokenfile) {
        var blob = new Blob([tokenfile], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "Token_of_ProffesorParakeet_KEEP_IT_SECURE.txt");
    }
    const TokenCreateExport = ({ token_, token_name, ttl, created_at, permission }) => {
        return (
            <Box my={4}>
                {!randomanimation && <Box style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }} textAlign='center' my={1}>
                    <Alert severity="info"> Token: <RandomReveal
                        isPlaying
                        duration={2}
                        revealDuration={1.6}
                        characters={token_}
                        onComplete={() => (setRandomAnimation(true), settokenCreateLoading(false), setIsAuthenticated(true), setReloadToken(true))}

                    /></Alert>
                </Box>}

                {randomanimation && <Box textAlign='center' my={4}>
                    <Textarea
                        defaultValue={`Token: ${token_}\nToken Name: ${token_name}\nTTL: ${ttl}\nCreated at: ${created_at}\nPermission(s): ${permission}`}
                        minRows={4}
                        maxRows={10}
                    />
                    <Box textAlign='center' my={1}>
                        <Button size="small" variant="outlined" onClick={() => exporttoken(`Token: ${token_}\nToken Name: ${token_name}\nTTL: ${ttl}\nCreated at: ${created_at}\nPermission(s): ${permission}`)}>Export token</Button>
                    </Box>
                </Box>}
            </Box >
        );
    };
    const deletePermission = (token_prefix, token_name, token_value, permission, token_index, perm_index) => {
        if (token_prefix && token_name && token_value && permission) {
            const csrftoken = getCookie('csrftoken');
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                token_name: token_name,
                prefix: token_prefix,
                first_and_last_char: token_value,
                permission: permission
            }
            axios.post("/frontend-api/remove-permission", data, config)
                .then((response) => {
                    setReloadToken(true)
                    setTokenList((prev) => {
                        const items = token_list[token_index].permissions.filter(
                            (perm) => perm.id !== perm_index
                        );
                        const newState = prev;
                        newState[token_index].permissions = items;
                        return [...newState];
                    });

                }).catch(error => {
                    settokenCreateError(error.response.data.detail)
                });
        }
    };

    const deleteToken = (token_prefix, token_name, token_value, index) => {
        if (token_prefix && token_name && token_value) {
            const csrftoken = getCookie('csrftoken');
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                token_name: token_name,
                prefix: token_prefix,
                first_and_last_char: token_value
            }
            axios.post("/frontend-api/invalidate-token", data, config)
                .then((response) => {
                    setTokenList(prev => {
                        return prev.filter((_, i) => i !== index)
                    })

                }).catch(error => {
                    settokenCreateError(error.response.data.detail)
                });
        }
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
            <ResponsiveAppBar max_width="xxl" />
            <Container maxWidth="xxl">
                <Grid p={2} container spacing={1}>
                    <Grid item md={12} lg={7}>
                        <Box
                            my={1}
                            alignItems="center"
                            sx={{ height: '100%' }}
                        >
                            <StyledPaper variant="outlined">
                                <Typography mb={2} variant="h6" >
                                    <Box sx={{ lineHeight: 2, fontWeight: '700' }}>Access Tokens</Box>
                                </Typography>
                                {token_list.length === 0 &&
                                    <Alert severity="info" sx={{ whiteSpace: 'pre-line' }}>
                                        <AlertTitle>Infor</AlertTitle>
                                        You do not have any access token. You can create maximum 10 access tokens.
                                    </Alert>
                                }
                                <TableContainer >
                                    <Table size="small" sx={{ tableLayout: 'fixed', minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow >
                                                <TableCell>Name</TableCell>
                                                <TableCell >Value</TableCell>
                                                <TableCell sx={{ width: '20%' }}>Created at</TableCell>
                                                <TableCell >TTL (seconds)</TableCell>
                                                <TableCell sx={{ width: '35%' }}>Permissions</TableCell>
                                                <TableCell sx={{ width: '8%' }} ></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {token_list.map((row, index) => (
                                                <TableRow
                                                    key={row.created_at.toString()}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell >
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell >{row.value}</TableCell>
                                                    <TableCell >{row.created_at.toString()}</TableCell>
                                                    <TableCell >{row.ttl ? row.ttl : Infinity}</TableCell>
                                                    <TableCell >
                                                        <Grid container spacing={1}>
                                                            {row.permissions.map((perm, perm_index) => (
                                                                <Grid key={perm} item><Chip label={perm} onDelete={() => { deletePermission(row.prefix, row.name, row.value, perm, index, perm_index) }} />
                                                                </Grid>

                                                            ))}
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell >
                                                        <IconButton aria-label="delete" size="large" onClick={() => deleteToken(row.prefix, row.name, row.value, index)} >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </StyledPaper>
                        </Box>
                    </Grid>
                    <Grid item md={12} lg={5}>
                        <Box
                            my={1}
                            alignItems="center"
                            sx={{ height: '100%' }}
                        >
                            <StyledPaper variant="outlined">
                                <Typography variant="h6" >
                                    <Box sx={{ lineHeight: 2, fontWeight: '700' }}> Create New Access Token </Box>
                                </Typography>

                                <Box my={2} justifyContent="center" alignItems="center" display="flex" >
                                    <Grid container direction="row" spacing={1}>
                                        <Grid item style={{
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }} xs={5}>
                                            <Alert severity="info" sx={{ whiteSpace: 'pre-line' }}>
                                                <AlertTitle>Infor</AlertTitle>
                                                Access tokens authenticate allow trusted actors or applications to use the services based on permissions. Access tokens aims afford teams collaborating on the same project.
                                            </Alert>

                                        </Grid>
                                        <Grid style={{
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }} item xs={7} >
                                            <form autoComplete="off" onSubmit={handleCreateToken}>
                                                <FormControl defaultValue="" required>
                                                    <Stack direction='column' spacing={1}>
                                                        <TextField
                                                            margin="normal"
                                                            label="Token Name"
                                                            type="text"
                                                            size="small"
                                                            onChange={e => settokenName(e.target.value)}
                                                            value={tokenname}
                                                            error={tokennameError}
                                                            autoComplete="off"
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <CreateIcon />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                        <FormControlLabel control={<Switch checked={use_ttl} onChange={e => setUseTTL(e.target.checked)} />} label="Use TTL" />
                                                        <Stack mb={1} direction={{ xs: 'row' }} spacing={1}>
                                                            <TextField
                                                                id="ttl"
                                                                label="Time To Live"
                                                                disabled={!use_ttl}
                                                                type="number"
                                                                size='small'
                                                                value={use_ttl ? ttl : ""}
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
                                                                disabled={!use_ttl}
                                                                label="Unit"
                                                                value={time_unit}
                                                                onChange={e => setTimeUnit(e.target.value)}
                                                                size='small'
                                                            >
                                                                {['day', 'hour', 'minute', 'second'].map((option) => (
                                                                    <MenuItem key={option} token={option} value={option}>
                                                                        {option}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </Stack>
                                                        <LoadingButton size="small" disabled={token_list.length >= 10 ? true : false} loading={tokencreateloading} loadingPosition="end" variant="contained" type="submit" endIcon={<LockOpenIcon />}>Generate</LoadingButton>
                                                    </Stack>
                                                </FormControl>
                                            </form>
                                        </Grid>
                                    </Grid>

                                </Box>
                                {tokencreateresponse && <TokenCreateExport token_={tokencreateresponse.token} token_name={tokencreateresponse.token_name} ttl={tokencreateresponse.ttl} created_at={tokencreateresponse.created_at} permission={tokencreateresponse.permission} />}
                                {tokencreateerror && <ErrorAlert error={tokencreateerror} />}
                                <Alert severity="warning" sx={{ whiteSpace: 'pre-line' }}>
                                    <AlertTitle>Warning</AlertTitle>
                                    If you share your Access Tokens with anyone; you can configure permission & time to live to prevent potential misuses. It is IMPORTANT to note that you are paying for all of any usages from your access tokens.
                                </Alert>
                                <Typography variant="h6" >
                                    <Box sx={{ lineHeight: 2, fontWeight: '700', mt: 1 }}>Token permissions</Box>
                                </Typography>
                                <Box m={1} >
                                    <Box mb={1}>
                                        <FormControlLabel
                                            sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                                            key='allow_all'
                                            control={<Checkbox size='small' onChange={(e) => { setAllPermission(e.target.checked) }} />}
                                            label="Set all permissions"
                                        />
                                    </Box>
                                    <Grid container spacing={2}>
                                        <Grid item sm={12} md={6} >
                                            <Stack direction='column' >
                                                <FormLabel component="legend">Inference permissions</FormLabel>
                                                {[
                                                    { key: 'allow_chat', label: 'Use Chatroom via Websocket ' },
                                                    { key: 'allow_agent', label: 'Use Agents via Websocket ' },
                                                    { key: 'allow_toolbox', label: 'Use Toolbox via Websocket ' },
                                                    { key: 'allow_data_synthesis', label: 'Use Data Synthesis' },
                                                    { key: 'allow_chat_api', label: 'Use Chat and Text Completion APIs' },
                                                    { key: 'allow_agent_api', label: 'Use Agent API' },
                                                    { key: 'allow_toolbox_api', label: 'Use Toolbox API' },
                                                ].map((perm) => (
                                                    <FormControlLabel
                                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                                                        key={perm.key}
                                                        control={<Checkbox size='small' checked={permission[perm.key]} onChange={(e) => { setPermission({ ...permission, [perm.key]: e.target.checked }) }} />}
                                                        label={perm.label}
                                                    />
                                                ))}
                                            </Stack>
                                        </Grid>
                                        <Grid item sm={12} md={6}>
                                            <Stack direction='column'>
                                                <FormLabel component="legend">Data permissions</FormLabel>
                                                {[
                                                    { key: 'allow_view_log', label: 'Access Log Data' },
                                                    { key: 'allow_view_cost', label: 'Access Cost Data' },
                                                    { key: 'allow_create_template', label: 'Create and Test Agent Template(s)' },
                                                ].map((perm) => (
                                                    <FormControlLabel
                                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                                                        key={perm.key}
                                                        control={<Checkbox size='small' checked={permission[perm.key]} onChange={(e) => { setPermission({ ...permission, [perm.key]: e.target.checked }) }} />}
                                                        label={perm.label}
                                                    />
                                                ))}

                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </StyledPaper>
                        </Box>
                    </Grid>
                </Grid>
            </Container >
            <Footer />
        </Container >
    );
}
export default TokenManagement;