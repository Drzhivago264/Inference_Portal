import "swagger-ui-react/swagger-ui.css";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Footer from "../component/nav/Footer";
import React from "react";
import ResponsiveAppBar from "../component/nav/Navbar";
import SwaggerUI from "swagger-ui-react";

function APIDoc() {
	const ui = SwaggerUI({
		dom_id: "#swaggerContainer",
		url: "/api/openapi.json",
	});

	return (
		<Container maxWidth={false} disableGutters>
			<title>API Doc</title>
			<ResponsiveAppBar max_width='xxl' />
			<Container maxWidth='xxl'>
				<Box p={1} sx={{ bgcolor: "white", borderRadius: 2 }}>
					{ui}
				</Box>
			</Container>
			<Footer />
		</Container>
	);
}

export default APIDoc;
