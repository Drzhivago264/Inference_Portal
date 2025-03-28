import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { FormControl } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const ChatExport = ({ chat_message, number_of_remove_message }) => {
	const [choosen_export_format_chatlog, setChoosenExportFormatChatLog] =
		useState(".json");
	const handleExportChatLog = (event) => {
		event.preventDefault();
		let chat_message_clone = [...chat_message];
		let a = document.createElement("a");
		if (choosen_export_format_chatlog === ".json") {
			let download_content = JSON.stringify(
				chat_message_clone.splice(number_of_remove_message),
				null,
				4
			);
			let blob = new Blob([download_content], {
				type: "application/json",
			});
			let url = URL.createObjectURL(blob);
			a.setAttribute("href", url);
			a.setAttribute("download", "Chat_log_from_Professor_Parakeet.json");
		} else if (choosen_export_format_chatlog === ".txt") {
			let json = chat_message_clone.splice(number_of_remove_message);
			let download_content = "";
			for (const k in json) {
				download_content +=
					json[k]["role"] +
					"-" +
					json[k]["time"] +
					":\n" +
					json[k]["message"] +
					"\n";
			}
			let blob = new Blob([download_content], { type: "text/plain" });
			let url = URL.createObjectURL(blob);
			a.setAttribute("href", url);
			a.setAttribute("download", "Chat_log_from_Professor_Parakeet.txt");
		}

		a.click();
	};
	return (
		<Paper sx={{ mt: 2, mb: 2, display: {xs: "none", sm: "block"} }} variant='outlined'>
			<Box m={1}>
				<Typography sx={{ color: "text.secondary" }}>
					Chat Log Export
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
									setChoosenExportFormatChatLog(
										e.target.value
									)
								}
								value={choosen_export_format_chatlog}
								label='Export'
								size='small'
								fullWidth>
								{[".json", ".txt"].map((format) => {
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
								onClick={handleExportChatLog}
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

ChatExport.propTypes = {
	chat_message: PropTypes.array.isRequired,
	number_of_remove_message: PropTypes.number.isRequired,
};
