import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ErrorAlert from "../component/Alert/SuccessErrorAlert.js";
import Footer from "../component/nav/Footer.js";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import KeyIcon from "@mui/icons-material/Key";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import ResponsiveAppBar from "../component/nav/Navbar.js";
import Stack from "@mui/material/Stack";
import StyledPaper from "../component/custom_ui_component/StyledPaper.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {UserContext} from "../App.js";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {basePost} from "../api_hook/basePost.js";
import {useMutation} from "react-query";

function Contact() {
	const [showPassword, setShowPassword] = useState(false);
	const {setIsAuthenticated} = useContext(UserContext);
	const navigate = useNavigate();
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const [loading, setLoading] = useState(false);
	const [key, setKey] = useState("");
	const [keyError, setKeyError] = useState(false);
	const [loginerror, setLoginError] = useState(false);

	const {mutate: loginmutate} = useMutation(basePost);
	const handleLogin = (event) => {
		event.preventDefault();
		setLoading(true);
		if (key == "") {
			setKeyError(true);
		} else if (key) {
			const data = {
				key: key,
			};
			loginmutate(
				{url: "/frontend-api/login", data: data},
				{
					onSuccess: () => {
						setIsAuthenticated(true);
						navigate("/frontend/hub");
					},
					onError: (error) => {
						setLoginError(error.response.data.detail);
					},
				}
			);
		}
		setLoading(false);
	};

	return (
		<Container maxWidth={false} disableGutters>
			<title>Login</title>
			<ResponsiveAppBar max_width='xl' />
			<Container maxWidth='sm'>
				<Box my={1} alignItems='center' gap={4} p={2}>
					<StyledPaper variant='outlined'>
						<Box textAlign='center' my={1}>
							<Typography variant='h4'>
								<Box sx={{mb: 1, fontWeight: "bold"}}>Login</Box>
							</Typography>
							<Box sx={{p: 2}}>
								<form autoComplete='off' onSubmit={handleLogin}>
									<FormControl defaultValue='' margin='normal' required>
										<Stack direction={{xs: "column"}} spacing={1}>
											<TextField
												margin='normal'
												fullWidth
												label='Key'
												type={showPassword ? "text" : "password"}
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
													endAdornment: (
														<InputAdornment position='end'>
															<IconButton
																aria-label='toggle password visibility'
																onClick={handleClickShowPassword}
																onMouseDown={handleMouseDownPassword}
																edge='end'>
																{showPassword ? <VisibilityOff /> : <Visibility />}
															</IconButton>
														</InputAdornment>
													),
												}}
											/>
											<LoadingButton loading={loading} variant='contained' type='submit' endIcon={<LoginIcon />}>
												Login
											</LoadingButton>
										</Stack>
									</FormControl>
								</form>
							</Box>
							<Divider />
							<Box sx={{pt: 3}}>
								<LoadingButton size='medium' variant='contained' component={Link} to='/frontend/key-management'>
									{" "}
									Create New Key{" "}
								</LoadingButton>
							</Box>
						</Box>
						{loginerror && <ErrorAlert detail={loginerror} type='error' />}
					</StyledPaper>
				</Box>
			</Container>
			<Footer />
		</Container>
	);
}

export default Contact;
