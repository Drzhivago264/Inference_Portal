import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import {RandomReveal} from "react-random-reveal";
import React from "react";
import Textarea from "../custom_ui_component/CustomTextArea";
import {saveAs} from "file-saver";

function exporttoken(tokenfile) {
	let blob = new Blob([tokenfile], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "Token_of_ProffesorParakeet_KEEP_IT_SECURE.txt");
}
const TokenCreateExport = ({
	token_,
	token_name,
	ttl,
	created_at,
	permission,
	randomanimation,
	setRandomAnimation,
	setTokenCreateLoading,
	setTokenList,
	token_list,
    ratelimit
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
						Token:
						<RandomReveal
							isPlaying
							duration={2}
							revealDuration={1.6}
							characters={token_}
							onComplete={() => (
								setRandomAnimation(true),
								setTokenCreateLoading(false),
								setTokenList([
									...token_list,
									{
										prefix: token_.substring(0, 8),
										value: token_.substring(0, 3) + "..." + token_.substring(token_.length - 3),
										name: token_name,
										created_at: created_at,
										ttl: ttl,
										permissions: permission,
                                        ratelimit: ratelimit
									},
								])
							)}
						/>
					</Alert>
				</Box>
			)}

			{randomanimation && (
				<Box textAlign='center' my={4}>
					<Textarea
						defaultValue={`Token: ${token_}\nToken Name: ${token_name}\nTTL: ${ttl}\nCreated at: ${created_at}\nRatelimit: ${ratelimit}\nPermission(s): ${permission.join(", ")}`}
						minRows={4}
						maxRows={10}
					/>
					<Box textAlign='center' my={1}>
						<Button
							size='small'
							variant='outlined'
							onClick={() =>
								exporttoken(`Token: ${token_}\nToken Name: ${token_name}\nTTL: ${ttl}\nCreated at: ${created_at}\nRatelimit: ${ratelimit}\nPermission(s): ${permission}`)
							}>
							Export token
						</Button>
					</Box>
				</Box>
			)}
		</Box>
	);
};
TokenCreateExport.propTypes = {
	token_: PropTypes.string.isRequired,
    ratelimit: PropTypes.string.isRequired,
	token_name: PropTypes.string.isRequired,
	ttl: PropTypes.string.isRequired,
	created_at: PropTypes.string.isRequired,
	permission: PropTypes.array.isRequired,
	setTokenCreateLoading: PropTypes.func.isRequired,
	setRandomAnimation: PropTypes.func.isRequired,
	randomanimation: PropTypes.bool.isRequired,
	setTokenList: PropTypes.func.isRequired,
	token_list: PropTypes.array.isRequired,
};
export default TokenCreateExport;
