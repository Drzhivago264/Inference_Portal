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
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const VerticalNav = () => {
    return (
        <List>
            <ListItemButton component={Link} href="/frontend/key-management">
                <ListItemIcon>
                    <KeyIcon />
                </ListItemIcon>
                <ListItemText primary="Key & Credit" />
            </ListItemButton>
            <Divider component="li" />
            <ListItemButton button component={Link} href="#">
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
            <ListItemButton button component={Link} href="/frontend/manual">
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
            <ListItemButton>
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

export default VerticalNav;