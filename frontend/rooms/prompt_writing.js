import React, {useContext, useState} from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Alert from "@mui/material/Alert";
import AskAgainDialog from "../component/dialog/AskAgainDialog.js";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import {DataGrid} from "@mui/x-data-grid";
import {DatasetExportServerSide} from "../component/import_export/DatasetExportServerSide.js";
import DatasetMutateDialog from "../component/dialog/DatasetMutateDialog.js";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Footer from "../component/nav/Footer.js";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoadingButton from "@mui/lab/LoadingButton";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import ResponsiveAppBar from "../component/nav/Navbar.js";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { TextCopy } from "../component/custom_ui_component/TextCopy.js";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {UserContext} from "../App.js";
import {baseDelete} from "../api_hook/baseDelete.js";
import {basePost} from "../api_hook/basePost.js";
import {basePut} from "../api_hook/basePut.js";
import {useGetRedirectAnon} from "../api_hook/useGetRedirectAnon.js";
import {useGetUserDataset} from "../api_hook/useGetUserDataset.js";
import {useGetUserDatasetRecord} from "../api_hook/useGetUserDatasetRecord.js";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";

function PromptWriting() {
	const navigate = useNavigate();
	const [open_ask_again, setOpenAskAgain] = useState(false);
	const [dataset_row, setDatasetRow] = useState([]);
	const [dataset_column, setDatasetColumn] = useState([]);
	const [record_list, setRecordList] = useState([]);
	const [pagnation_page, setPaginationPage] = useState(1);
	const [rowSelectionModel, setRowSelectionModel] = useState([]);
	const [current_system_prompt, setCurrentSystemPrompt] = useState("");
	const [current_evaluation, setCurrentEvaluation] = useState([]);
	const [current_prompt, setCurrentPrompt] = useState("");
	const [current_response, setCurrentResponse] = useState("");
	const [current_embedding, setCurrentEmbedding] = useState("");
	const [current_system_prompt_error, setCurrentSystemPromptError] = useState(false);
	const [current_prompt_error, setCurrentPromptError] = useState(false);
	const [current_response_error, setCurrentResponseError] = useState(false);
	const [current_record_id, setCurrentRecordId] = useState(null);
	const [allow_save_record, setAllowSaveRecord] = useState(false);
	const [loading, setLoading] = useState(false);
	const [savesuccess, setSaveSuccess] = useState(false);
	const [saveerror, setSaveError] = useState(false);
	const [saveerrormessage, setSaveErrorMessage] = useState("");
	const [deletesuccess, setDeleteSuccess] = useState(false);
	const [deleteerror, setDeleteError] = useState(false);
	const [deleteerrormessage, setDeleteErrorMessage] = useState("");
	const [dataset_list, setDatasetList] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [allow_add_dataset, setAllowAddDataset] = useState(true);
	const [max_dataset_num, setMaxDatasetNum] = useState(10);
	const [max_evaluation_num, setMaxEvaluationNum] = useState(10);
	const [total_node, setTotalNode] = useState(0);
	const {is_authenticated} = useContext(UserContext);
	useGetRedirectAnon(navigate, is_authenticated);

	const navigatePagination = (_, value) => {
		setPaginationPage(value);
	};

	const navigateRow = (direction) => {
		let old_row_id = rowSelectionModel;
		let new_row = null;

		if (typeof rowSelectionModel !== "number") {
			if (direction === "next") {
				new_row = dataset_row[0];
			} else if (direction === "previous") {
				new_row = dataset_row[dataset_row.length - 1];
			}
		} else {
			for (let i = 0; i < dataset_row.length; i++) {
				if (dataset_row[i].id === old_row_id) {
					new_row = dataset_row[i + (direction === "next" ? 1 : -1)] || dataset_row[direction === "next" ? 0 : dataset_row.length - 1];
					break;
				}
			}
		}
		setRowSelectionModel(new_row.id);
		setCurrentRecordId(new_row.id);
		setCurrentPrompt(new_row.prompt);
		setCurrentResponse(new_row.response);
		setCurrentEmbedding(new_row.embedding);
		setCurrentSystemPrompt(new_row.system_prompt);
		for (let i = 0; i < record_list.results.record_serializer.length; i++) {
			if (record_list.results.record_serializer[i].id === new_row.id) {
				setCurrentEvaluation(record_list.results.record_serializer[i].evaluation);
				break;
			}
		}
	};
	const updateEvaluationValue = (v, property, index) => {
		const new_evaluation_list = current_evaluation.map((item, i) => {
			if (i === index) {
				return {...item, [property]: v};
			}
			return item;
		});
		setCurrentEvaluation(new_evaluation_list);
	};
	const {mutate: postmutate} = useMutation(basePost);
	const {mutate: putmutate} = useMutation(basePut);
	const {mutate: deletemutate} = useMutation(baseDelete);
	const deleteReq = (id) => {
		const data = {
			id: id,
		};
		deletemutate(
			{url: "/frontend-api/delete-dataset", data: data},
			{
				onSuccess: () => setDeleteSuccess(true),
				onError: (error) => {
					if (error.code === "ERR_BAD_RESPONSE") {
						setSaveErrorMessage("Failed, Internal Server Error!");
					} else {
						setDeleteErrorMessage(error.response.data.detail);
					}
				},
			}
		);
	};

	const saveRecord = () => {
		const dataset = dataset_list[selectedIndex];
		const validateAndSetError = (field, setError) => {
			if (!field) {
				setError(true);
			}
		};
		validateAndSetError(current_prompt, setCurrentPromptError);
		validateAndSetError(current_response, setCurrentResponseError);
		validateAndSetError(current_system_prompt, setCurrentSystemPromptError);
		if (current_prompt && current_response && current_system_prompt && dataset) {
			const data = {
				dataset_id: dataset.id,
				prompt: current_prompt,
				response: current_response,
				system_prompt: current_system_prompt,
				evaluation: current_evaluation,
			};
			const handleSuccess = () => {
				record_refetch();
				setSaveSuccess(true);
				setAllowSaveRecord(false);
			};
			const handleError = (error) => {
				setSaveError(true);
				if (error.code === "ERR_BAD_RESPONSE") {
					setSaveErrorMessage("Failed, Internal Server Error!");
				} else {
					setSaveErrorMessage(error.response.data.detail);
				}
			};

			const requestData = {
				url: current_record_id ? "/frontend-api/update-record" : "/frontend-api/create-record",
				data: current_record_id ? {...data, record_id: current_record_id} : data,
			};
			const requestConfig = {
				onSuccess: handleSuccess,
				onError: handleError,
			};
			current_record_id ? putmutate(requestData, requestConfig) : postmutate(requestData, requestConfig);
			setLoading(false);
		} else {
			setSaveError(true);
			if (!current_prompt) {
				setSaveErrorMessage("Prompt Cannot be Empty!");
			} else if (!current_response) {
				setSaveErrorMessage("Response Cannot be Empty!");
			} else if (!current_system_prompt) {
				setSaveErrorMessage("System Prompt Cannot be Empty!");
			} else if (!dataset) {
				setSaveErrorMessage("Dataset Cannot be Empty!");
			}
			setLoading(false);
		}
	};

	const handleListItemClick = (index) => {
		setSelectedIndex(index);
		setCurrentRecordId(null);
		setCurrentPrompt("");
		setCurrentResponse("");
		setCurrentSystemPrompt(dataset_list[index].default_system_prompt);
		setCurrentEvaluation(dataset_list[index].default_evaluation);
	};

	const deleteDataset = () => {
		setAllowAddDataset(true);
		const newDatasetList = [...dataset_list];
		const nodeToDelete = dataset_list[selectedIndex];
		if (nodeToDelete.id !== null) {
			deleteReq(nodeToDelete.id);
			setDeleteSuccess(true);
		}

		if (newDatasetList.length > 1) {
			setDatasetList((prev) => prev.filter((_, i) => i !== selectedIndex));
			setDeleteSuccess(true);
		} else {
			setDatasetList([]);
		}
	};
	const deleteRecord = () => {
		if (current_record_id && dataset_list[selectedIndex]) {
			const data = {
				record_id: current_record_id,
				dataset_id: dataset_list[selectedIndex].id,
			};

			deletemutate(
				{url: "/frontend-api/delete-record", data: data},
				{
					onSuccess: () => {
						setDeleteSuccess(true);
						record_refetch();
					},
					onError: (error) => {
						if (error.code === "ERR_BAD_RESPONSE") {
							setSaveErrorMessage("Failed, Internal Server Error!");
						} else {
							setDeleteErrorMessage(error.response.data.detail);
						}
					},
				}
			);
		}
		setCurrentPrompt("");
		setCurrentResponse("");
		setCurrentRecordId(null);
		setCurrentEvaluation(dataset_list[selectedIndex].default_evaluation);
		setCurrentSystemPrompt(dataset_list[selectedIndex].default_system_prompt);
	};

	const {
		isLoading: datasetIsLoading,
		isSuccess: datasetIsSuccess,
		isError: datasetIsError,
	} = useGetUserDataset(setDatasetList, setMaxDatasetNum, setMaxEvaluationNum, selectedIndex, setCurrentSystemPrompt, setCurrentEvaluation);

	const {refetch: record_refetch} = useGetUserDatasetRecord(
		setRecordList,
		dataset_list,
		selectedIndex,
		pagnation_page,
		setDatasetColumn,
		setDatasetRow,
		setTotalNode
	);
	const handleRowClick = (params) => {
		const {id, prompt, response, system_prompt, embedding} = params.row;
		setCurrentRecordId(id);
		setCurrentPrompt(prompt);
		setCurrentResponse(response);
		setCurrentSystemPrompt(system_prompt);
		const clickedRecord = record_list.results.record_serializer.find((record) => record.id === id);
		if (clickedRecord) {
			setCurrentEvaluation(clickedRecord.evaluation);
		}
		setCurrentEmbedding(embedding);
	};
	const addRecord = () => {
		setCurrentSystemPrompt(dataset_list[selectedIndex].default_system_prompt);
		setCurrentEvaluation(dataset_list[selectedIndex].default_evaluation);
		setCurrentPrompt("");
		setCurrentResponse("");
		setCurrentRecordId(null);
	};

	const select_label = (value, index, evaluation_type) => {
		const new_evaluation_list = current_evaluation.map((item, i) => {
			if (i === index) {
				if (evaluation_type === 1) {
					if (!item["evaluation_value"] || !item["evaluation_value"].includes(value)) {
						return {...item, ["evaluation_value"]: item["evaluation_value"] ? item["evaluation_value"].concat(value) : [value]};
					} else {
						return {...item, ["evaluation_value"]: item["evaluation_value"].filter((v) => v !== value)};
					}
				} else if (evaluation_type === 2) {
					return {...item, ["evaluation_value"]: [value]};
				}
			}
			return item;
		});
		setCurrentEvaluation(new_evaluation_list);
	};
	return (
		<Container maxWidth={false} sx={{minWidth: 1200}} disableGutters>
			<title>Dataset</title>
			<ResponsiveAppBar max_width={false} />
			<Container maxWidth='xxl'>
				<Grid container spacing={1}>
					<Grid item xs={2}>
						<Paper sx={{mt: 2}} variant='outlined'>
							<Typography ml={2} mt={1} variant='body1' sx={{color: "text.secondary"}}>
								Dataset
							</Typography>
							<List dense>
								{dataset_list &&
									dataset_list.map((dataset, index) => (
										<ListItem key={dataset.id} disablePadding>
											<ListItemButton sx={{height: 38}} selected={selectedIndex === index} onClick={() => handleListItemClick(index)}>
												<ListItemIcon>{selectedIndex === index ? <FolderOpenIcon /> : <FolderIcon />}</ListItemIcon>
												<ListItemText
													primaryTypographyProps={{
														fontWeight: "medium",
														variant: "body2",
														style: {whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"},
													}}
													primary={dataset.name}
												/>
												<DatasetMutateDialog
													setAllowAddDataset={setAllowAddDataset}
													setDatasetList={setDatasetList}
													setSelectedIndex={setSelectedIndex}
													dataset_list={dataset_list}
													max_evaluation_num={max_dataset_num}
													method='put'
													dataset_id={dataset.id}
													old_dataset_name={dataset.name}
													old_default_evaluation={dataset.default_evaluation}
													old_default_system_prompt={dataset.default_system_prompt}
													setCurrentEvaluation={setCurrentEvaluation}
													setCurrentSystemPrompt={setCurrentSystemPrompt}
												/>
											</ListItemButton>
										</ListItem>
									))}
								<Box display='flex' justifyContent='center' alignItems='center' mt={1}>
									{allow_add_dataset &&
										datasetIsError &&
										!datasetIsLoading &&
										dataset_list.length < max_dataset_num &&
										max_evaluation_num && (
											<DatasetMutateDialog
												setAllowAddDataset={setAllowAddDataset}
												setDatasetList={setDatasetList}
												setSelectedIndex={setSelectedIndex}
												dataset_list={dataset_list}
												max_evaluation_num={max_dataset_num}
												method='post'
												setCurrentEvaluation={setCurrentEvaluation}
												setCurrentSystemPrompt={setCurrentSystemPrompt}
												open_dialog={datasetIsError && !datasetIsLoading ? true : false}
											/>
										)}

									{allow_add_dataset &&
										datasetIsSuccess &&
										!datasetIsLoading &&
										dataset_list.length < max_dataset_num &&
										max_evaluation_num && (
											<DatasetMutateDialog
												setAllowAddDataset={setAllowAddDataset}
												setDatasetList={setDatasetList}
												setSelectedIndex={setSelectedIndex}
												dataset_list={dataset_list}
												max_evaluation_num={max_dataset_num}
												method='post'
												setCurrentEvaluation={setCurrentEvaluation}
												setCurrentSystemPrompt={setCurrentSystemPrompt}
												open_dialog={false}
											/>
										)}
									{dataset_list && dataset_list.length > 1 && (
										<IconButton
											aria-label='delete'
											onClick={() => {
												setOpenAskAgain(true);
											}}>
											<DeleteIcon />
										</IconButton>
									)}

									{open_ask_again && (
										<AskAgainDialog executing_function={deleteDataset} delete_object_name='Dataset' setOpenAskAgain={setOpenAskAgain} />
									)}
								</Box>
							</List>
						</Paper>
						<Box sx={{mt: 2}}>
							<DatasetExportServerSide
								dataset_id={dataset_list[selectedIndex] ? dataset_list[selectedIndex].id : null}
								dataset_name={dataset_list[selectedIndex] ? dataset_list[selectedIndex].name : null}
								setSaveError={setSaveError}
								setSaveErrorMessage={setSaveErrorMessage}
							/>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Grid container spacing={1}>
							<Grid item xs={7}>
								<FormControl fullWidth sx={{mt: 2, mb: 1}} variant='standard'>
									<Stack direction='column' spacing={2}>
										<TextField
											label='System Prompt'
											multiline
											error={current_system_prompt_error}
											minRows={6}
											maxRows={8}
											value={current_system_prompt}
											InputLabelProps={{shrink: true}}
											onChange={(e) => {
												setCurrentSystemPrompt(e.target.value);
												setAllowSaveRecord(true);
											}}
											inputProps={{maxLength: 2500}}
										/>
										<TextField
											label='Prompt'
											error={current_prompt_error}
											multiline
											minRows={8}
											maxRows={10}
											value={current_prompt}
											InputLabelProps={{shrink: true}}
											onChange={(e) => {
												setCurrentPrompt(e.target.value);
												setAllowSaveRecord(true);
											}}
											inputProps={{maxLength: 2500}}
										/>
										<TextField
											label='Response'
											error={current_response_error}
											multiline
											minRows={8}
											value={current_response}
											inputProps={{maxLength: 2500}}
											InputLabelProps={{shrink: true}}
											fullWidth
											maxRows={10}
											onChange={(e) => {
												setCurrentResponse(e.target.value);
												setAllowSaveRecord(true);
											}}
										/>
										<TextField
											label='Embedding'
											multiline
											minRows={2}
											maxRows={2}
											value={current_embedding}
											InputLabelProps={{shrink: true}}
											disabled
											InputProps={{
												endAdornment: (
													<InputAdornment
														sx={{
															position: "absolute",
															top: 20,
															right: 2,
														}}
														position='end'>
														<TextCopy message={`[${current_embedding}]`} />
													</InputAdornment>
												),

												startAdornment: <InputAdornment position='start'> </InputAdornment>,
											}}
										/>
									</Stack>
								</FormControl>
								<Box display='flex' justifyContent='center' alignItems='center'>
									<Stack direction='row' mt={1} spacing={1}>
										<LoadingButton
											size='small'
											loading={loading}
											disabled={!dataset_row.length}
											loadingPosition='start'
											variant='contained'
											onClick={() => navigateRow("previous")}
											startIcon={<KeyboardArrowLeftIcon />}>
											Previous
										</LoadingButton>
										<IconButton
											aria-label='add'
											size='small'
											onClick={() => {
												addRecord();
												setAllowSaveRecord(true);
											}}>
											<AddCircleOutlineIcon />
										</IconButton>
										<LoadingButton
											size='small'
											loading={loading}
											disabled={!allow_save_record}
											loadingPosition='end'
											variant='contained'
											onClick={() => {
												setLoading(true);
												saveRecord();
											}}
											endIcon={<SaveIcon />}>
											Save
										</LoadingButton>
										<IconButton aria-label='delete' size='small' onClick={deleteRecord}>
											<DeleteIcon />
										</IconButton>
										<LoadingButton
											size='small'
											loading={loading}
											disabled={!dataset_row.length}
											loadingPosition='end'
											variant='contained'
											onClick={() => navigateRow("next")}
											endIcon={<KeyboardArrowRightIcon />}>
											Next
										</LoadingButton>
									</Stack>
									{[
										{
											open: savesuccess,
											autoHideDuration: 3000,
											onClose: () => setSaveSuccess(false),
											severity: "success",
											message: "Saved!",
										},
										{
											open: saveerror,
											autoHideDuration: 6000,
											onClose: () => setSaveError(false),
											severity: "error",
											message: saveerrormessage,
										},
										{
											open: deletesuccess,
											autoHideDuration: 3000,
											onClose: () => setDeleteSuccess(false),
											severity: "success",
											message: "Deleted!",
										},
										{
											open: deleteerror,
											autoHideDuration: 6000,
											onClose: () => setDeleteError(false),
											severity: "error",
											message: deleteerrormessage,
										},
									].map((item, index) => (
										<Snackbar key={index} open={item.open} autoHideDuration={item.autoHideDuration} onClose={item.onClose}>
											<Alert severity={item.severity} sx={{width: "100%"}}>
												{item.message}
											</Alert>
										</Snackbar>
									))}
								</Box>
							</Grid>
							<Grid sm={5} item>
								<Stack spacing={2} mt={2} direction='column'>
									{current_evaluation.map((ev, index) => {
										return (
											<Paper variant='outlined' key={index}>
												<Box m={2}>
													<Typography style={{flex: 1}} variant='h6' gutterBottom>
														{ev.evaluation_default_question}
														<Tooltip
															title={
																<div
																	style={{
																		whiteSpace: "pre-line",
																	}}>
																	{ev.evaluation_description}
																</div>
															}
															arrow
															placement='top'>
															<IconButton size='small'>
																<HelpIcon fontSize='small' />
															</IconButton>
														</Tooltip>
													</Typography>
													{(ev.evaluation_type === 1 || ev.evaluation_type === 2) && (
														<Grid direction='row' container spacing={1}>
															{ev.evaluation_label.map((label) => (
																<Grid key={label} item>
																	<Chip
																		icon={
																			!ev.evaluation_value || !ev.evaluation_value.includes(label) ? (
																				<BookmarkBorderIcon />
																			) : (
																				<BookmarkIcon />
																			)
																		}
																		label={label}
																		variant={
																			!ev.evaluation_value || !ev.evaluation_value.includes(label) ? "outlined" : "fill"
																		}
																		onClick={() => {
																			select_label(label, index, ev.evaluation_type);
																		}}
																	/>
																</Grid>
															))}
														</Grid>
													)}
													{ev.evaluation_type === 3 && (
														<TextField
															id='eval-number'
															fullWidth
															size='small'
															value={ev.evaluation_value}
															onChange={(e) => {
																updateEvaluationValue(e.target.value, "evaluation_value", index);
																setAllowSaveRecord(true);
															}}
															type='number'
															InputLabelProps={{
																shrink: true,
															}}
														/>
													)}
													{ev.evaluation_type === 4 && (
														<TextField
															id='eval-question'
															size='small'
															fullWidth
															multiline
															minRows={4}
															maxRows={6}
															onChange={(e) => {
																updateEvaluationValue(e.target.value, "evaluation_value", index);
															}}
															value={ev.evaluation_value}
															InputLabelProps={{
																shrink: true,
															}}
														/>
													)}
													{ev.evaluation_type === 5 && (
														<Rating
															value={Number(ev.evaluation_value)}
															max={Number(ev.evaluation_default_rating_scale)}
															precision={0.5}
															onChange={(_, newValue) => {
																updateEvaluationValue(newValue, "evaluation_value", index);
															}}
														/>
													)}
												</Box>
											</Paper>
										);
									})}
								</Stack>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={4}>
						<Box mt={2} style={{height: 637, width: "100%"}}>
							<DataGrid
								onRowClick={handleRowClick}
								disableColumnSorting
								disableAutosize
								rows={dataset_row}
								columns={dataset_column}
								hideFooter={true}
								onRowSelectionModelChange={(newRowSelectionModel) => {
									setRowSelectionModel(newRowSelectionModel);
								}}
								rowSelectionModel={rowSelectionModel}
							/>
						</Box>
						<Box display='flex' justifyContent='center' alignItems='center' m={1}>
							<Pagination count={total_node} showFirstButton showLastButton onChange={navigatePagination} variant='outlined' shape='rounded' />
						</Box>
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</Container>
	);
}
export default PromptWriting;
