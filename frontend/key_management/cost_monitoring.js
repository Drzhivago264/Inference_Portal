
import $ from 'jquery'

import React, { useEffect, useRef, useState } from "react"
import Container from '@mui/material/Container';
import ResponsiveAppBar from '../component/navbar';
import Footer from '../component/footer';
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
import faker from 'faker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
function CostMonitoring() {
    $.DataTable = require('datatables.net')
    const tableRef = useRef()
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Work in Progress, Stay Tuned!!!',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      
   
    return (
        <Container maxWidth={false} disableGutters>
            <title>Cost Monitoring</title>
            <ResponsiveAppBar />
            <Container maxWidth="xl">
                <Box mt={4} sx={{ overflow: 'auto' }}>
                    <Paper pt={2} variant="outlined" sx={{ overflow: 'auto' }} >
                        <Box p={5}>
                        <Bar options={options} data={data} />
                        </Box>
                    </Paper>
                </Box>
            </Container >
            <Footer />
        </Container>
    );
}

export default CostMonitoring;