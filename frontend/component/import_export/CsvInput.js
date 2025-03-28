import React, { Fragment, useRef } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CachedIcon from "@mui/icons-material/Cached";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Papa from "papaparse";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	whiteSpace: "nowrap",
	width: 1,
});

const CsvFileInput = ({
	onFileLoad,
	filename,
	setFileName,
	from_row,
	to_row,
	setFromRow,
	setToRow,
}) => {
	const inputFile = useRef(null);
	const handleFileChange = (e, is_fisrt_load) => {
		if (is_fisrt_load) {
			var file = e.target.files[0];
			setFileName(e.target.files[0].name);
		} else {
			file = inputFile.current.files[0];
		}
		let preview_list = [];
		let current_row = 0;

		if (file) {
			Papa.parse(file, {
				step: function (result, parser) {
					if (from_row < current_row && current_row < to_row) {
						preview_list.push(
							Object.assign(
								{ id: preview_list.length },
								result.data
							)
						);
						onFileLoad(preview_list);
					}
					if (current_row == to_row) {
						parser.abort();
					}
					current_row += 1;
				},

				header: true,
				skipEmptyLines: true,
			});
		}
	};
	return (
		<Fragment>
			<Stack spacing={1} direction='row'>
				<Box sx={{ flexWrap: "wrap" }}>
					<Button
						component='label'
						sx={{ whiteSpace: "nowrap" }}
						size='small'
						role={undefined}
						variant='contained'
						tabIndex={-1}
						startIcon={<CloudUploadIcon />}>
						Load CSV
						<VisuallyHiddenInput
							type='file'
							accept='.csv'
							onChange={(e) => {
								handleFileChange(e, true);
							}}
							ref={inputFile}
						/>
					</Button>
				</Box>
				<Typography
					pt={1}
					variant='body2'
					noWrap
					style={{ maxWidth: 100, overflow: "auto" }}>
					{filename}
				</Typography>
			</Stack>
			<Stack mt={2} mb={1} spacing={1} direction='row'>
				<TextField
					id='from-row-number'
					label='From Row'
					type='number'
					size='small'
					defaultValue={from_row}
					onChange={(e) => setFromRow(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id='to-row-number'
					label='To Row'
					type='number'
					defaultValue={to_row}
					size='small'
					onChange={(e) => setToRow(e.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</Stack>
			<Button
				fullWidth
				size='small'
				variant='contained'
				startIcon={<CachedIcon />}
				onClick={(e) => {
					handleFileChange(e, false);
				}}>
				Reload
			</Button>
		</Fragment>
	);
};
CsvFileInput.propTypes = {
	onFileLoad: PropTypes.func,
	filename: PropTypes.string,
	setToRow: PropTypes.func,
	from_row: PropTypes.number,
	to_row: PropTypes.number,
	setFromRow: PropTypes.func,
	setFileName: PropTypes.func,
};

export default CsvFileInput;
