import Alert from '@mui/material/Alert';
import  AlertTitle  from '@mui/material/AlertTitle';
import React from 'react';

export const CeleryAlert = () => {
    return (
        <Alert severity="info" sx={{ whiteSpace: 'pre-line' }}>
            <AlertTitle>Note: </AlertTitle>
            {`Celery Backend is deprecated, Async Backend supports newest features.`}
        </Alert>
    )
}