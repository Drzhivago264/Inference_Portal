import {Highlight, themes} from "prism-react-renderer";
import {MuiMarkdown, getOverrides} from "mui-markdown";
import React, {useEffect, useState} from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Footer from "../component/nav/Footer";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ResponsiveAppBar from "../component/nav/Navbar";
import Skeleton from "@mui/material/Skeleton";
import TableOfContents from "../component/custom_ui_component/TableofContent";
import Typography from "@mui/material/Typography";
import authentication_en from "../../docs/Manual/en/authentication_en.md";
import authentication_vi from "../../docs/Manual/vi/authentication_vi.md";
import axios from "axios";
import behavior_en from "../../docs/Manual/en/behavior_en.md";
import behavior_vi from "../../docs/Manual/vi/behavior_vi.md";
import errorlimit_en from "../../docs/Manual/en/error_ratelimit_en.md";
import errorlimit_vi from "../../docs/Manual/vi/error_ratelimit_vi.md";
import i18next from "i18next";
import inference_en from "../../docs/Manual/en/inference_en.md";
import inference_vi from "../../docs/Manual/vi/inference_vi.md";
import key_en from "../../docs/Manual/en/create_key_en.md";
import key_vi from "../../docs/Manual/vi/create_key_vi.md";
import {useParams} from "react-router";
import {useQuery} from "react-query";
import {useTranslation} from "react-i18next";

const retrieveManual = async (destination_refs, doc, default_language) => {
	const response = await axios.get(destination_refs[doc][default_language]);
	return response.data;
};

function Manual() {

	const {doc} = useParams();
	const [default_language, setDefaultLanguage] = useState(i18next.language);
	const [displaydoc, setDisplayDoc] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	const destination_refs = {
		key: {
			en: key_en,
			vi: key_vi,
		},
		authentication: {
			en: authentication_en,
			vi: authentication_vi,
		},
		inference: {
			en: inference_en,
			vi: inference_vi,
		},
		errorlimit: {
			en: errorlimit_en,
			vi: errorlimit_vi,
		},
		behavior: {
			en: behavior_en,
			vi: behavior_vi,
		},
	};
	const {t, i18n} = useTranslation();

	useEffect(() => {
		setDefaultLanguage(i18n.language);
	}, [i18n.language]);
	useEffect(() => {
		setSelectedIndex(Object.keys(destination_refs).indexOf(doc));
	}, []);
	const docRequest = useQuery(["ManualDocData", destination_refs, doc, default_language], () => retrieveManual(destination_refs, doc, default_language), {
		staleTime: Infinity,
		retry: false,
	});

	useEffect(() => {
		if (docRequest.status === "success" && docRequest.data) {
			setDisplayDoc(docRequest.data);
		}
	}, [docRequest.status, docRequest.data]);
	return (
		<Container maxWidth={false} disableGutters>
			<title>Manual</title>
			<ResponsiveAppBar max_width='xxl' />
			<Container maxWidth='xl'>
				<Box display='flex' alignItems='center'>
					<Grid container spacing={1}>
						<Grid item md={3} lg={2}>
							<Box
								mt={3}
								mb={5}
								sx={{
									display: {
										xs: "none",
										sm: "none ",
										md: "block",
									},
								}}>
								<List dense={true}>
									{[
										{
											link: "/frontend/manual/key",
											tranlate: "manual.Setting_Up_Your_API_Key",
										},
										{
											link: "/frontend/manual/authentication",
											tranlate: "manual.Authentication",
										},
										{
											link: "/frontend/manual/inference",
											tranlate: "manual.Inference",
										},
										{
											link: "/frontend/manual/errorlimit",
											tranlate: "manual.Common_Errors_and_Ratelimits",
										},
										{
											link: "/frontend/manual/behavior",
											tranlate: "manual.The_Behaviors_of_This_Website",
										},
									].map((object, index) => {
										return (
											<ListItemButton
												selected={selectedIndex === index}
												onClick={(event) => handleListItemClick(event, index)}
												key={object.link}
												component={Link}
												to={object.link}>
												<Typography component='span' variant='body2'>
													{t(object.tranlate)}
												</Typography>
											</ListItemButton>
										);
									})}
								</List>
							</Box>
						</Grid>
						<Divider
							orientation='vertical'
							flexItem
							sx={{
								mr: "-1px",
								display: {xs: "none", sm: "block"},
							}}
						/>
						<Grid item xs={12} md={8} lg={8}>
							<Box mt={3} sx={{display: {sm: "block ", md: "none"}}}>
								<List dense={true}>
									{[
										{path: "/frontend/manual/key", text: "manual.Setting_Up_Your_API_Key"},
										{path: "/frontend/manual/authentication", text: "manual.Authentication"},
										{path: "/frontend/manual/inference", text: "manual.Inference"},
										{path: "/frontend/manual/errorlimit", text: "manual.Common_Errors_and_Ratelimits"},
										{path: "/frontend/manual/behavior", text: "manual.The_Behaviors_of_This_Website"},
									].map((item, index) => (
										<ListItemButton key={index} component={Link} to={item.path}>
											<Typography>{t(item.text)} </Typography>{" "}
										</ListItemButton>
									))}
								</List>
							</Box>
							<Box m={3}>
								{docRequest.isLoading && <Skeleton variant='rounded' animation='wave' height={350} />}
								{docRequest.error && (
									<Alert variant='outlined' severity='error'>
										Cannot find the manual from server! Contact us ...
									</Alert>
								)}
								{!docRequest.isLoading && (
									<MuiMarkdown
										overrides={{
											...getOverrides({
												Highlight,
												themes,
												theme: themes.vsDark,
                                                hideLineNumbers: true,
                                                
											}),
											h1: {
												component: "h1",
											},
											h2: {
												component: "h2",
											},
											h3: {
												component: "h3",
											},
										}}>
										{displaydoc}
									</MuiMarkdown>
								)}
							</Box>
						</Grid>
						<Divider
							orientation='vertical'
							flexItem
							sx={{
								mr: "-1px",
								display: {
									xs: "none",
									sm: "none",
									md: "none",
									lg: "block",
								},
							}}
						/>
						<Grid item xs={0} sm={2}>
							<Box
								sx={{
									display: {
										xs: "none",
										sm: "none",
										md: "none",
										lg: "block",
									},
								}}>
								{displaydoc && (
									<Box
										key={displaydoc}
										style={{
											position: "fixed",
											marginTop: 7,
											width: 270,
										}}>
										<TableOfContents mdfile={displaydoc} />
									</Box>
								)}
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Container>
			<Footer />
		</Container>
	);
}
export default Manual;
