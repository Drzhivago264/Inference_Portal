import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types'
import { RandomReveal } from 'react-random-reveal';
import React from 'react';
import Textarea from '../custom_ui_component/CustomTextArea';
import { saveAs } from "file-saver";

function exporttoken(tokenfile) {
    var blob = new Blob([tokenfile], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "Token_of_ProffesorParakeet_KEEP_IT_SECURE.txt");
}
const TokenCreateExport = ({ token_, token_name, ttl, created_at, permission, randomanimation, setRandomAnimation, setReloadToken, settokenCreateLoading }) => {
    return (
        <Box my={4}>
            {!randomanimation && <Box style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }} textAlign='center' my={1}>
                <Alert severity="info"> Token: <RandomReveal
                    isPlaying
                    duration={2}
                    revealDuration={1.6}
                    characters={token_}
                    onComplete={() => (setRandomAnimation(true), settokenCreateLoading(false), setReloadToken(true))}

                /></Alert>
            </Box>}

            {randomanimation && <Box textAlign='center' my={4}>
                <Textarea
                    defaultValue={`Token: ${token_}\nToken Name: ${token_name}\nTTL: ${ttl}\nCreated at: ${created_at}\nPermission(s): ${permission}`}
                    minRows={4}
                    maxRows={10}
                />
                <Box textAlign='center' my={1}>
                    <Button size="small" variant="outlined" onClick={() => exporttoken(`Token: ${token_}\nToken Name: ${token_name}\nTTL: ${ttl}\nCreated at: ${created_at}\nPermission(s): ${permission}`)}>Export token</Button>
                </Box>
            </Box>}
        </Box >
    );
};
TokenCreateExport.propTypes = {
    token_: PropTypes.string,
    token_name: PropTypes.string,
    ttl: PropTypes.string,
    created_at: PropTypes.string,
    permission: PropTypes.array,
    setReloadToken: PropTypes.func,
    settokenCreateLoading: PropTypes.func,
    setRandomAnimation: PropTypes.func,
    randomanimation: PropTypes.bool, 
}
export default TokenCreateExport