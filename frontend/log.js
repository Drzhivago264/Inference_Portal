
import $ from 'jquery'

import React, { useEffect, useRef, useState } from "react"
import Container from '@mui/material/Container';
import ResponsiveAppBar from './component/navbar';


import pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake from 'pdfmake/build/pdfmake.min';
import JSZip from 'jszip';
window.JSZip = JSZip;
import Box from '@mui/material/Box';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import Paper from '@mui/material/Paper';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
require('./component/css/dataTables.dataTables.css')
require('./component/css/buttons.dataTables.css')
pdfMake.vfs = pdfFonts.pdfMake.vfs;
function Log() {
    $.DataTable = require('datatables.net')
    const tableRef = useRef()
    useEffect(() => {
        var url = window.location.pathname.split("/").filter(path => path !== "")
        $.fn.dataTable.ext.errMode = () => alert('You need to login before viewing log!');
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
                    { title: "Input Cost" },
                    { title: "Onput Cost" },
                    { title: "Input Tokens" },
                    { title: "Onput Tokens" }
                ],
                processing: true,
                serverSide: true,
                ajax: "/log/" + url[url.length - 1],
                responsive: true,
                destroy: true,
            }
        )

        return function () {
            table.destroy()
        }

    }, [])

    return (
        <Container maxWidth={false} disableGutters>
            <title>Models</title>
            <ResponsiveAppBar />
            <Container maxWidth="xl">
                <Box sx={{ overflow: 'auto' }}>
                    <Paper variant="outlined" sx={{ overflow: 'auto' }} >
                        <Box p={5}>
                        <table  className="display" width="100%" ref={tableRef}></table>
                        </Box>
                    </Paper>
                </Box>
            </Container >
        </Container>
    );
}

export default Log;