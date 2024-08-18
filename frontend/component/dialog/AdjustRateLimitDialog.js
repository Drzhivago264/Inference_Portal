import React, {useState} from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import SpeedIcon from "@mui/icons-material/Speed";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {basePut} from "../../api_hook/basePut";
import {useMutation} from "react-query";

export default function UpdateRateLimitDialog({token_name, token_value, token_prefix, setTokenCreateError, index, setTokenList, token_list}) {
	const [open, setOpen] = useState(false);
	const [ratelimit, setRateLimit] = useState(30);
	const [ratelimit_time_unit, setRateLimitTimeUnit] = useState("minute");
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const {mutate: mutate} = useMutation(basePut);
	const updateRateLimit = () => {
		if (token_prefix && token_name && token_value) {
			const data = {
				token_name: token_name,
				prefix: token_prefix,
				first_and_last_char: token_value,
				ratelimit: ratelimit,
				ratelimit_time_unit: ratelimit_time_unit,
			};
			mutate(
				{url: "/frontend-api/update-ratelimit", data: data},
				{
					onSuccess: () =>
						setTokenList((prev) => {
							const newState = prev;
							newState[index].ratelimit = `${ratelimit}/${ratelimit_time_unit}`;
							return [...newState];
						}),

					onError: (error) => setTokenCreateError(error.response.data.detail),
				}
			);
		}
        handleClose()
	};

	return (
		<div>
			<IconButton aria-label='delete' onClick={handleClickOpen} size='small'>
				<EditIcon />
			</IconButton>
			<Dialog maxWidth='xs' onClose={handleClose} open={open}>
				<DialogTitle>Update Ratelimit</DialogTitle>
				<IconButton
					aria-label='close'
					onClick={handleClose}
					size='small'
					sx={{
						position: "absolute",
						right: 8,
						top: 12,
						color: (theme) => theme.palette.grey[500],
					}}>
					<CloseIcon />
				</IconButton>
				<Box m={2}>
					<Stack direction='column' spacing={1}>
						<Stack
							direction={{xs: "row",}}
							spacing={1}>
							<TextField
								id='ratelimit'
								label='Ratelimit'
								fullWidth
								type='number'
								size='small'
								value={ratelimit}
								onChange={(e) => setRateLimit(e.target.value)}
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<SpeedIcon />
										</InputAdornment>
									),
								}}
							/>
							<TextField
								id='rate-limit-time-unit'
								select
								fullWidth
								label='Unit'
								value={ratelimit_time_unit}
								onChange={(e) => setRateLimitTimeUnit(e.target.value)}
								size='small'>
								{["day", "hour", "minute", "second"].map((option) => (
									<MenuItem key={option} token={option} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
						</Stack>
						<Button
							size='small'
							disabled={token_list.length >= 10 ? true : false}
							variant='contained'
							onClick={() => updateRateLimit()}>
							Update
						</Button>
					</Stack>
				</Box>
			</Dialog>
		</div>
	);
}

UpdateRateLimitDialog.propTypes = {
	token_name: PropTypes.string.isRequired,
	token_value: PropTypes.string.isRequired,
	token_prefix: PropTypes.string.isRequired,
	setTokenCreateError: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	setTokenList: PropTypes.func.isRequired,
	token_list: PropTypes.array.isRequired,
};
