import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

function ModelInfor() {
    const [server_objects, setMessage] = useState([]);
    const [model_objects, setMessage_model] = useState([]);
    useEffect(() => {
        axios.all([
            axios.get('/frontend-api/model'),
        ])

            .then(axios.spread((server_object) => {
                setMessage(server_object.data.servers);
                setMessage_model(server_object.data.models);

            }))
            .catch(error => {
                console.log(error);
            });
    }, []);
    const columns = [
        { field: 'server', headerName: 'Server', width: 80 },
        { field: 'model', headerName: 'Model', width: 150 },
        { field: 'status', headerName: 'Status', width: 80 },
        { field: 'availability', headerName: 'Availability', width: 130 },
        { field: 'price_usd', headerName: 'USD', width: 60 },
        { field: 'price_xmr', headerName: 'XMR', width: 60 },

    ];
    let i = 0;
    let rows = [
    ];
    while (i < server_objects.length) {
        rows.push({
            id: server_objects[i].id,
            server: `Server-${server_objects[i].id}`,
            model: server_objects[i].model_name,
            status: server_objects[i].status,
            availability: server_objects[i].availability,
            price_usd: server_objects[i].model_price,
            price_xmr: server_objects[i].model_price
        });
        i++;
    }
    return (
        <Container maxWidth="lg">
            <title>Models</title>
            <Box
                my={4}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
            >
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        {model_objects.map((model_object) => {
                            return (
                                <Accordion key={model_object.id}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id={model_object.id}
                                    >
                                        {model_object.name}
                                    </AccordionSummary>
                                    <AccordionDetails style={{ whiteSpace: "pre-wrap" }}>
                                        {model_object.desc}
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </Grid>
                    <Grid item md={6}>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                disableRowSelectionOnClick
                                pageSizeOptions={[5, 10]}
                            />
                        </div>

                    </Grid>
                </Grid>
            </Box>
        </Container >
    );
}

export default ModelInfor;