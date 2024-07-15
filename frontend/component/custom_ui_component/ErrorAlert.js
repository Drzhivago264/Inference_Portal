import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React from 'react';

const ErrorAlert = ({ error }) => {
    return (
        <Box mt={2}>
            <Box textAlign='center'>
                <Alert variant="filled" severity="error">
                    {error}
                </Alert>
            </Box>
        </Box >
    );
};

ErrorAlert.propTypes = {
    error: PropTypes.string.isRequired
};

export default ErrorAlert