import Button from '@mui/material/Button';
import CloseIcon from "@mui/icons-material/Close";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import React from "react";

export default function AskAgainDialog({executing_function, setOpenAskAgain, delete_object_name}) {
	console.log(executing_function)
	const handleClose = () => {
		setOpenAskAgain(false);
	};
	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
			<IconButton
				aria-label='close'
				onClick={handleClose}
				size='small'
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}>
				<CloseIcon />
			</IconButton>
			<DialogTitle id='alert-dialog-title'>{"Confirmation"}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					{`Are you sure? By confirming this, your ${delete_object_name} will be deleted and cannot be recovered.`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>{`Let's Me Think`}</Button>
				<Button onClick={()=>{executing_function(); handleClose()}} >Confirm</Button>
			</DialogActions>
		</Dialog>
	);
}
AskAgainDialog.propTypes = {
	setOpenAskAgain: PropTypes.func.isRequired,
	delete_object_name: PropTypes.string.isRequired,
	executing_function: PropTypes.func.isRequired,
};
