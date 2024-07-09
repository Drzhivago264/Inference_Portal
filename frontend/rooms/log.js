
import $ from 'jquery'

import React, { useEffect, useRef, useState, useContext } from "react"
import Container from '@mui/material/Container';
import ResponsiveAppBar from '../component/nav/Navbar.js';
import Footer from '../component/nav/Footer.js';
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
require('../component/css/dataTables.dataTables.css')
require('../component/css/buttons.dataTables.css')
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { redirect_anon_to_login } from '../component/checkLogin.js';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App.js'
function Log() {
    const navigate = useNavigate();
    const { is_authenticated, setIsAuthenticated } = useContext(UserContext);
    $.DataTable = require('datatables.net')
    const tableRef = useRef()
    useEffect(() => {
        redirect_anon_to_login(navigate, is_authenticated)
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
                    { title: "Prompts", width: '30%' },
                    { title: "Response", width: '30%' },
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
                ajax: "/log/" ,
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
            <title>Log</title>
            <ResponsiveAppBar max_width="xl"  />
            <Container maxWidth="xl">
                <Box mt={4} sx={{ overflow: 'auto' }}>
                    <Paper pt={2} variant="outlined" sx={{ overflow: 'auto' }} >
                        <Box p={5}>
                        <table  className="display" width="100%" ref={tableRef}></table>
                        </Box>
                    </Paper>
                </Box>
            </Container >
            <Footer />
        </Container>
    );
}

export default Log;