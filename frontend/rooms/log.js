import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.colVis.mjs";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-buttons/js/buttons.print.mjs";
import "../component/css/dataTables.dataTables.css";
import "../component/css/buttons.dataTables.css";

import React, {useContext, useEffect, useRef} from "react";

import $ from "jquery";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DataTable from "datatables.net";
import Footer from "../component/nav/Footer.js";
import JSZip from "jszip";
import Paper from "@mui/material/Paper";
import ResponsiveAppBar from "../component/nav/Navbar.js";
import {UserContext} from "../App.js";
import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake.min";
import {useGetRedirectAnon} from "../api_hook/useGetRedirectAnon.js";
import {useNavigate} from "react-router-dom";

window.JSZip = JSZip;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Log() {
	const navigate = useNavigate();
	const {is_authenticated} = useContext(UserContext);
	useGetRedirectAnon(navigate, is_authenticated);
	$.DataTable = DataTable;
	const tableRef = useRef();
	useEffect(() => {
		$.fn.dataTable.ext.errMode = () => alert("Your key is not authorised to view log!");
		const table = $(tableRef.current).DataTable({
			layout: {
				topStart: "pageLength",
				top2Start: {
					buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5", "print"],
				},
			},
			columns: [
				{title: "Prompts", width: "30%"},
				{title: "Response", width: "30%"},
				{title: "Models"},
				{title: "Created Time"},
				{title: "Type"},
				{title: "Input Cost"},
				{title: "Onput Cost"},
				{title: "Input Tokens"},
				{title: "Onput Tokens"},
			],
			processing: true,
			serverSide: true,
			ajax: "/log/",
			responsive: true,
			destroy: true,
		});
		return function () {
			table.destroy();
		};
	}, []);
	return (
		<Container maxWidth={false} disableGutters>
			<title>Log</title>
			<ResponsiveAppBar max_width='xxl' />
			<Container maxWidth='xl'>
				<Box mt={4} sx={{overflow: "auto"}}>
					<Paper pt={2} variant='outlined' sx={{overflow: "auto"}}>
						<Box p={5}>
							<table className='display' width='100%' ref={tableRef}></table>
						</Box>
					</Paper>
				</Box>
			</Container>
			<Footer />
		</Container>
	);
}

export default Log;
