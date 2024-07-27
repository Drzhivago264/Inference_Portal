import React, { useContext } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { ColorModeContext } from "../App";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import Footer from "../component/nav/Footer";
import Grid from "@mui/material/Grid";
import IntroductionVerticalLinearStepper from "../component/custom_ui_component/IntroductionStepper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Paper from "@mui/material/Paper";
import ResponsiveAppBar from "../component/nav/Navbar";
import Slide from "@mui/material/Slide";
import { Stack } from "@mui/material";
import { TypeWriterText } from "../component/custom_ui_component/AnimatedText";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

function Information() {
	const { t } = useTranslation();
	const isChrome = !!window.chrome;
	const { mode, theme } = useContext(ColorModeContext);
	return (
		<Container maxWidth={false} disableGutters>
			<title>Introduction</title>
			<ResponsiveAppBar timeout={2000} max_width={false} />
			<Container
				maxWidth='xxl'
				disableGutters
				sx={{ justifyContent: "center", alignItems: "center" }}>
				<Box
					p={5}
					style={{
						backgroundImage: `url(https://static.professorparakeet.com/image/introduction_background_${mode}.svg)`,
						boxShadow: `0px 0px 36px 36px inset ${theme.palette.background.default}`,
					}}>
					<Grid
						container
						spacing={1}
						justify='flex-end'
						alignItems='center'
						mt={{ xs: 5, xl: 0 }}>
						<Grid item lg={12} xl={4}>
							<Slide
								direction='right'
								in={true}
								timeout={1500}
								mountOnEnter
								unmountOnExit>
								<Box ml={2}>
									<Typography
										variant='h2'
										style={{ fontWeight: 600 }}>
										{t("introduction.introduction_title")}
									</Typography>
									<Typography mt={3} variant='body1'>
										{t("introduction.introduction_explain")}
									</Typography>
									<Stack
										mt={5}
										direction={{ xs: "column", sm: "row" }}
										spacing={2}>
										<Box>
											<Button
												variant='contained'
												size='large'
												href='/frontend/key-management'
												sx={{ borderRadius: 28 }}
												endIcon={<NavigateNextIcon />}>
												<span
													style={{
														position: "relative",
														top: isChrome
															? "0px"
															: "2px",
													}}>
													{t(
														"introduction.get_start_button"
													)}
												</span>
											</Button>
										</Box>
										<Box>
											<Button
												variant='outlined'
												size='large'
												href='/frontend/manual/key'
												sx={{ borderRadius: 28 }}
												endIcon={<NavigateNextIcon />}>
												<span
													style={{
														position: "relative",
														top: isChrome
															? "0px"
															: "2px",
													}}>
													{t(
														"introduction.manual_button"
													)}
												</span>
											</Button>
										</Box>
									</Stack>
								</Box>
							</Slide>
						</Grid>
						<Grid item lg={12} xl={8}>
							<Box
								mr={2}
								mt={5}
								mb={5}
								sx={{
									display: {
										xs: "none",
										sm: "none",
										md: "block",
									},
								}}>
								<Slide
									direction='left'
									in={true}
									timeout={1000}
									mountOnEnter
									unmountOnExit>
									<Paper square={false}>
										<CardMedia
											component='img'
											image='https://static.professorparakeet.com/image/show_case.png'
											sx={{
												objectFit: "contain",
												borderRadius: "3px",
											}}
											alt='showcase_image'
										/>
									</Paper>
								</Slide>
							</Box>
						</Grid>
					</Grid>
				</Box>
				<Box
					maxWidth='xxl'
					display='flex'
					justifyContent='center'
					alignContent='center'>
					<Box maxWidth='lg' m={2}>
						<Grid container spacing={2}>
							<Grid item sm={12} md={8}>
								<Box>
									<Slide
										direction='up'
										in={true}
										timeout={2000}
										mountOnEnter
										unmountOnExit>
										<Stack
											mt={3}
											direction='column'
											spacing={5}>
											<Paper variant='outlined'>
												<Box mt={2} ml={2} mb={1}>
													<Typography variant='h4'>
														{t(
															"introduction.about_title"
														)}
													</Typography>
												</Box>
												<Divider />
												<Box m={2}>
													<Typography>
														{t(
															"introduction.about_chunk_1"
														)}
													</Typography>
													<Box ml={4}>
														<List
															sx={{
																listStyleType:
																	"disc",
															}}>
															{t(
																"introduction.user_list",
																{
																	returnObjects: true,
																}
															).map((l) => (
																<ListItem
																	key={l}
																	sx={{
																		display:
																			"list-item",
																	}}>
																	{l}
																</ListItem>
															))}
														</List>
													</Box>
													<Typography
														style={{
															whiteSpace:
																"pre-line",
														}}>
														{t(
															"introduction.about_chunk_2"
														)}
													</Typography>
												</Box>
											</Paper>
											<Paper variant='outlined'>
												<Box mt={2} ml={2} mb={1}>
													<Typography variant='h4'>
														{t(
															"introduction.tool_title"
														)}
													</Typography>
												</Box>
												<Divider />
												<Box m={2}>
													<Typography>
														{t(
															"introduction.tool_chunk_1"
														)}
													</Typography>
													<Box ml={4}>
														<List
															sx={{
																listStyleType:
																	"disc",
															}}>
															{t(
																"introduction.tool_list",
																{
																	returnObjects: true,
																}
															).map((l) => (
																<ListItem
																	key={l}
																	sx={{
																		display:
																			"list-item",
																	}}>
																	{l}
																</ListItem>
															))}
														</List>
													</Box>
													<Typography>
														{t(
															"introduction.tool_chunk_2"
														)}
													</Typography>
												</Box>
											</Paper>
											<Paper variant='outlined'>
												<Box mt={2} ml={2} mb={1}>
													<Typography variant='h4'>
														{t(
															"introduction.example_title"
														)}
													</Typography>
												</Box>
												<Divider />
												<Typography m={2}>
													{t(
														"introduction.example_chunk_1"
													)}
												</Typography>
												<Box
													m={1}
													sx={{
														display: "flex",
														flexWrap: "wrap",
														"& > :not(style)": {
															width: 1,
															height: {
																xs: "250px",
															},
															overflow: "auto",
															fontSize: {
																xs: "1em",
															},
														},
													}}>
													<Paper variant='outlined'>
														<Typography
															variant='body1'
															style={{
																display:
																	"block",
																padding: "10px",
																lineHeight: 1.7,
																whiteSpace:
																	"pre-wrap",
															}}>
															{t(
																"introduction.example_1"
															)}
														</Typography>
														<Divider></Divider>

														<TypeWriterText
															style={{
																display:
																	"block",
																padding: "10px",
																lineHeight: 1.7,
															}}
															sequence={[
																t(
																	"introduction.example_1_answer"
																),
																3000,
																"",
																() => {},
															]}
															wrapper='span'
															cursor={true}
															repeat={Infinity}
															speed={120}
															deletionSpeed={90}
														/>
													</Paper>
												</Box>
												<Typography m={2}>
													{t(
														"introduction.example_chunk_2"
													)}
												</Typography>
												<Box
													m={1}
													sx={{
														display: "flex",
														flexWrap: "wrap",
														"& > :not(style)": {
															width: 1,
															height: {
																xs: "250px",
															},
															overflow: "auto",
															fontSize: {
																xs: "1em",
															},
														},
													}}>
													<Paper variant='outlined'>
														<Typography
															variant='body1'
															style={{
																display:
																	"block",
																padding: "10px",
																lineHeight: 1.7,
																whiteSpace:
																	"pre-wrap",
															}}>
															{t(
																"introduction.example_2"
															)}
														</Typography>
														<Divider></Divider>
														<TypeWriterText
															style={{
																display:
																	"block",
																padding: "10px",
																lineHeight: 1.7,
															}}
															sequence={[
																t(
																	"introduction.example_2_answer"
																),
																3000,
																"",
																() => {},
															]}
															wrapper='span'
															cursor={true}
															repeat={Infinity}
															speed={120}
															deletionSpeed={90}
														/>
													</Paper>
												</Box>
											</Paper>
										</Stack>
									</Slide>
								</Box>
							</Grid>
							<Grid item sm={12} md={4}>
								<Slide
									direction='up'
									in={true}
									timeout={2000}
									mountOnEnter
									unmountOnExit
									sx={{
										display: { xs: "none", md: "block" },
									}}>
									<Box mt={3} mb={5}>
										<IntroductionVerticalLinearStepper
											t={t}
										/>
									</Box>
								</Slide>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
			<Footer />
		</Container>
	);
}

export default Information;
