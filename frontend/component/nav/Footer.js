import * as React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FacebookIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Stack from "@mui/material/Stack";
import TwitterIcon from "@mui/icons-material/X";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Copyright() {
	return (
		<Typography variant='body2' color='text.secondary' mt={1}>
			{"Copyright © "}
			<Link href='https://professorparakeet.com/'>Professor Parakeet&nbsp;</Link>
			{new Date().getFullYear()}
		</Typography>
	);
}
export default function Footer() {
	const {t} = useTranslation();
	const navigate = useNavigate();
	return (
		<Container
			maxWidth='xl'
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: {xs: 4, sm: 8},
				py: {xs: 8, sm: 10},
				textAlign: {sm: "center", md: "left"},
			}}>
			<Box
				sx={{
					display: "flex",
					flexDirection: {xs: "column", sm: "row"},
					width: "100%",
					justifyContent: "space-between",
				}}>
				<Box
					sx={{
						display: {xs: "none", md: "flex"},
						flexDirection: "column",
						gap: 4,
						minWidth: {xs: "100%", sm: "10%"},
					}}>
					<Box sx={{width: {xs: "100%", sm: "100%"}}}>
						<Stack direction='column'>
							<Box
								component='img'
								sx={{
									height: 155,
									width: 155,
								}}
								onClick={() => {
									navigate("/");
								}}
								alt='Big Logo.'
								src='https://static.professorparakeet.com/image/apple-touch-icon.png'
							/>

							<Typography
								variant='h5'
								noWrap
								component='a'
								onClick={() => {
									navigate("/");
								}}
								sx={{
									mt: 2,
									display: {xs: "none", md: "flex"},
									fontWeight: 700,
									color: "inherit",
									textDecoration: "none",
								}}>
								{t("navbar.Prof_Parakeet")}
							</Typography>
						</Stack>
					</Box>
				</Box>
				<Box
					sx={{
						display: {xs: "none", sm: "flex"},
						flexDirection: "column",
						gap: 1,
					}}>
					<Typography variant='body2' fontWeight={600}>
						{t("navbar.Information")}
					</Typography>
					<Link color='text.secondary' href='/'>
						{t("navbar.Introduction")}
					</Link>
					<Link color='text.secondary' href='/frontend/model'>
						{t("navbar.Model")}
					</Link>
					<Link color='text.secondary' href='/frontend/manual/key'>
						{t("navbar.Manual")}
					</Link>
				</Box>
				<Box
					sx={{
						display: {xs: "none", sm: "flex"},
						flexDirection: "column",
						gap: 1,
					}}>
					<Typography variant='body2' fontWeight={600}>
						{t("navbar.Money_Talks")}
					</Typography>
					<Link color='text.secondary' href='/frontend/key-management'>
						{t("navbar.Manage_Key")}
					</Link>
					<Link color='text.secondary' href='/frontend/model'>
						{t("navbar.Pricing")}
					</Link>
				</Box>
				<Box
					sx={{
						display: {xs: "none", sm: "flex"},
						flexDirection: "column",
						gap: 1,
					}}>
					<Typography variant='body2' fontWeight={600}>
						{t("navbar.Modes")}
					</Typography>
					<Link color='text.secondary' href='/frontend/hub'>
						{t("navbar.Bots_Agents")}
					</Link>
					<Link color='text.secondary' href='/frontend/api/docs'>
						{t("navbar.API_Docs")}
					</Link>
				</Box>
				<Box
					sx={{
						display: {xs: "none", sm: "flex"},
						flexDirection: "column",
						gap: 1,
					}}>
					<Typography variant='body2' fontWeight={600}>
						{t("navbar.Great_Minds_Think_Alike")}
					</Typography>
					<Link color='text.secondary' href='/frontend/contact'>
						{t("navbar.Contact")}
					</Link>
					<Link color='text.secondary' href='#'>
						{t("navbar.Frankensteining_Experiments")}
					</Link>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					pt: {xs: 4, sm: 8},
					width: "100%",
					borderTop: "1px solid",
					borderColor: "divider",
				}}>
				<div>
					<Link color='text.secondary' href='#'>
						Privacy Policy
					</Link>
					<Typography display='inline' sx={{mx: 0.5, opacity: 0.5}}>
						&nbsp;•&nbsp;
					</Typography>
					<Link color='text.secondary' href='#'>
						Terms of Service
					</Link>
					<Copyright />
				</div>
				<Stack
					direction='row'
					justifyContent='left'
					spacing={1}
					useFlexGap
					sx={{
						color: "text.secondary",
					}}>
					<IconButton color='inherit' href='https://github.com/Drzhivago264/Inference_Portal' aria-label='GitHub' sx={{alignSelf: "center"}}>
						<FacebookIcon />
					</IconButton>
					<IconButton color='inherit' href='https://twitter.com/MaterialUI' aria-label='X' sx={{alignSelf: "center"}}>
						<TwitterIcon />
					</IconButton>
					<IconButton color='inherit' href='https://www.linkedin.com/company/mui/' aria-label='LinkedIn' sx={{alignSelf: "center"}}>
						<LinkedInIcon />
					</IconButton>
				</Stack>
			</Box>
		</Container>
	);
}
