import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import '../component/css/buttons.dataTables.css'
import '../component/css/dataTables.dataTables.css'

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from "react"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Bar } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Footer from '../component/nav/Footer';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Paper from '@mui/material/Paper';
import ResponsiveAppBar from '../component/nav/Navbar';
import axios from 'axios';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function CostMonitoring() {
  const format_to_hour = "YYYY-MM-DD HH:mm"
  const now = dayjs()
  const [data_by_date, setDataByDate] = useState(null);
  const [data_total, setDataTotal] = useState(null);
  const [enddate, setEnddate] = useState(now.format(format_to_hour));
  const [startdate, setStartDate] = useState(now.subtract(7, 'days').format(format_to_hour));
  const [enddate_total, setEnddateTotal] = useState(now.format(format_to_hour));
  const [startdate_total, setStartDateTotal] = useState(now.subtract(7, 'days').format(format_to_hour));
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  useEffect(() => {
    axios.all([
      axios.get(`/frontend-api/cost/${startdate}/${enddate}`),
    ])
      .then(axios.spread((log_object) => {
        let labels = []
        let model_list = []
        let datasets = []
        for (let l in log_object.data.cost_by_model) {
          if (!labels.includes(log_object.data.cost_by_model[l]['created_at__date'])) {
            labels.push(log_object.data.cost_by_model[l]['created_at__date'])
          }
          if (!model_list.includes(log_object.data.cost_by_model[l]['model__name'])) {
            model_list.push(log_object.data.cost_by_model[l]['model__name'])
          }
        }
        for (let m in model_list) {
          let sum_input_tokens_list = []
          let sum_output_tokens_list = []
          for (let l in labels) {
            var result = log_object.data.cost_by_model.filter(
              function (data) { return data.model__name == model_list[m] && data.created_at__date == labels[l] }
            )
            if (result.length > 0) {
              sum_input_tokens_list.push(result[0].sum_input_tokens)
              sum_output_tokens_list.push(result[0].sum_output_tokens)
            }
          }
          datasets.push(
            {
              label: `Input Tokens ${model_list[m]}`,
              data: sum_input_tokens_list,
              backgroundColor: getRandomColor(),
              stack: 'Stack 0',
            },
            {
              label: `Output Tokens ${model_list[m]}`,
              data: sum_output_tokens_list,
              backgroundColor: getRandomColor(),
              stack: 'Stack 1',
            },
          )
        }
        let data_ = {
          labels,
          datasets
        };
        setDataByDate(data_)
      }))
      .catch(error => {
        console.log(error);
      });
  }, [startdate, enddate]);

  useEffect(() => {
    axios.all([
      axios.get(`/frontend-api/cost/${startdate_total}/${enddate_total}`),
    ])
      .then(axios.spread((log_object) => {
        let labels = ["Total"]
        let model_list = []
        let datasets = []
        for (let l in log_object.data.cost_by_model) {
          if (!model_list.includes(log_object.data.cost_by_model[l]['model__name'])) {
            model_list.push(log_object.data.cost_by_model[l]['model__name'])
          }
        }
        for (let m in model_list) {
          let sum_input_tokens = 0
          let sum_output_tokens = 0
          for (let l in labels) {
            var result = log_object.data.cost_by_model.filter(
              function (data) { return data.model__name == model_list[m] }
            )
            if (result.length > 0) {
              sum_input_tokens += result[0].sum_input_tokens
              sum_output_tokens += result[0].sum_output_tokens
            }
          }
          datasets.push(
            {
              label: `Input Tokens ${model_list[m]}`,
              data: [sum_input_tokens],
              backgroundColor: getRandomColor(),
            },
            {
              label: `Output Tokens ${model_list[m]}`,
              data: [sum_output_tokens],
              backgroundColor: getRandomColor(),
            },
          )

        }
        console.log(datasets)
        let data_ = {
          labels,
          datasets
        };
        setDataTotal(data_)
      }))
      .catch(error => {
        console.log(error);
      });
  }, [startdate_total, enddate_total]);

  const options_by_date = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',

      },
      title: {
        display: true,
        text: 'Token Consumption By Day',
      },
      tooltip: {

        callbacks: {
          footer: function (context) {
            return `Cost: ${context[0].raw} (tokens) × 0 (USD) = 0 (USD)`;
          }
        }
      }
    }
  };
  const options_total = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',       
      },
      title: {
        display: true,
        text: 'Token Consumption Total',
      },
      tooltip: {
        callbacks: {
          footer: function (context) {
            return `Cost: ${context[0].raw} (tokens) × 0 (USD) = 0 (USD)`;
          }
        }
      }
    }
  };
  return (
    <Container maxWidth={false} disableGutters>
      <title>Cost Monitoring</title>
      <ResponsiveAppBar max_width="xl" />
      <Container maxWidth="xl">
        <Box mt={4} sx={{ overflow: 'auto' }}>
          <Grid container spacing={1}>
            <Grid item sm={12} md={8} >
              <Paper pt={2} variant="outlined" sx={{ overflow: 'auto' }} >
                <Box p={1}>
                  <Box display="flex" justifyContent="flex-end">
                    {startdate && enddate && <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DesktopDatePicker label="Start Date"
                          value={dayjs(startdate)}
                          onChange={(newValue) => setStartDate(newValue.format(format_to_hour))}
                          slotProps={{ textField: { size: 'small' } }}
                        />
                        <DesktopDatePicker label="End Date"
                          value={dayjs(enddate)}
                          onChange={(newValue) => setEnddate(newValue.format(format_to_hour))}
                          slotProps={{ textField: { size: 'small' } }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>}
                  </Box>
                  <Box height={600}>
                    {data_by_date && <Bar options={options_by_date} data={data_by_date} />}
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item sm={12} md={4}>
              <Paper pt={2} variant="outlined" sx={{ overflow: 'auto' }} >
                <Box p={1}>
                  <Box display="flex" justifyContent="flex-end">
                    {startdate_total && enddate_total && <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DesktopDatePicker label="Start Date"
                          value={dayjs(startdate_total)}
                          onChange={(newValue) => setStartDateTotal(newValue.format(format_to_hour))}
                          slotProps={{ textField: { size: 'small' } }}
                        />
                        <DesktopDatePicker label="End Date"
                          value={dayjs(enddate_total)}
                          onChange={(newValue) => setEnddateTotal(newValue.format(format_to_hour))}
                          slotProps={{ textField: { size: 'small' } }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>}
                  </Box>
                  <Box height={600}>
                    {data_total && <Bar options={options_total} data={data_total} />}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container >
      <Footer />
    </Container>
  );
}

export default CostMonitoring;