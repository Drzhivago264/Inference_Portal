import React, {useState} from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import GetAppIcon from "@mui/icons-material/GetApp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Papa from "papaparse";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const DatasetExport = ({filename, data}) => {
	const [choosen_export_format, setChoosenExportFormat] = useState(".json");
	const handleExportChatLog = (event) => {
		event.preventDefault();

		var data_clone = [...data];
		var a = document.createElement("a");
		if (choosen_export_format == ".json") {
			let download_content = JSON.stringify(data_clone);
			let blob = new Blob([download_content], {
				type: "application/json",
			});
			let url = URL.createObjectURL(blob);
			a.setAttribute("href", url);
			a.setAttribute("download", `${filename}.json`);
			a.click();
		} else if (choosen_export_format == ".csv") {
			let download_content = Papa.unparse(data);
			let blob = new Blob([download_content]);
			if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveBlob(blob, `${filename}.csv`);
			else {
				a.href = window.URL.createObjectURL(blob, {
					type: "text/plain",
				});
				a.download = `${filename}.csv`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
		}
	};
	return (
		<Paper sx={{m: 2}} variant='outlined'>
			<Box m={1}>
				<Typography sx={{color: "text.secondary"}}>Dataset Export</Typography>
			</Box>
			<Divider />
			<Box mb={2} mt={2} ml={1} mr={2}>
				<Box mt={2}>
					<FormControl fullWidth>
						<Stack direction={{md: "row", sm: "column"}} spacing={1}>
							<InputLabel id='export-label-chatlog'>Formats</InputLabel>
							<Select
								labelId='export-label-chatlog'
								id='export-select-chatlog'
								onChange={(e) => setChoosenExportFormat(e.target.value)}
								value={choosen_export_format}
								label='Export'
								size='small'
								fullWidth>
								{[".json", ".csv"].map((format) => {
									return (
										<MenuItem key={format} value={format}>
											{format}
										</MenuItem>
									);
								})}
							</Select>
							<Button fullWidth size='small' variant='contained' onClick={handleExportChatLog} endIcon={<GetAppIcon />}>
								Export
							</Button>
						</Stack>
					</FormControl>
				</Box>
			</Box>
		</Paper>
	);
};

DatasetExport.propTypes = {
	data: PropTypes.array.isRequired,
	filename: PropTypes.string.isRequired,
};
