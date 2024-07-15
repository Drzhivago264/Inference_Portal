import React, { useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getCookie } from '../getCookie';
import { styled } from '@mui/material/styles';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

function PermissionDialog(props) {
    const { onClose, open, notchoosenpermissionlist, token_name, token_value, token_prefix, setReloadToken, settokenCreateError } = props;

    const addPermission = (token_prefix, token_name, token_value, permission) => {
        if (token_prefix && token_name && token_value && permission) {
            const csrftoken = getCookie('csrftoken');
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                token_name: token_name,
                prefix: token_prefix,
                first_and_last_char: token_value,
                permission: permission
            }
            axios.put("/frontend-api/add-permission", data, config)
                .then((response) => {
                    setReloadToken(true)
                }).catch(error => {
                    settokenCreateError(error.response.data.detail)
                });
        }
        onClose()
    }



    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Add Permission(s)</DialogTitle>
            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 2,
                    m: 0,
                }}
                component="ul"
            >
                {notchoosenpermissionlist.map((perm) => (
                    <ListItem key={perm}>
                        <Chip icon={<AddCircleIcon />} label={perm} onClick={() => { addPermission(token_prefix, token_name, token_value, perm) }} />
                    </ListItem>

                ))}
            </Paper>

        </Dialog>
    );
}

PermissionDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    notchoosenpermissionlist: PropTypes.array.isRequired
};

export default function AddPermissionDialog({ full_permission_list, current_permission_list, token_name, token_value, token_prefix, setReloadToken, settokenCreateError }) {
    const [open, setOpen] = useState(false);
    const [notchoosenpermissionlist, setNotChoosenPermissionList] = useState([])
    const handleClickOpen = () => {
        setOpen(true);
        var not_choosen_permission_list = []
        for (let i in full_permission_list) {
            if (!current_permission_list.includes(i)) {
                not_choosen_permission_list.push(i)
            }
        }
        setNotChoosenPermissionList(not_choosen_permission_list)
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton aria-label="delete" onClick={handleClickOpen} size="small">
                <AddCircleIcon />
            </IconButton>
            <PermissionDialog
                open={open}
                onClose={handleClose}
                notchoosenpermissionlist={notchoosenpermissionlist}
                token_name={token_name}
                token_value={token_value}
                token_prefix={token_prefix}
                setReloadToken={setReloadToken}
                settokenCreateError={settokenCreateError}
            />
        </div>
    );
}