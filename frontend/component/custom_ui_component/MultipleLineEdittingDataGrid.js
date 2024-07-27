import React, {useCallback, useLayoutEffect, useState} from "react";

import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import {useGridApiContext} from "@mui/x-data-grid";

export function isKeyboardEvent(event) {
	return !!event.key;
}

function EditTextarea(props) {
	const {id, field, value, colDef, hasFocus} = props;
	const [valueState, setValueState] = useState(value);
	const [anchorEl, setAnchorEl] = useState();
	const [inputRef, setInputRef] = useState(null);
	const apiRef = useGridApiContext();

	useLayoutEffect(() => {
		if (hasFocus && inputRef) {
			inputRef.focus();
		}
	}, [hasFocus, inputRef]);

	const handleRef = useCallback((el) => {
		setAnchorEl(el);
	}, []);

	const handleChange = useCallback(
		(event) => {
			const newValue = event.target.value;
			setValueState(newValue);
			apiRef.current.setEditCellValue({id, field, value: newValue, debounceMs: 200}, event);
		},
		[apiRef, field, id]
	);

	return (
		<div style={{position: "relative", alignSelf: "flex-start"}}>
			<div
				ref={handleRef}
				style={{
					height: 1,
					width: colDef.computedWidth,
					display: "block",
					position: "absolute",
					top: 0,
				}}
			/>
			{anchorEl && (
				<Popper open anchorEl={anchorEl} placement='bottom-start'>
					<Paper elevation={12} sx={{minWidth: colDef.computedWidth}}>
						<TextField
							id='outlined-multiline-edit'
							multiline
							value={valueState}
							sx={{width: "600px"}}
							onChange={handleChange}
							inputRef={(ref) => setInputRef(ref)}
						/>
					</Paper>
				</Popper>
			)}
		</div>
	);
}

export const multilineColumn = {
	type: "string",
	renderEditCell: (params) => <EditTextarea {...params} />,
};
EditTextarea.propTypes = {
	colDef: PropTypes.object.isRequired,
	id: PropTypes.number.isRequired,
	field: PropTypes.string.isRequired,
	hasFocus: PropTypes.bool.isRequired,
	value: PropTypes.string.isRequired,
};
