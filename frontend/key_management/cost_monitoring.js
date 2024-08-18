import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import React, {useEffect, useState} from "react";

import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Bar} from "react-chartjs-2";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import Footer from "../component/nav/Footer";
import Grid from "@mui/material/Grid";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import NoPermissionDialog from "../component/dialog/NoPermissionDialog";
import Paper from "@mui/material/Paper";
import ResponsiveAppBar from "../component/nav/Navbar";
import autocolors from "chartjs-plugin-autocolors";
import axios from "axios";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, autocolors);

function CostMonitoring() {
	const format_to_hour = "YYYY-MM-DD HH:mm";
	const now = dayjs();
	const [data_by_date, setDataByDate] = useState(null);
	const [data_total, setDataTotal] = useState(null);
	const [enddate, setEnddate] = useState(now.format(format_to_hour));
	const [startdate, setStartDate] = useState(now.subtract(7, "days").format(format_to_hour));
	const [enddate_total, setEnddateTotal] = useState(now.format(format_to_hour));
	const [startdate_total, setStartDateTotal] = useState(now.subtract(7, "days").format(format_to_hour));
	const [no_perm_open, setNoPermOpen] = useState(null);   
	useEffect(() => {
		axios
			.all([axios.get(`/frontend-api/cost/${startdate}/${enddate}`)])
			.then(
				axios.spread((log_object) => {
					let labels = [];
					let model_list = [];
					let datasets = [];
					for (let l in log_object.data.cost_by_model) {
						if (!labels.includes(log_object.data.cost_by_model[l]["created_at__date"])) {
							labels.push(log_object.data.cost_by_model[l]["created_at__date"]);
						}
						if (!model_list.includes(log_object.data.cost_by_model[l]["model__name"])) {
							model_list.push(log_object.data.cost_by_model[l]["model__name"]);
						}
					}
					for (let m in model_list) {
						let sum_input_tokens_list = [];
						let sum_output_tokens_list = [];
						for (let l in labels) {
							var result = log_object.data.cost_by_model.filter(function (data) {
								return data.model__name == model_list[m] && data.created_at__date == labels[l];
							});
							if (result.length > 0) {
								sum_input_tokens_list.push(result[0].sum_input_tokens);
								sum_output_tokens_list.push(result[0].sum_output_tokens);
							}
						}
						datasets.push(
							{
								label: `Input Tokens ${model_list[m]}`,
								data: sum_input_tokens_list,
								stack: "Stack 0",
							},
							{
								label: `Output Tokens ${model_list[m]}`,
								data: sum_output_tokens_list,
								stack: "Stack 1",
							}
						);
					}
					let data_ = {
						labels,
						datasets,
					};
					setDataByDate(data_);
				})
			)
			.catch((error) => {
				if (error.response.status === 403) {
					setNoPermOpen(true);
				}
			});
	}, [startdate, enddate]);

	useEffect(() => {
		axios
			.all([axios.get(`/frontend-api/cost/${startdate_total}/${enddate_total}`)])
			.then(
				axios.spread((log_object) => {
					let labels = ["Total"];
					let model_list = [];
					let datasets = [];
					for (let l in log_object.data.cost_by_model) {
						if (!model_list.includes(log_object.data.cost_by_model[l]["model__name"])) {
							model_list.push(log_object.data.cost_by_model[l]["model__name"]);
						}
					}
					for (let m in model_list) {
						let sum_input_tokens = 0;
						let sum_output_tokens = 0;
						for (let l = 0; l < labels.length; l++) {
							var result = log_object.data.cost_by_model.filter(function (data) {
								return data.model__name == model_list[m];
							});
							if (result.length > 0) {
								sum_input_tokens += result[0].sum_input_tokens;
								sum_output_tokens += result[0].sum_output_tokens;
							}
						}
						datasets.push(
							{
								label: `Input Tokens ${model_list[m]}`,
								data: [sum_input_tokens],
							},
							{
								label: `Output Tokens ${model_list[m]}`,
								data: [sum_output_tokens],
							}
						);
					}
					let data_ = {
						labels,
						datasets,
					};
					setDataTotal(data_);
				})
			)
			.catch((error) => {
				if (error.response.status === 403) {
					setNoPermOpen(true);
				}
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
				position: "bottom",
			},
			autocolors: {
				enabled: true,
			},
			title: {
				display: true,
				text: "Token Consumption By Day",
			},
			tooltip: {
				callbacks: {
					footer: function (context) {
						return `Cost: ${context[0].raw} (tokens) × 0 (USD) = 0 (USD)`;
					},
				},
			},
		},
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
				position: "bottom",
			},
			autocolors: {
				enabled: true,
			},
			title: {
				display: true,
				text: "Token Consumption Total",
			},
			tooltip: {
				callbacks: {
					footer: function (context) {
						return `Cost: ${context[0].raw} (tokens) × 0 (USD) = 0 (USD)`;
					},
				},
			},
		},
	};
	return (
		<Container maxWidth={false} disableGutters>
			<title>Cost Monitoring</title>
			<ResponsiveAppBar max_width='xl' />
			<Container maxWidth='xl'>
				<Box mt={4} sx={{overflow: "auto"}}>
					<Grid container spacing={1}>
						<Grid item sm={12} md={8}>
							<Paper pt={2} variant='outlined' sx={{overflow: "auto"}}>
								<Box p={1}>
									<Box display='flex' justifyContent='flex-end'>
										{startdate && enddate && (
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DemoContainer components={["DatePicker", "DatePicker"]}>
													<DesktopDatePicker
														label='Start Date'
														value={dayjs(startdate)}
														onChange={(newValue) => setStartDate(newValue.format(format_to_hour))}
														slotProps={{
															textField: {
																size: "small",
															},
														}}
													/>
													<DesktopDatePicker
														label='End Date'
														value={dayjs(enddate)}
														onChange={(newValue) => setEnddate(newValue.format(format_to_hour))}
														slotProps={{
															textField: {
																size: "small",
															},
														}}
													/>
												</DemoContainer>
											</LocalizationProvider>
										)}
									</Box>
									<Box height={600}>{data_by_date && <Bar options={options_by_date} data={data_by_date} />}</Box>
								</Box>
							</Paper>
						</Grid>
						<Grid item sm={12} md={4}>
							<Paper pt={2} variant='outlined' sx={{overflow: "auto"}}>
								<Box p={1}>
									<Box display='flex' justifyContent='flex-end'>
										{startdate_total && enddate_total && (
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DemoContainer components={["DatePicker", "DatePicker"]}>
													<DesktopDatePicker
														label='Start Date'
														value={dayjs(startdate_total)}
														onChange={(newValue) => setStartDateTotal(newValue.format(format_to_hour))}
														slotProps={{
															textField: {
																size: "small",
															},
														}}
													/>
													<DesktopDatePicker
														label='End Date'
														value={dayjs(enddate_total)}
														onChange={(newValue) => setEnddateTotal(newValue.format(format_to_hour))}
														slotProps={{
															textField: {
																size: "small",
															},
														}}
													/>
												</DemoContainer>
											</LocalizationProvider>
										)}
									</Box>
									<Box height={600}>{data_total && <Bar options={options_total} data={data_total} />}</Box>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</Container>
			<Footer />
            <NoPermissionDialog setNoPermOpen={setNoPermOpen} no_perm_open={no_perm_open}/>
		</Container>
	);
}

export default CostMonitoring;
