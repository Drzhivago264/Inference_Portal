import * as pdfMake from "pdfmake/build/pdfmake.min";

import React, {useState} from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {FormControl} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import edjsParser from "editorjs-parser";
import pdfFonts from "pdfmake/build/vfs_fonts";

const {convert} = require("html-to-text");

const EditorExport = ({editorref}) => {
	const [choosen_export_format, setChoosenExportFormat] = useState(".json");
	const handleExport = (event) => {
		event.preventDefault();
		if (choosen_export_format == ".json") {
			download("application/json", "Written_By_Professor_Parakeet.json");
		} else if (choosen_export_format == ".html") {
			download("text/html", "Written_By_Professor_Parakeet.html");
		} else if (choosen_export_format == ".txt") {
			download("text/plain", "Written_By_Professor_Parakeet.txt");
		} else if (choosen_export_format == ".pdf") {
			download("application/pdf", "Written_By_Professor_Parakeet.pdf");
		}
	};

	const parser = new edjsParser();
	const download = (mimeType, filename) => {
		editorref.current
			.save()
			.then((outputData) => {
				let download_content = outputData;
				if (mimeType == "application/json") {
					download_content = JSON.stringify(outputData, null, 4);
				} else if (mimeType == "text/html") {
					download_content = parser.parse(download_content);
				} else if (mimeType == "text/plain") {
					let html = parser.parse(download_content);
					let text = convert(html, {wordwrap: 130});
					download_content = text;
				} else if (mimeType == "application/pdf") {
					let html = parser.parse(download_content);
					var htmlToPdfmake = require("html-to-pdfmake");
					var html_to_pdf = htmlToPdfmake(html);
					var pdf = {content: html_to_pdf};
					pdfMake.vfs = pdfFonts.pdfMake.vfs;
					pdfMake.createPdf(pdf).download("Written_By_Professor_Parakeet.pdf");
				}
				if (mimeType != "application/pdf") {
					var a = document.createElement("a");
					var blob = new Blob([download_content], {type: mimeType});
					var url = URL.createObjectURL(blob);
					a.setAttribute("href", url);
					a.setAttribute("download", filename);
					a.click();
				}
			})
			.catch((error) => {
				console.log("Saving failed: ", error);
			});
	};
	return (
		<Paper sx={{mt: 2, mb:2, ml:2}} variant='outlined'>
			<Box m={1}>
				<Typography sx={{color: "text.secondary"}}>Editor Export</Typography>
			</Box>
			<Divider />
			<Box mb={2} mt={2} ml={1} mr={2}>
				<FormControl fullWidth>
					<Stack direction={"row"} spacing={1}>
						<InputLabel id='export-label'>Formats</InputLabel>
						<Select
							labelId='export-label'
							id='export-select'
							onChange={(e) => setChoosenExportFormat(e.target.value)}
							value={choosen_export_format}
							label='Export'
							size='small'
							fullWidth>
							{[".json", ".txt", ".html", ".pdf"].map((format) => {
								return (
									<MenuItem key={format} value={format}>
										{format}
									</MenuItem>
								);
							})}
						</Select>
						<Button size='small' fullWidth variant='contained' onClick={handleExport} endIcon={<GetAppIcon />}>
							Export
						</Button>
					</Stack>
				</FormControl>
			</Box>
		</Paper>
	);
};
EditorExport.propTypes = {
	editorref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({current: PropTypes.instanceOf(Element)})]),
};
export default EditorExport;
