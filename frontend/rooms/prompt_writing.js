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
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import ResponsiveAppBar from "../component/nav/Navbar.js";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import {TextCopy} from "../component/custom_ui_component/TextCopy.js";
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
    const [dataset_is_loading, setDatasetIsLoading] =useState(true);
	const [dataset_row, setDatasetRow] = useState([]);
	const [dataset_column, setDatasetColumn] = useState([]);
	const [record_list, setRecordList] = useState([]);
	const [rowSelectionModel, setRowSelectionModel] = useState([]);
	const [current_system_prompt, setCurrentSystemPrompt] = useState("");
	const [current_evaluation, setCurrentEvaluation] = useState([]);
	const [current_embedding, setCurrentEmbedding] = useState("");
	const [current_system_prompt_error, setCurrentSystemPromptError] = useState(false);
	const [current_content, setCurrentContent] = useState([]);
	const [current_content_error, setCurrentContentError] = useState(false);
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
	const [total_row, setTotalRow] = useState(0);
	const [paginationModel, setPaginationModel] = useState({
		pageSize: 10,
		page: 0,
	});
	const {is_authenticated} = useContext(UserContext);
	useGetRedirectAnon(navigate, is_authenticated);

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
		setCurrentEmbedding(new_row.embedding);
		setCurrentSystemPrompt(new_row.system_prompt);
		for (let i = 0; i < record_list.results.record_serializer.length; i++) {
			if (record_list.results.record_serializer[i].id === new_row.id) {
				setCurrentEvaluation(record_list.results.record_serializer[i].evaluation);
				setCurrentContent(record_list.results.record_serializer[i].content);
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

	const updateContent = (v, index) => {
		const new_content_list = current_content.map((item, i) => {
			if (i === index) {
				return {...item, ["value"]: v};
			}
			return item;
		});
		setCurrentContent(new_content_list);
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
        setDatasetIsLoading(true)   
		const dataset = dataset_list[selectedIndex];

		if (!current_system_prompt) {
			setCurrentSystemPromptError(true);
		}
		if (current_content.length === 0) {
			setCurrentContentError(true);
		}

        for (let content in current_content) {
            if (current_content[content].is_required && !current_content[content].value) {
                setSaveError(true);
                setSaveErrorMessage(`${current_content[content].name} is a required! field`);
                setDatasetIsLoading(false)
                setLoading(false);
                return
            }
        }

        for (let eva in current_evaluation) {
            if (current_evaluation[eva].is_required && !current_evaluation[eva].value) {
                setSaveError(true);
                setSaveErrorMessage(`${current_evaluation[eva].evaluation_name} is a required evaluation`);
                setDatasetIsLoading(false)
                setLoading(false);
                return
            }
        }
		if (current_content && current_system_prompt && dataset && !current_content_error) {
			const data = {
				dataset_id: dataset.id,
				content: current_content,
				system_prompt: current_system_prompt,
				evaluation: current_evaluation,
			};
			const handleSuccess = () => {
				record_refetch();
				const new_content_list = current_content.map((item) => {
					if (item["value"]) {
						return {...item, ["value"]: ""};
					}
					return item;
				});
                setCurrentEmbedding("")
				setCurrentContent(new_content_list);
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
			if (!current_content) {
				setSaveErrorMessage("Fields cannot be empty");
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
		setAllowSaveRecord(false);
		let new_content = [...dataset_list[index].default_content_structure];
		for (let content in new_content) {
			if (new_content[content]["value"]) {
				new_content[content]["value"] = "";
			}
		}
		setCurrentContent(new_content);
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
        setDatasetIsLoading(true)   
		if (current_record_id && dataset_list[selectedIndex]) {
			const data = {
				record_id: current_record_id,
				dataset_id: dataset_list[selectedIndex].id,
			};

			deletemutate(
				{url: "/frontend-api/delete-record", data: data},
				{
					onSuccess: () => {
						setDatasetRow((prev) => prev.filter((row) => row.id !== data.record_id));
						setDeleteSuccess(true);
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
		setCurrentContent(dataset_list[selectedIndex].default_content_structure);
		setCurrentRecordId(null);
        setCurrentEmbedding("")
		setCurrentEvaluation(dataset_list[selectedIndex].default_evaluation);
		setCurrentSystemPrompt(dataset_list[selectedIndex].default_system_prompt);
	};

	const {
		isLoading: datasetIsLoading,
		isSuccess: datasetIsSuccess,
		isError: datasetIsError,
	} = useGetUserDataset(
		setDatasetList,
		dataset_list,
		setMaxDatasetNum,
		setMaxEvaluationNum,
		selectedIndex,
		setCurrentSystemPrompt,
		setCurrentEvaluation,
		setCurrentContent
	);

	const {refetch: record_refetch} = useGetUserDatasetRecord(
        setDatasetIsLoading,
		setRecordList,
		dataset_list,
        dataset_row,
		selectedIndex,
		paginationModel,
		setDatasetColumn,
		setDatasetRow,
		setTotalRow
	);
	const handleRowClick = (params) => {
		const {id, system_prompt, embedding} = params.row;
		setCurrentRecordId(id);
		setAllowSaveRecord(false);
		setCurrentSystemPrompt(system_prompt);
		const clickedRecord = record_list.results.record_serializer.find((record) => record.id === id);
		if (clickedRecord) {
			const new_evaluation_list = current_evaluation.map((item) => {
				for (let clicked_eva in clickedRecord.evaluation) {
					if (
						clickedRecord.evaluation[clicked_eva]["evaluation_name"] === item["evaluation_name"] &&
						clickedRecord.evaluation[clicked_eva]["evaluation_type"] === item["evaluation_type"]
					) {
						return {...item, ["evaluation_value"]: clickedRecord.evaluation[clicked_eva]["evaluation_value"]};
					}
				}
				return item;
			});
			setCurrentEvaluation(new_evaluation_list);
			setCurrentContent(clickedRecord.content);
			setCurrentEmbedding(embedding);
		}
	};
	const addRecord = () => {
		setCurrentSystemPrompt(dataset_list[selectedIndex].default_system_prompt);
		setCurrentEvaluation(dataset_list[selectedIndex].default_evaluation);
		setCurrentContent(dataset_list[selectedIndex].default_content_structure);
		setCurrentEmbedding([]);
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

    const pagination_navigation = (value) => {
        setPaginationModel(value)
        setDatasetIsLoading(true)     
    }
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
									dataset_list.map((dataset, index) =>  (
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
												{!datasetIsLoading && dataset.default_content_structure && (
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
														old_default_content_structure={dataset.default_content_structure}
														setCurrentEvaluation={setCurrentEvaluation}
														setCurrentSystemPrompt={setCurrentSystemPrompt}
														record_refetch={record_refetch}
													/>
												)}
											</ListItemButton>
										</ListItem>
									))}
								<Box display='flex' justifyContent='center' alignItems='center' mt={1}>
									{allow_add_dataset &&
										(datasetIsError || datasetIsSuccess) &&
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
										{current_content.length > 0 &&
											current_content.map((content, index) => (
												<>
													{index === 0 && content["name"] !== "System Prompt" && (
														<TextField
                                                            key={content["name"]}
															label='System Prompt'
															multiline
															error={current_system_prompt_error}
															minRows={8}
															maxRows={10}
															value={current_system_prompt}
															InputLabelProps={{shrink: true}}
															onChange={(e) => {
																setCurrentSystemPrompt(e.target.value);
																setAllowSaveRecord(true);
															}}
															inputProps={{maxLength: 2500}}
														/>
													)}

													<TextField
														key={content["unique"]}
														label={content["name"]}
														error={current_content_error}
                                                        required={content["is_required"]}
														multiline
														minRows={8}
														maxRows={10}
														value={current_content[index]["value"]}
														InputLabelProps={{shrink: true}}
														onChange={(e) => {
															updateContent(e.target.value, index);

															setAllowSaveRecord(true);
														}}
														inputProps={{maxLength: 2500}}
													/>
												</>
											))}
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
									{current_evaluation &&
										current_evaluation.map((ev, index) => {
											return (
												<Paper variant='outlined' key={ev['unique']}>
													<Box m={2}>
														<Typography style={{flex: 1}} variant='h6' gutterBottom>
															{`${ev.evaluation_default_question}${ev.is_required ? "*": ""}`}
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
																				!ev.evaluation_value || !ev.evaluation_value.includes(label)
																					? "outlined"
																					: "fill"
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
                                loading={dataset_list.length > 0 ? datasetIsLoading || dataset_is_loading : false}
								onRowClick={handleRowClick}
								disableColumnSorting
								paginationModel={paginationModel}
								onPaginationModelChange={(e) => {pagination_navigation(e)}}
								disableAutosize
								rows={dataset_row}
								columns={dataset_column}
								pageSizeOptions={[10]}
								paginationMode='server'
								rowCount={total_row}
								onRowSelectionModelChange={(newRowSelectionModel) => {
									setRowSelectionModel(newRowSelectionModel);
								}}
								rowSelectionModel={rowSelectionModel}
							/>
						</Box>
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</Container>
	);
}
export default PromptWriting;
