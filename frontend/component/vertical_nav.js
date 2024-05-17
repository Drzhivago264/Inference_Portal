import React from "react";
import ApiIcon from '@mui/icons-material/Api';
import ArticleIcon from '@mui/icons-material/Article';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import LayersIcon from '@mui/icons-material/Layers';
import ChatIcon from '@mui/icons-material/Chat';
import KeyIcon from '@mui/icons-material/Key';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmailIcon from '@mui/icons-material/Email';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import RuleIcon from '@mui/icons-material/Rule';
import { UserContext } from '../App.js'
import { logout } from './check_login';
import StorageIcon from '@mui/icons-material/Storage';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';
import { getCookie } from './getCookie.js'
import axios from 'axios';

export const UserVeticalNav = ({ navigate }) => {

    const { is_authenticated, setIsAuthenticated, user_hashed_key } = React.useContext(UserContext);
    const log_out_ = (setIsAuthenticaed) => {
        logout(setIsAuthenticaed)
        navigate("/");
    }
    const logredirect = () => {
        const csrftoken = getCookie('csrftoken');
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        }
        const data = {
            key: 'null',
            check_login: is_authenticated,
            destination: 'log'
        }

        axios.post("/frontend-api/hub-redirect", data, config)
            .then((response) => {
                console.log(response.data.redirect_link)
                navigate(response.data.redirect_link);
            }).catch(error => {

            });


    }
    return (
        <List>
            <ListItemButton disabled sx={{ height: 38 }} onClick={() => { }}>
                <ListItemIcon>
                    <HistoryEduIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{
                    fontWeight: 'medium',
                    variant: 'body2',
                }} primary="Your Templates" />
            </ListItemButton>
            <ListItemButton sx={{ height: 38 }} disabled onClick={() => { }}>
                <ListItemIcon>
                    <RuleIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{
                    fontWeight: 'medium',
                    variant: 'body2',
                }} primary="Your Oauth 2 Access Token(s)" />
            </ListItemButton>
            <ListItemButton sx={{ height: 38 }} onClick={() => { logredirect() }}>
                <ListItemIcon>
                    <StorageIcon />
                </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{
                        fontWeight: 'medium',
                        variant: 'body2',
                    }}
                    primary="Your Logs" />
            </ListItemButton>
            <ListItemButton sx={{ height: 38 }} disabled >
                <ListItemIcon>
                    <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{
                    fontWeight: 'medium',
                    variant: 'body2',
                }} primary="Your Payment History" />
            </ListItemButton>
            <ListItemButton sx={{ height: 38 }} disabled onClick={() => { }}>
                <ListItemIcon>
                    <SavingsIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{
                    fontWeight: 'medium',
                    variant: 'body2',
                }} primary="Cost Monitoring" />
            </ListItemButton>
            <ListItemButton sx={{ height: 38 }} onClick={() => { log_out_(setIsAuthenticated) }}>
                <ListItemIcon>
                    <LogoutIcon color="error" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{
                    fontWeight: 'medium',
                    variant: 'body2',
                    style: {
                        color: "#f44336",

                    }
                }} primary="Log Out" />
            </ListItemButton>
        </List>

    )
}

export const VerticalNav = () => {
    return (
        <List>
            <ListItemButton component={Link} href="/frontend/key-management">
                <ListItemIcon>
                    <KeyIcon />
                </ListItemIcon>
                <ListItemText primary="Key & Credit" />
            </ListItemButton>
            <Divider component="li" />
            <ListItemButton button component={Link} href="/frontend/api/docs">
                <ListItemIcon>
                    <ApiIcon />
                </ListItemIcon>
                <ListItemText primary="APIs" />
            </ListItemButton>
            <Divider component="li" />
            <ListItemButton button component={Link} href="/frontend/hub">
                <ListItemIcon>
                    <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Chatbots & Agents" />
            </ListItemButton>
            <Divider component="li" />
            <ListItemButton button component={Link} href="/frontend/manual/key">
                <ListItemIcon>
                    <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Manual" />
            </ListItemButton>
            <Divider component="li" />
            <ListItemButton button component={Link} href="/frontend/model">
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Available Models" />
            </ListItemButton>
            <Divider component="li" />
            <ListItemButton button component={Link} href="https://construction.professorparakeet.com/">
                <ListItemIcon>
                    <PrecisionManufacturingIcon />
                </ListItemIcon>
                <ListItemText primary="Construction Zone" />
            </ListItemButton>
            <Divider component="li" />
            <ListItemButton button component={Link} href="/frontend/contact">
                <ListItemIcon>
                    <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
            </ListItemButton>
        </List>
    )
};

