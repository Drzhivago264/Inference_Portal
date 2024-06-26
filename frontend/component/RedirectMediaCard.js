import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions, Button } from '@mui/material';


export const RedirectMediaCards = ({ image_link, t, redirect, destination, image_loaded, setImageLoad, name }) => {

    return (
        <Box m={1}>
            <CardActionArea onClick={() => { redirect( destination ) }}>
                <Card sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {t(`redirect.${name}`)}
                            </Typography>
                            <Typography variant="subtitle1"
                                sx={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 5,
                                }} color="text.secondary" component="div">
                                {t(`redirect.${name}_Content`)}
                            </Typography>
                        </CardContent>

                        <CardActions >
                            <Button component="span" size="small" color="primary">
                                {t('redirect.Redirect')}
                            </Button>
                        </CardActions>
                    </Box>
                    {!image_loaded && <CardMedia sx={{ width: 200, height: 200 }}>
                        <Skeleton animation="wave" height={200} width={200} />
                    </CardMedia>}
                    <CardMedia
                        component="img"
                        sx={{ width: 200, display: image_loaded ? "block" : "none" }}
                        image={image_link}
                        onLoad={() => { setImageLoad(true) }}
                    />
                </Card>
            </CardActionArea>
        </Box>
    )
}