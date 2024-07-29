import React, {useState} from "react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from '@mui/icons-material/Done';
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import  Stack  from "@mui/material/Stack";

export const TextCopy = ({message}) => {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = (e) => {
		setCopied(true);
		navigator.clipboard.writeText(e);
        const timeoutId = setTimeout(() => {
            setCopied(false);
          }, 700);
          return () => clearTimeout(timeoutId);
	};
	return (
		<Stack alignItems='center' direction='row'>
			<IconButton  onClick={() => copyToClipboard(`${message}`)} aria-label='copy' size='small'>
				{copied ? <DoneIcon fontSize='small' color="success" /> : <ContentCopyIcon fontSize='small' /> }
			</IconButton>
		</Stack>
	);
};
TextCopy.propTypes = {
    message: PropTypes.string.isRequired,
};
