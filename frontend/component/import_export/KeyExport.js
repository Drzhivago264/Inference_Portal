import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { RandomReveal } from "react-random-reveal";
import React from "react";
import Textarea from "../custom_ui_component/CustomTextArea";
import { saveAs } from "file-saver";

function exportKey(keyfile) {
	var blob = new Blob([keyfile], { type: "text/plain;charset=utf-8" });
	saveAs(blob, "Master_Key_of_ProffesorParakeet_KEEP_IT_SECURE.txt");
}
const KeyCreateExport = ({
	key_,
	key_name,
	integrated_wallet,
	payment_id,
	setIsAuthenticated,
	setKeyCreateLoading,
	setRandomAnimation,
	randomanimation,
	t,
}) => {
	return (
		<Box my={4}>
			{!randomanimation && (
				<Box
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
					textAlign='center'
					my={1}>
					<Alert severity='info'>
						{" "}
						Key:{" "}
						<RandomReveal
							isPlaying
							duration={4}
							revealDuration={1.6}
							characters={key_}
							onComplete={() => (
								setRandomAnimation(true),
								setKeyCreateLoading(false),
								setIsAuthenticated(true)
							)}
						/>
					</Alert>
				</Box>
			)}
			{randomanimation && (
				<Alert severity='success' sx={{ whiteSpace: "pre-line" }}>
					<AlertTitle>Success</AlertTitle>
					{t("key_management.key_create_success")}
				</Alert>
			)}
			{randomanimation && (
				<Box textAlign='center' my={4}>
					<Textarea
						defaultValue={`Key: ${key_}\nKey Name: ${key_name}\nWallet: ${integrated_wallet} \nPayment id: ${payment_id}`}
						minRows={4}
						maxRows={10}
					/>
					<Box textAlign='center' my={1}>
						<Button
							size='small'
							variant='outlined'
							onClick={() =>
								exportKey(
									`Key: ${key_}\nKey Name: ${key_name}\nWallet: ${integrated_wallet} \nPayment id: ${payment_id}`
								)
							}>
							Export Key
						</Button>
					</Box>
				</Box>
			)}
		</Box>
	);
};
KeyCreateExport.propTypes = {
	key_: PropTypes.string,
	key_name: PropTypes.string,
	integrated_wallet: PropTypes.string,
	payment_id: PropTypes.string,
	setIsAuthenticated: PropTypes.func,
	setKeyCreateLoading: PropTypes.func,
	setRandomAnimation: PropTypes.func,
	randomanimation: PropTypes.bool,
	t: PropTypes.func,
};
export default KeyCreateExport;
