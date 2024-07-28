import React, {useState} from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import GetAppIcon from "@mui/icons-material/GetApp";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {usePostLargeDatasetExport} from "../../api_hook/usePostLargeDatasetExport";

export const DatasetExportServerSide = ({dataset_id, dataset_name, setSaveErrorMessage, setSaveError}) => {
	const [extension, setExtension] = useState(".csv");
	const [show_download_link, setShowDownloadLink] = useState(false);
	const [download_link, setDownloadLink] = useState("");
	const [copied, setCopied] = useState(false);
	const {fetch: postLargedatasetExport} = usePostLargeDatasetExport({
		dataset_id,
		dataset_name,
		extension,
		setSaveErrorMessage,
		setSaveError,
		setDownloadLink,
		setShowDownloadLink,
	});
	const copyToClipboard = (e) => {
		setCopied(true);
		navigator.clipboard.writeText(e);
	};
	const handleClose = () => {
		setShowDownloadLink(false);
	};
	const handleExportServerSide = (event) => {
		event.preventDefault();
		if (dataset_id && dataset_name) {
			postLargedatasetExport();
		} else {
			setSaveError(true);
			setSaveErrorMessage("No dataset to export!");
		}
	};

	return (
		<Paper variant='outlined'>
			<Box ml={2} mt={1} mb={1}>
				<Typography  sx={{color: "text.secondary"}}>Dataset Export</Typography>
			</Box>
			<Divider />
			<Box mb={2} mt={2} ml={1} mr={2}>
				<Box mt={2}>
					<FormControl fullWidth>
						<Stack direction={"row"} spacing={1}>
							<InputLabel id='export-label-chatlog'>Formats</InputLabel>
							<Select
								labelId='export-label-chatlog'
								id='export-select-chatlog'
								onChange={(e) => setExtension(e.target.value)}
								value={extension}
								label='Export'
								size='small'
								fullWidth>
								{[".jsonl", ".csv"].map((format) => {
									return (
										<MenuItem key={format} value={format}>
											{format}
										</MenuItem>
									);
								})}
							</Select>
							<Button fullWidth size='small' variant='contained' onClick={handleExportServerSide} endIcon={<GetAppIcon />}>
								Export
							</Button>
						</Stack>
					</FormControl>
					<Dialog
						open={show_download_link}
						onClose={handleClose}
						aria-labelledby='alert-dialog-title'
						aria-describedby='alert-dialog-description'
						fullWidth
						maxWidth='md'>
						<DialogTitle id='alert-dialog-title'>{"Download Link"}</DialogTitle>
						<IconButton
							aria-label='close'
							onClick={handleClose}
							size='small'
							sx={{
								position: "absolute",
								right: 8,
								top: 12,
								color: (theme) => theme.palette.grey[500],
							}}>
							<CloseIcon />
						</IconButton>
						<DialogContent>
							<DialogContentText id='alert-dialog-description'>
								You dataset export has been scheduled. Depend on the the size of your dataset, it can take a few minutes. You can download the
								file via this link when the task is finished:
								<Box mt={2}>
									<Paper
										sx={{
											display: "flex",
											justifyContent: "space-between",
										}}>
										<Box m={1} align='left'>
											<Typography component={'span'} variant='body1'>{download_link}</Typography>
										</Box>
										<Box align='right'>
											<Stack alignItems="center"  direction='row'>
												{copied && <Typography component={'span'} variant='subtitle2'>Copied!</Typography>}
												<IconButton onClick={() => copyToClipboard(`${download_link}`)} aria-label='copy' size='small'>
													<ContentCopyIcon fontSize='small' />
												</IconButton>
											</Stack>
										</Box>
									</Paper>
								</Box>
							</DialogContentText>
						</DialogContent>
					</Dialog>
				</Box>
			</Box>
		</Paper>
	);
};

DatasetExportServerSide.propTypes = {
	dataset_id: PropTypes.number,
	dataset_name: PropTypes.string,
	setSaveError: PropTypes.func.isRequired,
	setSaveErrorMessage: PropTypes.func.isRequired,
};
