import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import React from "react";
export default function NoPermissionDialog({no_perm_open, setNoPermOpen}) {

    const handleClose = () => {
        setNoPermOpen(false);
      };
    return (
        <Dialog open={no_perm_open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
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
            <DialogTitle id='alert-dialog-title'>{"No Permission"}</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>You do not have the permission to view Cost Log.</DialogContentText>
            </DialogContent>
        </Dialog>
    )
}
NoPermissionDialog.propTypes = {
	no_perm_open: PropTypes.bool,
	setNoPermOpen: PropTypes.func.isRequired,
};