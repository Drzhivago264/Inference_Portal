import React from 'react';
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../component/navbar';
import Container from '@mui/material/Container';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import Footer from '../component/footer';
function APIDoc() {
    const ui = SwaggerUI({
        dom_id: '#swaggerContainer',
        url: '/api/openapi.json',
    });

    return (
        <Container maxWidth={false} disableGutters>
            <title>API Doc</title>
            <ResponsiveAppBar />
            <Container maxWidth='xl'>
                <Box>
                    <Box p={1} m={5} sx={{ bgcolor: 'white', borderRadius: 2 }}>
                        {ui}
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </Container>
    );
}

export default APIDoc;