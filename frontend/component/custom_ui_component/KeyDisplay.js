import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import React from "react";
import Textarea from "./CustomTextArea.js";

export const KeyCheckDisplay = ({
	t,
	key_,
	key_name,
	monero_balance,
	fiat_balance,
}) => {
	return (
		<Box my={4}>
			<Alert severity='success'>
				<AlertTitle>Success</AlertTitle>
				{t("key_management.key_check_success")}
			</Alert>
			<Box textAlign='center' mt={2}>
				<Textarea
					defaultValue={`Key: ${key_}\nKey Name: ${key_name}\nMonero Balance: ${monero_balance} \nFiat Balance: ${fiat_balance}`}
					minRows={4}
					maxRows={10}
				/>
			</Box>
		</Box>
	);
};

KeyCheckDisplay.propTypes = {
	t: PropTypes.func.isRequired,
	key_name: PropTypes.string.isRequired,
	key_: PropTypes.string.isRequired,
	monero_balance: PropTypes.number.isRequired,
	fiat_balance: PropTypes.number.isRequired,
};
export const XMRWalletDisplay = ({
	t,
	key_,
	key_name,
	integrated_wallet,
	payment_id,
}) => {
	return (
		<Box my={4}>
			<Alert severity='success'>
				<AlertTitle>Success</AlertTitle>
				{t("key_management.xmr_check_success")}
			</Alert>
			<Box textAlign='center' mt={4}>
				<Textarea
					defaultValue={`Key: ${key_}\nKey Name: ${key_name}\nIntergrated Wallet: ${integrated_wallet} \nPayment id: ${payment_id}`}
					minRows={4}
					maxRows={10}
				/>
			</Box>
		</Box>
	);
};
XMRWalletDisplay.propTypes = {
	t: PropTypes.func.isRequired,
	key_name: PropTypes.string.isRequired,
	key_: PropTypes.string.isRequired,
	integrated_wallet: PropTypes.string.isRequired,
	payment_id: PropTypes.string.isRequired,
};
export const XMRWConfirmationDisplay = ({ t, detail }) => {
	return (
		<Box my={4}>
			<Alert severity='success'>
				<AlertTitle>Success</AlertTitle>
				{t("key_management.xmr_confirmation_success")}
			</Alert>
			<Box textAlign='center' mt={4}>
				<Textarea defaultValue={`${detail}`} minRows={2} maxRows={10} />
			</Box>
		</Box>
	);
};
XMRWConfirmationDisplay.propTypes = {
	t: PropTypes.func.isRequired,
	detail: PropTypes.string.isRequired,
};
