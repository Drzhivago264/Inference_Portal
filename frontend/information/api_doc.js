import "rapidoc";

import React, {useContext} from "react";

import {ColorModeContext} from "../App";
import Container from "@mui/material/Container";
import Footer from "../component/nav/Footer";
import ResponsiveAppBar from "../component/nav/Navbar";

function APIDoc() {
	const { theme} = useContext(ColorModeContext);
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};
	return (
		<Container maxWidth={false} disableGutters>
			<title>API Doc</title>
			<ResponsiveAppBar max_width='xxl' />            
				<rapi-doc
					spec-url='/api/openapi.json'
					server-url={window.location.origin}
					render-style='view'
					show-header={false}
                    theme={theme.palette.mode}
					schema-description-expanded={true}
					primary-color={theme.palette.mode === "dark" ? "#fff" : "#121212"}
					style={{height: "1000px", width: "100%"}}
					bg-color={theme.palette.mode === "dark" ? "#121212" : "#fff"}></rapi-doc>
	
			<Footer />
		</Container>
	);
}

export default APIDoc;
