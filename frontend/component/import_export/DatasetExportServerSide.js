import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import GetAppIcon from "@mui/icons-material/GetApp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const DatasetExportServerSide = ({ dataset_id }) => {
	const [choosen_export_format, setChoosenExportFormat] = useState(".json");
	const handleExportServerSide = (event) => {
		event.preventDefault();
		if (dataset_id) {
			console.log(dataset_id);
		}
	};
	return (
		<Paper variant='outlined'>
			<Box ml={2} mt={1} mb={1}>
				<Typography sx={{ color: "text.secondary" }}>
					Dataset Export
				</Typography>
			</Box>
			<Divider />
			<Box mb={2} mt={2} ml={1} mr={2}>
				<Box mt={2}>
					<FormControl fullWidth>
						<Stack direction={"row"} spacing={1}>
							<InputLabel id='export-label-chatlog'>
								Formats
							</InputLabel>
							<Select
								labelId='export-label-chatlog'
								id='export-select-chatlog'
								onChange={(e) =>
									setChoosenExportFormat(e.target.value)
								}
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
							<Button
								fullWidth
								size='small'
								variant='contained'
								onClick={handleExportServerSide}
								endIcon={<GetAppIcon />}>
								Export
							</Button>
						</Stack>
					</FormControl>
				</Box>
			</Box>
		</Paper>
	);
};

DatasetExportServerSide.propTypes = {
	dataset_id: PropTypes.number.isRequired,
};
