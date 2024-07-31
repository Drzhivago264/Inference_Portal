import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React from 'react';

const SuccessErrorAlert = ({ detail, type }) => {
    return (
        <Box mt={2}>
            <Box textAlign='center'>
                <Alert variant="filled" severity={type}>
                    {detail}
                </Alert>
            </Box>
        </Box >
    );
};

SuccessErrorAlert.propTypes = {
    detail: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default SuccessErrorAlert