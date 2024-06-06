import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import ResponsiveAppBar from '../component/navbar';
import { Stack } from '@mui/material';
import Footer from '../component/footer';
function ModelInfor() {
    const [server_objects, setMessage] = useState([]);
    const [model_objects, setMessage_model] = useState([]);
    useEffect(() => {
        axios.all([
            axios.get('/frontend-api/model'),
        ])
            .then(axios.spread((server_object) => {
                setMessage(server_object.data.servers);
                setMessage_model(server_object.data.models_info);

            }))
            .catch(error => {
                console.log(error);
            });
    }, []);
    const columns = [
        { field: 'server', headerName: 'Server', width: 80 },
        { field: 'model', headerName: 'Model', width: 150 },
        { field: 'status', headerName: 'Status', width: 80 },
        { field: 'availability', headerName: 'Availability', width: 140 },
        { field: 'input_price_usd', headerName: 'Input (USD)', width: 100 },
        { field: 'output_price_usd', headerName: 'Output (USD)', width: 100 },

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
            input_price_usd: server_objects[i].model_price_input,
            output_price_usd: server_objects[i].model_price_output,
        });
        i++;
    }
    return (
        <Container maxWidth={false} disableGutters>
            <title>Models</title>
            <ResponsiveAppBar max_width="xl"  />
            <Container maxWidth="xl">
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
                                if (model_object.name == 'Reddit Helper 2.7B') {
                                    return (
                                        <Accordion key={model_object.id} defaultExpanded>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                id={model_object.id}
                                            >
                                                {model_object.name}
                                            </AccordionSummary>
                                            <AccordionDetails style={{ whiteSpace: "pre-wrap" }}>
                                                {model_object.desc}
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                }
                                else {
                                    return (
                                        <Accordion key={model_object.id}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                id={model_object.id}
                                            >
                                                {model_object.name}
                                            </AccordionSummary>
                                            <AccordionDetails style={{ whiteSpace: "pre-wrap" }}>
                                                {model_object.desc}
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                }
                            }
                            )
                            }
                        </Grid>
                        <Grid item md={6}>
                            <Stack spacing={1}>
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
                                <Alert variant="outlined" severity="info">
                                    <li> Status can be "pending", "running", "stopping" and "stopped" which refers to the current stage of
                                        the servers</li>
                                    <li> Availability can be "availabe" and "not availabe" which refers to the ability of users to boot the
                                        instance by themselves</li>
                                    <li> Highly demanded models are load-balanced across multiple servers</li>
                                </Alert>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Container >
            <Footer />
        </Container>
    );
}

export default ModelInfor;