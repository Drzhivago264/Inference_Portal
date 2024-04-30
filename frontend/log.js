import $ from 'jquery'
import React, { useEffect, useRef, useState } from "react"
import axios from 'axios';
import Container from '@mui/material/Container';
import ResponsiveAppBar from './navbar';
import DataTable from 'datatables.net-dt';
import jszip from 'jszip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import pdfmake from 'pdfmake';
import Box from '@mui/material/Box';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import Paper from '@mui/material/Paper';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
require('./component/dataTables.dataTables.css')
function Log() {
    $.DataTable = require('datatables.net')
    const tableRef = useRef()
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

    useEffect(() => {
        var url = window.location.pathname.split("/").filter(path => path !== "")
        console.log(tableRef.current)
        const table = $(tableRef.current).DataTable(
            {
                layout: {
                    topStart: 'pageLength',
                    top2Start: {
                        buttons: ['copyHtml5', 'excelHtml5', 'csvHtml5', 'pdfHtml5', 'print',],
                        
                    }
                },
                columns: [
                    { title: "No." },
                    { title: "Prompts" },
                    { title: "Response" },
                    { title: "Models" },
                    { title: "Created Time" },
                    { title: "Type" },
                    { title: "Cost" }
                ],
                processing: true,
                serverSide: true,
                ajax: "/log/" + url[url.length - 1],
                responsive: true,
                destroy: true  // I think some clean up is happening here
            }
        )
        // Extra step to do extra clean-up.
        return function () {
            console.log("Table destroyed")
            table.destroy()
        }
    }, [])


    return (
        <Container maxWidth={false} disableGutters>
            <title>Models</title>
            <ResponsiveAppBar />
            <Container maxWidth="xl">
                <Paper p={5}>
                    <table className="display" width="100%" ref={tableRef}></table>
                </Paper>
            </Container >
        </Container>
    );
}

export default Log;