import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Footer from "./component/nav/Footer";
import {RandomReveal} from "react-random-reveal";
import React from "react";
import ResponsiveAppBar from "./component/nav/Navbar";
import Typography from "@mui/material/Typography";

function ErrorPage() {
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};
	return (
		<Container maxWidth={false} disableGutters>
			<title>404</title>
			<ResponsiveAppBar max_width='xxl' />

			<Box justifyContent='center' justifyItems='center' m={2} alignContent='center' alignItems='center'>
				<Typography mt={15} mb={6} variant='h1' fontSize={200} align='center'>
					<RandomReveal isPlaying duration={0.5} characters='404' />
				</Typography>
			</Box>

			<Footer />
		</Container>
	);
}

export default ErrorPage;
