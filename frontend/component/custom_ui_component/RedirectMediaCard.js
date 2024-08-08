import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import PropTypes from "prop-types";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

export const RedirectMediaCards = ({image_link, t, redirect, destination, image_loaded, setImageLoad, name}) => {
	return (
		<Box m={1}>
			<CardActionArea
				onClick={() => {
					redirect(destination);
				}}>
				<Card sx={{display: "flex"}}>
					<Box sx={{display: "flex", flexDirection: "column"}}>
						<CardContent sx={{flex: "1 0 auto"}}>
							<Typography component='div' variant='h5'>
								{t(`redirect.${name}`)}
							</Typography>
							<Typography
								variant='subtitle1'
								sx={{
									display: "-webkit-box",
									overflow: "hidden",
									WebkitBoxOrient: "vertical",
									WebkitLineClamp: 5,
								}}
								color='text.secondary'
								component='div'>
								{t(`redirect.${name}_Content`)}
							</Typography>
						</CardContent>

						<CardActions>
							<Button component='span' size='small' color='primary'>
								{t("redirect.Redirect")}
							</Button>
						</CardActions>
					</Box>
					{!image_loaded && (
						<CardMedia sx={{width: {xs: 100,  md: '10vw'}, height: {xs: 100,  md: '10vw'}}}>
							<Skeleton animation='wave' height='10vw' width='10vw' />
						</CardMedia>
					)}
					<CardMedia
						component='img'
						sx={{
							width: {xs: 100,  md: '10vw'},
							display: image_loaded ? "block" : "none",
						}}
						image={image_link}
						onLoad={() => {
							setImageLoad(true);
						}}
					/>
				</Card>
			</CardActionArea>
		</Box>
	);
};
RedirectMediaCards.propTypes = {
	t: PropTypes.func.isRequired,
	image_link: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	redirect: PropTypes.func.isRequired,
	setImageLoad: PropTypes.func.isRequired,
	destination: PropTypes.string.isRequired,
	image_loaded: PropTypes.bool.isRequired,
};
