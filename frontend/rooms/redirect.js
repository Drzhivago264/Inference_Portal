import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Footer from "../component/nav/Footer.js";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import InputAdornment from "@mui/material/InputAdornment";
import KeyIcon from "@mui/icons-material/Key";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import {RedirectMediaCards} from "../component/custom_ui_component/RedirectMediaCard.js";
import ResponsiveAppBar from "../component/nav/Navbar.js";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import SuccessErrorAlert from "../component/alert/SuccessErrorAlert.js";
import TextField from "@mui/material/TextField";
import {UserContext} from "../App.js";
import axios from "axios";
import {getCookie} from "../component/getCookie.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material";
import {useTranslation} from "react-i18next";
import {usePostLogin} from "../api_hook/usePostLogin";

function Hub() {
	const {is_authenticated, setIsAuthenticated} = useContext(UserContext);
	const theme = useTheme();
	const check_orientation = useMediaQuery(theme.breakpoints.down("md")) ? "horizontal" : "vertical";
	const {t} = useTranslation();

	const navigate = useNavigate();
	const [key, setKey] = useState("");
	const [keyError, setKeyError] = useState(false);
	const [loginerror, setLoginError] = useState(false);
	const [redirecterror, setRedirectError] = useState(null);
	const [opensnack, setOpenSnack] = useState(false);
	const [image_1_loaded, setImage1Load] = useState(false);
	const [image_2_loaded, setImage2Load] = useState(false);
	const [image_3_loaded, setImage3Load] = useState(false);
	const [image_4_loaded, setImage4Load] = useState(false);
	const [image_5_loaded, setImage5Load] = useState(false);
	const cardData = [
		{
			image_link: "/static/image/robot_line.jpg",
			destination: "chat",
			image_loaded: image_1_loaded,
			setImageLoad: setImage1Load,
			name: "Chatbot_Mode",
		},
		{
			image_link: "/static/image/Robot_folow_instruct.jpg",
			destination: "engineer",
			image_loaded: image_2_loaded,
			setImageLoad: setImage2Load,
			name: "Agent_Mode",
		},
		{
			image_link: "/static/image/Robot_label.jpg",
			destination: "toolbox",
			image_loaded: image_3_loaded,
			setImageLoad: setImage3Load,
			name: "LLM_Functions",
		},
		{
			image_link: "/static/image/face_to_face.jpeg",
			destination: "hotpot",
			image_loaded: image_4_loaded,
			setImageLoad: setImage4Load,
			name: "Hotpot_Mode",
		},
		{
			image_link: "/static/image/data_synthesis.jpg",
			destination: "data-synthesis",
			image_loaded: image_5_loaded,
			setImageLoad: setImage5Load,
			name: "Data_Synthesis",
		},
	];
	const handleCloseSnack = (_, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSnack(false);
	};
	const {
		fetch: postLogin,
		isLoading: loginisLoading,
	} = usePostLogin({
		setKeyError: setKeyError, key: key, setIsAuthenticated: setIsAuthenticated, navigate: navigate, setLoginError: setLoginError, setRedirectError: null
	});

	const redirect = (destination) => {
		setKeyError(false);
		setLoginError(false);
		if (!is_authenticated && !key) {
			setKeyError(true);
			setOpenSnack(true);
		} else {
			if (destination) {
				const csrftoken = getCookie("csrftoken");
				const config = {
					headers: {
						"content-type": "application/json",
						"X-CSRFToken": csrftoken,
					},
				};
				const data = {
					key: key,
					check_login: is_authenticated,
					destination: destination,
				};
				axios
					.post("/frontend-api/hub-redirect", data, config)
					.then((response) => {
						setIsAuthenticated(true);
						navigate(response.data.redirect_link);
					})
					.catch((error) => {
						setRedirectError(error.response.data.detail);
						if (error.response.status === "400") {
							setRedirectError("Your key is incorrect");
						}
					});
			}
		}
	};
	return (
		<Container maxWidth={false} disableGutters>
			<title>Hub</title>
			<ResponsiveAppBar max_width='xxl' />
			<Container maxWidth='xl'>
				<Snackbar open={opensnack} autoHideDuration={5000} onClose={handleCloseSnack}>
					<Alert onClose={handleCloseSnack} severity='error' variant='filled' sx={{width: "100%"}}>
						You need an API key!
					</Alert>
				</Snackbar>
				<Box my={1} display='flex' alignItems='center' gap={4} p={2}>
					<Grid container alignItems='center' justify='center' direction='column' spacing={2}>
						{!is_authenticated && (
							<Grid item md={12} lg={12}>
								<form autoComplete='off' onSubmit={postLogin}>
									<FormControl defaultValue='' required>
										<Stack
											ml={1}
											mt={3}
											direction={{
												xs: "column",
												md: "row",
											}}
											spacing={{xs: 1, md: 1}}>
											<TextField
												margin='normal'
												label='Key'
												type='password'
												size='small'
												onChange={(e) => setKey(e.target.value)}
												value={key}
												error={keyError}
												autoComplete='off'
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<KeyIcon />
														</InputAdornment>
													),
												}}
											/>
											<LoadingButton loading={loginisLoading} variant='contained' type='submit' endIcon={<LoginIcon />}>
												Login
											</LoadingButton>
											<Divider orientation={check_orientation} flexItem={true} />

											<LoadingButton variant='contained' component={Link} to='/frontend/key-management'>
												Create New Key
											</LoadingButton>
										</Stack>
										{loginerror && <SuccessErrorAlert detail={loginerror} type='error' />}
										{redirecterror && <SuccessErrorAlert detail={redirecterror} type='error' />}
									</FormControl>
								</form>
							</Grid>
						)}
						<Grid item xs={12}>
							<ImageList variant="masonry" cols={2} gap={24}>
								{cardData.map((card) => (
									<ImageListItem key={card.destination}>
										<RedirectMediaCards
											image_link={card.image_link}
											redirect={redirect}
											destination={card.destination}
											image_loaded={card.image_loaded}
											setImageLoad={card.setImageLoad}
											t={t}
											name={card.name}
										/>
									</ImageListItem>
								))}
							</ImageList>
						</Grid>
					</Grid>
				</Box>
			</Container>
			<Footer />
		</Container>
	);
}

export default Hub;
