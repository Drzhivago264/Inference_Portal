import Alert from '@mui/material/Alert';
import React from 'react';

export const CeleryAlert = () => {
    return (
        <Alert severity="info" sx={{ display: {xs: "none", sm: "block"} }} >
            Celery Backend is deprecated, Async Backend supports newest features.
        </Alert>
    )
}