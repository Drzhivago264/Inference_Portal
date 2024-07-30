import React, {useState} from "react";

import AddPermissionDialog from "../component/dialog/MorePermissionDialog.js";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "../component/nav/Footer.js";
import {FormControl} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ResponsiveAppBar from "../component/nav/Navbar.js";
import SpeedIcon from "@mui/icons-material/Speed";
import Stack from "@mui/material/Stack";
import SuccessErrorAlert from "../component/Alert/SuccessErrorAlert.js";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import TimerIcon from "@mui/icons-material/Timer";
import TokenCreateExport from "../component/import_export/TokenExport.js";
import Typography from "@mui/material/Typography";
import UpdateRateLimitDialog from "../component/dialog/AdjustRateLimitDialog.js";
import {styled} from "@mui/system";
import {useDeletePermission} from "../api_hook/useDeletePermission.js";
import {useDeleteToken} from "../api_hook/useDeleteToken.js";
import {useGetToken} from "../api_hook/useGetToken.js";
import {usePostTokenCreate} from "../api_hook/usePostTokenCreate.js";
import {useTranslation} from "react-i18next";

const StyledPaper = styled(Paper)(({theme}) => ({
	padding: theme.spacing(2),
	height: "100%",
	...theme.typography.body2,
}));

function TokenManagement() {
	const {t} = useTranslation();
	const [tokencreateloading, setTokenCreateLoading] = useState(false);
	const [token_list, setTokenList] = useState([]);
	const [use_ttl, setUseTTL] = useState(true);
	const [ratelimit, setRateLimit] = useState(30);
	const [ratelimit_time_unit, setRateLimitTimeUnit] = useState("minute");
	const [randomanimation, setRandomAnimation] = useState(false);
	const [tokenname, setTokenName] = useState("");
	const [ttl, setTTL] = useState(10);
	const [time_unit, setTimeUnit] = useState("day");
	const [tokennameError, setTokenNameError] = useState(false);
	const [localtokencreateerror, setLocalTokenCreateError] = useState(null);
	const [showkeycreateresponse, setShowKeyCreateResponse] = useState(false);

	const initialPermissionState = {
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
		view_datasetrecord: false,
	};

	const [permission, setPermission] = useState(initialPermissionState);

	const setAllPermission = (value) => {
		setPermission(Object.fromEntries(Object.keys(initialPermissionState).map((key) => [key, value])));
	};
	const {
		fetch: postCreateToken,
		error: servertokencreateerror,
		data: servertokencreatedata,
	} = usePostTokenCreate({
		setTokenNameError,
		setTokenCreateLoading,
		setShowKeyCreateResponse,
		setRandomAnimation,
		setLocalTokenCreateError,
		tokenname,
		permission,
		ratelimit,
		ratelimit_time_unit,
		ttl,
		time_unit,
		use_ttl,
	});
	const {fetch: deletePermission} = useDeletePermission({
		setTokenList,
		setLocalTokenCreateError,
		token_list,
	});
	const {fetch: deleteToken} = useDeleteToken({
		setTokenList,
		setLocalTokenCreateError,
	});
	useGetToken(setTokenList, setLocalTokenCreateError);
	return (
		<Container maxWidth={false} disableGutters>
			<title>Token Management</title>
			<ResponsiveAppBar max_width='xxl' />
			<Container maxWidth='xxl'>
				<Grid p={2} container spacing={1}>
					<Grid item md={12} lg={7}>
						<Box my={1} alignItems='center' sx={{height: "100%"}}>
							<StyledPaper variant='outlined'>
								<Typography mb={2} variant='h6'>
									<Box sx={{lineHeight: 2, fontWeight: "700"}}>Access Tokens</Box>
								</Typography>
								{token_list.length === 0 && (
									<Alert severity='info' sx={{whiteSpace: "pre-line"}}>
										<AlertTitle>Infor</AlertTitle>
										{t("token_management.table_info")}
									</Alert>
								)}
								<TableContainer>
									<Table
										size='small'
										sx={{
											tableLayout: "fixed",
											minWidth: 650,
										}}
										aria-label='simple table'>
										<TableHead>
											<TableRow>
												<TableCell>Value</TableCell>
												<TableCell>Created at</TableCell>
												<TableCell sx={{width: "15%"}}>TTL (seconds)</TableCell>
												<TableCell sx={{width: "40%"}}>Permissions</TableCell>
												<TableCell sx={{width: "15%"}}>Ratelimit</TableCell>
												<TableCell sx={{width: "6%"}}></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{token_list.map((row, index) => (
												<TableRow
													key={row.created_at.toString()}
													sx={{
														"&:last-child td, &:last-child th": {border: 0},
													}}>
													<TableCell>{row.value}</TableCell>
													<TableCell>{row.created_at.toString()}</TableCell>
													<TableCell>{row.ttl ? row.ttl : Infinity}</TableCell>
													<TableCell>
														<Grid container spacing={1}>
															{row.permissions.map((perm, perm_index) => (
																<Grid key={perm} item>
																	<Chip
																		label={perm}
																		onDelete={() => {
																			deletePermission(row.prefix, row.name, row.value, perm, index, perm_index);
																		}}
																	/>
																</Grid>
															))}
															{row.permissions.length < Object.keys(permission).length && (
																<Grid item>
																	<AddPermissionDialog
																		current_permission_list={row.permissions}
																		full_permission_dict={permission}
																		token_name={row.name}
																		token_value={row.value}
																		token_prefix={row.prefix}
																		setTokenCreateError={setLocalTokenCreateError}
																		setTokenList={setTokenList}
																		token_list={token_list}
																		index={index}
																	/>
																</Grid>
															)}
														</Grid>
													</TableCell>
													<TableCell>
                                                        <Stack direction='row' alignItems="center" spacing={2}>
                                                        {row.ratelimit}
														<UpdateRateLimitDialog
															token_name={row.name}
															token_value={row.value}
															token_prefix={row.prefix}
															setTokenCreateError={setLocalTokenCreateError}
															setTokenList={setTokenList}
															token_list={token_list}
															index={index}
														/>
                                                        </Stack>
							
													</TableCell>
													<TableCell>
														<IconButton
															aria-label='delete'
															size='large'
															onClick={() => deleteToken(row.prefix, row.name, row.value, index)}>
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
						<Box my={1} alignItems='center' sx={{height: "100%"}}>
							<StyledPaper variant='outlined'>
								<Typography variant='h6'>
									<Box
										sx={{
											lineHeight: 2,
											fontWeight: "700",
										}}>
										Create New Access Token
									</Box>
								</Typography>
								<Box my={2} justifyContent='center' alignItems='center' display='flex'>
									<Grid container direction='row' spacing={1}>
										<Grid
											item
											style={{
												alignItems: "center",
												justifyContent: "center",
											}}
											xs={5}>
											<Alert severity='info' sx={{whiteSpace: "pre-line"}}>
												<AlertTitle>Info</AlertTitle>
												{t("token_management.form_info")}
											</Alert>
										</Grid>
										<Grid
											style={{
												alignItems: "center",
												justifyContent: "center",
											}}
											item
											xs={7}>
											<form
												autoComplete='off'
												onSubmit={(e) => {
													postCreateToken(e);
												}}>
												<FormControl defaultValue='' fullWidth required>
													<Stack direction='column' spacing={2}>
														<TextField
															margin='normal'
															label='Token Name'
															type='text'
															size='small'
															onChange={(e) => setTokenName(e.target.value)}
															value={tokenname}
															error={tokennameError}
															autoComplete='off'
															InputProps={{
																startAdornment: (
																	<InputAdornment position='start'>
																		<CreateIcon />
																	</InputAdornment>
																),
															}}
														/>

														<Stack
															direction={{
																xs: "row",
															}}
															spacing={1}>
															<FormControlLabel
																control={<Switch checked={use_ttl} onChange={(e) => setUseTTL(e.target.checked)} />}
																label='TTL'
															/>
															<TextField
																id='ttl'
																label='Time To Live'
																disabled={!use_ttl}
																type='number'
																size='small'
																value={use_ttl ? ttl : ""}
																onChange={(e) => setTTL(e.target.value)}
																InputLabelProps={{
																	shrink: true,
																}}
																InputProps={{
																	startAdornment: (
																		<InputAdornment position='start'>
																			<TimerIcon />
																		</InputAdornment>
																	),
																}}
															/>
															<TextField
																id='time-unit'
																select
																disabled={!use_ttl}
																label='Unit'
																value={time_unit}
																onChange={(e) => setTimeUnit(e.target.value)}
																size='small'>
																{["day", "hour", "minute", "second"].map((option) => (
																	<MenuItem key={option} token={option} value={option}>
																		{option}
																	</MenuItem>
																))}
															</TextField>
														</Stack>
														<Stack
															direction={{
																xs: "row",
															}}
															spacing={1}>
															<TextField
																id='ratelimit'
																label='Ratelimit'
																fullWidth
																type='number'
																size='small'
																value={ratelimit}
																onChange={(e) => setRateLimit(e.target.value)}
																InputLabelProps={{
																	shrink: true,
																}}
																InputProps={{
																	startAdornment: (
																		<InputAdornment position='start'>
																			<SpeedIcon />
																		</InputAdornment>
																	),
																}}
															/>
															<TextField
																id='rate-limit-time-unit'
																select
																fullWidth
																label='Unit'
																value={ratelimit_time_unit}
																onChange={(e) => setRateLimitTimeUnit(e.target.value)}
																size='small'>
																{["day", "hour", "minute", "second"].map((option) => (
																	<MenuItem key={option} token={option} value={option}>
																		{option}
																	</MenuItem>
																))}
															</TextField>
														</Stack>
														<LoadingButton
															size='small'
															disabled={token_list.length >= 10 ? true : false}
															loading={tokencreateloading}
															loadingPosition='end'
															variant='contained'
															type='submit'
															endIcon={<LockOpenIcon />}>
															Generate
														</LoadingButton>
													</Stack>
												</FormControl>
											</form>
										</Grid>
									</Grid>
								</Box>
								{showkeycreateresponse && (
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
								)}
								{localtokencreateerror && <SuccessErrorAlert detail={localtokencreateerror} type='error' />}
								{servertokencreateerror && <SuccessErrorAlert detail={servertokencreateerror.response.data.detail} type='error' />}
								<Alert severity='warning' sx={{whiteSpace: "pre-line"}}>
									<AlertTitle>Warning</AlertTitle>
									{t("token_management.form_warning")}
								</Alert>
								<Typography variant='h6'>
									<Box
										sx={{
											lineHeight: 2,
											fontWeight: "700",
											mt: 1,
										}}>
										Token permissions
									</Box>
								</Typography>
								<Box m={1}>
									<Box mb={1}>
										<FormControlLabel
											sx={{
												"& .MuiFormControlLabel-label": {fontSize: "14px"},
											}}
											key='allow_all'
											control={
												<Checkbox
													size='small'
													onChange={(e) => {
														setAllPermission(e.target.checked);
													}}
												/>
											}
											label={t("token_management.allow_all")}
										/>
									</Box>
									<Grid container spacing={2}>
										<Grid item sm={12} md={6}>
											<Stack direction='column'>
												<FormLabel component='legend'>Inference permissions</FormLabel>
												{[
													{
														key: "allow_chat",
														label: t("token_management.allow_chat"),
													},
													{
														key: "allow_agent",
														label: t("token_management.allow_agent"),
													},
													{
														key: "allow_toolbox",
														label: t("token_management.allow_toolbox"),
													},
													{
														key: "allow_data_synthesis",
														label: t("token_management.allow_data_synthesis"),
													},
													{
														key: "allow_chat_api",
														label: t("token_management.allow_chat_api"),
													},
													{
														key: "allow_agent_api",
														label: t("token_management.allow_agent_api"),
													},
													{
														key: "allow_toolbox_api",
														label: t("token_management.allow_toolbox_api"),
													},
												].map((perm) => (
													<FormControlLabel
														sx={{
															"& .MuiFormControlLabel-label": {
																fontSize: "14px",
															},
														}}
														key={perm.key}
														control={
															<Checkbox
																size='small'
																checked={permission[perm.key]}
																onChange={(e) => {
																	setPermission({
																		...permission,
																		[perm.key]: e.target.checked,
																	});
																}}
															/>
														}
														label={perm.label}
													/>
												))}
											</Stack>
											<Stack direction='column'>
												<FormLabel component='legend'>Dataset permissions</FormLabel>
												{[
													{
														key: "add_dataset",
														label: "Allow add Dataset(s)",
													},
													{
														key: "change_dataset",
														label: "Allow update Dataset(s)",
													},
													{
														key: "view_dataset",
														label: "Allow view Dataset(s)",
													},
													{
														key: "delete_dataset",
														label: "Allow delete Dataset(s)",
													},
												].map((perm) => (
													<FormControlLabel
														sx={{
															"& .MuiFormControlLabel-label": {
																fontSize: "14px",
															},
														}}
														key={perm.key}
														control={
															<Checkbox
																size='small'
																checked={permission[perm.key]}
																onChange={(e) => {
																	setPermission({
																		...permission,
																		[perm.key]: e.target.checked,
																	});
																}}
															/>
														}
														label={perm.label}
													/>
												))}
											</Stack>
										</Grid>
										<Grid item sm={12} md={6}>
											<Stack mt={1} direction='column'>
												<FormLabel component='legend'>Log permissions</FormLabel>
												{[
													{
														key: "allow_view_log",
														label: t("token_management.allow_view_log"),
													},
													{
														key: "allow_view_cost",
														label: t("token_management.allow_view_cost"),
													},
												].map((perm) => (
													<FormControlLabel
														sx={{
															"& .MuiFormControlLabel-label": {
																fontSize: "14px",
															},
														}}
														key={perm.key}
														control={
															<Checkbox
																size='small'
																checked={permission[perm.key]}
																onChange={(e) => {
																	setPermission({
																		...permission,
																		[perm.key]: e.target.checked,
																	});
																}}
															/>
														}
														label={perm.label}
													/>
												))}
											</Stack>
											<Stack direction='column'>
												<FormLabel component='legend'>Template permissions</FormLabel>
												{[
													{
														key: "add_userinstructiontree",
														label: "Allow add template(s)",
													},
													{
														key: "change_userinstructiontree",
														label: "Allow update template(s)",
													},
													{
														key: "view_userinstructiontree",
														label: "Allow view template(s)",
													},
													{
														key: "delete_userinstructiontree",
														label: "Allow delete template(s)",
													},
												].map((perm) => (
													<FormControlLabel
														sx={{
															"& .MuiFormControlLabel-label": {
																fontSize: "14px",
															},
														}}
														key={perm.key}
														control={
															<Checkbox
																size='small'
																checked={permission[perm.key]}
																onChange={(e) => {
																	setPermission({
																		...permission,
																		[perm.key]: e.target.checked,
																	});
																}}
															/>
														}
														label={perm.label}
													/>
												))}
											</Stack>
											<Stack direction='column'>
												<FormLabel component='legend'>Dataset Record permissions</FormLabel>
												{[
													{
														key: "add_datasetrecord",
														label: "Allow add Dataset Record(s)",
													},
													{
														key: "change_datasetrecord",
														label: "Allow update Dataset Record(s)",
													},
													{
														key: "view_datasetrecord",
														label: "Allow view Dataset Record(s)",
													},
													{
														key: "delete_datasetrecord",
														label: "Allow delete Dataset Records(s)",
													},
												].map((perm) => (
													<FormControlLabel
														sx={{
															"& .MuiFormControlLabel-label": {
																fontSize: "14px",
															},
														}}
														key={perm.key}
														control={
															<Checkbox
																size='small'
																checked={permission[perm.key]}
																onChange={(e) => {
																	setPermission({
																		...permission,
																		[perm.key]: e.target.checked,
																	});
																}}
															/>
														}
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
			</Container>
			<Footer />
		</Container>
	);
}
export default TokenManagement;
