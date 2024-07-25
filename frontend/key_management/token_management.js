import React, { useState } from 'react';

import AddPermissionDialog from '../component/dialog/MorePermissionDialog.js';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from '../component/nav/Footer.js';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import Stack from '@mui/material/Stack';
import SuccessErrorAlert from '../component/Alert/SuccessErrorAlert.js';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TimerIcon from '@mui/icons-material/Timer';
import TokenCreateExport from '../component/import_export/TokenExport.js';
import Typography from '@mui/material/Typography';
import { baseDelete } from '../api_hook/baseDelete.js';
import { basePost } from '../api_hook/basePost.js';
import { styled } from '@mui/system';
import { useGetToken } from '../api_hook/useGetToken.js';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    height: '100%',
    ...theme.typography.body2,
}));

function TokenManagement() {
    const { t } = useTranslation();

    const [tokencreateloading, setTokenCreateLoading] = useState(false);
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
            allow_data_synthesis: false,
            add_userinstructiontree: false,
            change_userinstructiontree: false,
            delete_userinstructiontree: false,
            view_userinstructiontree: false,
            add_dataset: false,
            change_dataset: false,
            delete_dataset: false,
            view_dataset: false,
            add_datasetrecord: false,
            change_datasetrecord: false,
            delete_datasetrecord: false,
            view_datasetrecord: false
        }
    )
    const total_number_permissions = 10
    const [randomanimation, setRandomAnimation] = useState(false);
    const [tokenname, setTokenName] = useState("")
    const [ttl, setTTL] = useState(10)
    const [time_unit, setTimeUnit] = useState('day')
    const [tokennameError, setTokenNameError] = useState(false)
    const [localtokencreateerror, setLocalTokenCreateError] = useState(null);
    const [showkeycreateresponse, setShowKeyCreateResponse] = useState(false)
    const setAllPermission = (value) => {
        const updatedPermissions = {
            allow_chat: value,
            allow_agent: value,
            allow_chat_api: value,
            allow_agent_api: value,
            allow_toolbox: value,
            allow_toolbox_api: value,
            allow_data_synthesis: value,
            allow_view_log: value,
            allow_view_cost: value,
            add_userinstructiontree: value,
            change_userinstructiontree: value,
            delete_userinstructiontree: value,
            view_userinstructiontree: value,
            add_dataset: value,
            change_dataset: value,
            delete_dataset: value,
            view_dataset: value,
            add_datasetrecord: value,
            change_datasetrecord: value,
            delete_datasetrecord: value,
            view_datasetrecord: value
        };

        setPermission(updatedPermissions);
    }
    const { mutate: tokencreatemutate, error: servertokencreateerror, data: servertokencreatedata} = useMutation(basePost);
    const handleCreateToken = (event) => {
        event.preventDefault()
        setTokenNameError(false)
        setRandomAnimation(false)
        setLocalTokenCreateError(null)
        setTokenCreateLoading(true);
        setShowKeyCreateResponse(false)
        var perm_count = 0;
        for (var key in permission) {
            if (permission[key]) {
                perm_count++;
            }
        }
        if (tokenname == '') {
            setTokenCreateLoading(false)
            setTokenNameError(true)
        }
        else if (perm_count === 0) {
            setLocalTokenCreateError("You tried to create a token without any permission, the key will be unusable. Associate at least one permission for the token.")
            setTokenCreateLoading(false)
        }
        else if (tokenname.length > 50) {
            setLocalTokenCreateError("You tried to create a token name longer than 50 chars.")
            setTokenCreateLoading(false)
        }
        else if (ttl <= 0 || ttl > 999999) {
            setLocalTokenCreateError("You tried to create a token with invalid time to live (0 < ttl < 999999).")
            setTokenCreateLoading(false)
        }
        else if (!['day', 'hour', 'minute', 'second'].includes(time_unit)) {
            setLocalTokenCreateError("You tried to create a token with invalid time unit ['day', 'hour', 'minute', 'second'].")
            setTokenCreateLoading(false)
        }
        else {
            const data = {
                token_name: tokenname,
                permission: permission,
                ttl: ttl,
                time_unit: time_unit,
                use_ttl: use_ttl
            }

            tokencreatemutate({ url: "/frontend-api/generate-token", data: data }, {
                onSuccess: () => {
                    setShowKeyCreateResponse(true)

                }
            })
        }
    }
    const { mutate: permissiondeletemutate } = useMutation(baseDelete);
    const deletePermission = (token_prefix, token_name, token_value, permission, token_index, perm_index) => {
        if (token_prefix && token_name && token_value && permission) {
            const data = {
                token_name: token_name,
                prefix: token_prefix,
                first_and_last_char: token_value,
                permission: permission
            }
            permissiondeletemutate({ url: "/frontend-api/remove-permission", data: data },
                {
                    onSuccess: () => {
                        setTokenList((prev) => {
                            const items = token_list[token_index].permissions.filter(
                                (_, permIndex) => permIndex !== perm_index
                            );
                            const newState = prev;
                            newState[token_index].permissions = items;
                            return [...newState];
                        });
                    },
                    onError: (error) => {
                        setLocalTokenCreateError(error.response.data.detail)
                    }
                }
            )

        }
    };
    const { mutate: tokendeletemutate } = useMutation(baseDelete);
    const deleteToken = (token_prefix, token_name, token_value, index) => {
        if (token_prefix && token_name && token_value) {
            const data = {
                token_name: token_name,
                prefix: token_prefix,
                first_and_last_char: token_value
            }
            tokendeletemutate({ url: "/frontend-api/invalidate-token", data: data },
                {
                    onSuccess: () => setTokenList(prev => {
                        return prev.filter((_, i) => i !== index)
                    }),
                    onError: (error) => setLocalTokenCreateError(error.response.data.detail)

                })

        }
    };
    useGetToken(setTokenList, setLocalTokenCreateError)
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
                                        {t('token_management.table_info')}
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
                                                            {row.permissions.length < total_number_permissions &&
                                                                <Grid item > <AddPermissionDialog
                                                                    current_permission_list={row.permissions}
                                                                    full_permission_dict={permission}
                                                                    token_name={row.name}
                                                                    token_value={row.value}
                                                                    token_prefix={row.prefix}
                                                                    setTokenCreateError={setLocalTokenCreateError}
                                                                    setTokenList={setTokenList}
                                                                    token_list={token_list}
                                                                    index={index} />
                                                                </Grid>
                                                            }
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
                                                <AlertTitle>Info</AlertTitle>
                                                {t('token_management.form_info')}
                                            </Alert>
                                        </Grid>
                                        <Grid style={{
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }} item xs={7} >
                                            <form autoComplete="off" onSubmit={(e) => { handleCreateToken(e) }}>
                                                <FormControl defaultValue="" required>
                                                    <Stack direction='column' spacing={1}>
                                                        <TextField
                                                            margin="normal"
                                                            label="Token Name"
                                                            type="text"
                                                            size="small"
                                                            onChange={e => setTokenName(e.target.value)}
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
                                {showkeycreateresponse &&
                                    <TokenCreateExport
                                        token_={servertokencreatedata.token}
                                        token_name={servertokencreatedata.token_name}
                                        ttl={servertokencreatedata.ttl}
                                        created_at={servertokencreatedata.created_at}
                                        permission={servertokencreatedata.permission}
                                        setRandomAnimation={setRandomAnimation}
                                        setTokenCreateLoading={setTokenCreateLoading}
                                        randomanimation={randomanimation}
                                        setTokenList={setTokenList}
                                        token_list={token_list}
                                    />
                                }
                                {localtokencreateerror && <SuccessErrorAlert detail={localtokencreateerror} type='error' />}
                                {servertokencreateerror && <SuccessErrorAlert detail={servertokencreateerror.response.data.detail} type='error' />}
                                <Alert severity="warning" sx={{ whiteSpace: 'pre-line' }}>
                                    <AlertTitle>Warning</AlertTitle>
                                    {t('token_management.form_warning')}
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
                                            label={t('token_management.allow_all')}
                                        />
                                    </Box>
                                    <Grid container spacing={2}>
                                        <Grid item sm={12} md={6} >
                                            <Stack direction='column' >
                                                <FormLabel component="legend">Inference permissions</FormLabel>
                                                {[
                                                    { key: 'allow_chat', label: t('token_management.allow_chat') },
                                                    { key: 'allow_agent', label: t('token_management.allow_agent') },
                                                    { key: 'allow_toolbox', label: t('token_management.allow_toolbox') },
                                                    { key: 'allow_data_synthesis', label: t('token_management.allow_data_synthesis') },
                                                    { key: 'allow_chat_api', label: t('token_management.allow_chat_api') },
                                                    { key: 'allow_agent_api', label: t('token_management.allow_agent_api') },
                                                    { key: 'allow_toolbox_api', label: t('token_management.allow_toolbox_api') },
                                                ].map((perm) => (
                                                    <FormControlLabel
                                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                                                        key={perm.key}
                                                        control={<Checkbox size='small' checked={permission[perm.key]} onChange={(e) => { setPermission({ ...permission, [perm.key]: e.target.checked }) }} />}
                                                        label={perm.label}
                                                    />
                                                ))}
                                            </Stack>
                                            <Stack direction='column' >
                                                <FormLabel component="legend">Dataset permissions</FormLabel>
                                                {[
                                                    { key: 'add_dataset', label: "Allow add Dataset(s)" },
                                                    { key: 'change_dataset', label: "Allow update Dataset(s)" },
                                                    { key: 'view_dataset', label: "Allow view Dataset(s)" },
                                                    { key: 'delete_dataset', label: "Allow delete Dataset(s)" },
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
                                            <Stack mt={1} direction='column'>
                                                <FormLabel component="legend">Log permissions</FormLabel>
                                                {[
                                                    { key: 'allow_view_log', label: t('token_management.allow_view_log') },
                                                    { key: 'allow_view_cost', label: t('token_management.allow_view_cost') },
                                                ].map((perm) => (
                                                    <FormControlLabel
                                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                                                        key={perm.key}
                                                        control={<Checkbox size='small' checked={permission[perm.key]} onChange={(e) => { setPermission({ ...permission, [perm.key]: e.target.checked }) }} />}
                                                        label={perm.label}
                                                    />
                                                ))}
                                            </Stack>
                                            <Stack direction='column' >
                                                <FormLabel component="legend">Template permissions</FormLabel>
                                                {[
                                                    { key: 'add_userinstructiontree', label: "Allow add template(s)" },
                                                    { key: 'change_userinstructiontree', label: "Allow update template(s)" },
                                                    { key: 'view_userinstructiontree', label: "Allow view template(s)" },
                                                    { key: 'delete_userinstructiontree', label: "Allow delete template(s)" },
                                                ].map((perm) => (
                                                    <FormControlLabel
                                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                                                        key={perm.key}
                                                        control={<Checkbox size='small' checked={permission[perm.key]} onChange={(e) => { setPermission({ ...permission, [perm.key]: e.target.checked }) }} />}
                                                        label={perm.label}
                                                    />
                                                ))}
                                            </Stack>
                                            <Stack direction='column' >
                                                <FormLabel component="legend">Dataset Record permissions</FormLabel>
                                                {[
                                                    { key: 'add_datasetrecord', label: "Allow add Dataset Record(s)" },
                                                    { key: 'change_datasetrecord', label: "Allow update Dataset Record(s)" },
                                                    { key: 'view_datasetrecord', label: "Allow view Dataset Record(s)" },
                                                    { key: 'delete_datasetrecord', label: "Allow delete Dataset Records(s)" },
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