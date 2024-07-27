import React, { useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import { basePut } from "../../api_hook/basePut";
import { styled } from "@mui/material/styles";
import { useMutation } from "react-query";

const ListItem = styled("li")(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

function PermissionDialog(props) {
	const {
		onClose,
		open,
		notchoosenpermissionlist,
		token_name,
		token_value,
		token_prefix,
		setTokenCreateError,
		index,
		setTokenList,
		token_list,
	} = props;

	const { mutate: addpermissionmutate } = useMutation(basePut);
	const addPermission = (
		token_prefix,
		token_name,
		token_value,
		permission
	) => {
		if (token_prefix && token_name && token_value && permission) {
			const data = {
				token_name: token_name,
				prefix: token_prefix,
				first_and_last_char: token_value,
				permission: permission,
			};
			addpermissionmutate(
				{ url: "/frontend-api/add-permission", data: data },
				{
					onSuccess: () =>
						setTokenList((prev) => {
							const items = [
								...token_list[index].permissions,
								permission,
							];
							const newState = prev;
							newState[index].permissions = items;
							return [...newState];
						}),

					onError: (error) =>
						setTokenCreateError(error.response.data.detail),
				}
			);
		}
		onClose();
	};
	return (
		<Dialog fullWidth={true} maxWidth='xs' onClose={onClose} open={open}>
			<DialogTitle>Add Permission(s)</DialogTitle>
			<IconButton
				aria-label='close'
				onClick={onClose}
				size='small'
				sx={{
					position: "absolute",
					right: 8,
					top: 12,
					color: (theme) => theme.palette.grey[500],
				}}>
				<CloseIcon />
			</IconButton>
			<Paper
				sx={{
					display: "flex",
					justifyContent: "center",
					flexWrap: "wrap",
					listStyle: "none",
					pt: 2,
					pb: 2,
					pl: 4,
					pr: 4,
					m: 0,
				}}
				component='ul'>
				{notchoosenpermissionlist.map((perm) => (
					<ListItem key={perm}>
						<Chip
							icon={<AddCircleIcon />}
							label={perm}
							onClick={() => {
								addPermission(
									token_prefix,
									token_name,
									token_value,
									perm
								);
							}}
						/>
					</ListItem>
				))}
			</Paper>
		</Dialog>
	);
}

PermissionDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	notchoosenpermissionlist: PropTypes.array.isRequired,
	token_name: PropTypes.string.isRequired,
	token_value: PropTypes.string.isRequired,
	token_prefix: PropTypes.string.isRequired,
	setTokenCreateError: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	setTokenList: PropTypes.func.isRequired,
	token_list: PropTypes.array.isRequired,
};

export default function AddPermissionDialog({
	full_permission_dict,
	current_permission_list,
	token_name,
	token_value,
	token_prefix,
	setTokenCreateError,
	index,
	setTokenList,
	token_list,
}) {
	const [open, setOpen] = useState(false);
	const [notchoosenpermissionlist, setNotChoosenPermissionList] = useState(
		[]
	);
	const handleClickOpen = () => {
		setOpen(true);
		var not_choosen_permission_list = [];
		for (let i in full_permission_dict) {
			if (!current_permission_list.includes(i)) {
				not_choosen_permission_list.push(i);
			}
		}
		setNotChoosenPermissionList(not_choosen_permission_list);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<IconButton
				aria-label='delete'
				onClick={handleClickOpen}
				size='small'>
				<AddCircleIcon />
			</IconButton>
			<PermissionDialog
				open={open}
				onClose={handleClose}
				notchoosenpermissionlist={notchoosenpermissionlist}
				token_name={token_name}
				token_value={token_value}
				token_prefix={token_prefix}
				setTokenCreateError={setTokenCreateError}
				setTokenList={setTokenList}
				token_list={token_list}
				index={index}
			/>
		</div>
	);
}

AddPermissionDialog.propTypes = {
	full_permission_dict: PropTypes.object.isRequired,
	current_permission_list: PropTypes.array.isRequired,
	token_name: PropTypes.string.isRequired,
	token_value: PropTypes.string.isRequired,
	token_prefix: PropTypes.string.isRequired,
	setTokenCreateError: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	setTokenList: PropTypes.func.isRequired,
	token_list: PropTypes.array.isRequired,
};
