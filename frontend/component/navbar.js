import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button as BaseButton } from '@mui/base/Button';
import { Link } from "react-router-dom";
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import Constant_Colours from './color.js'
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import VerticalNav from './vertical_nav.js';
const blue = Constant_Colours.blue;
const grey = Constant_Colours.grey;
const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 80px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  z-index: 1;
  `,
);
const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `,
);
const NavLink = styled(Link)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    text-decoration: none;
    width:100%;
    cursor: pointer;
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    &.active {
        color: #4d4dff;
    }
`
);
const Button = styled(BaseButton)(
  ({ theme }) => `
  font-size: 14px;
  line-height: 1;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;
  border: 0px;
  background: transparent;
  color: ${theme.palette.mode === 'dark' ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `,
);
const AppBarColored = styled(AppBar)(
  ({ theme }) => `
  background: ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(0, 0, 0, 0.04)'};
  color: ${theme.palette.mode === 'dark' ? 'white' : 'black'};
  border-bottom: 1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : grey[200]};
  backdrop-filter: blur(20px); 
  `,
);
const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  margin: 5px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `,
);
function ResponsiveAppBar() {
  const navigate = useNavigate();
  const redirect = (e) => {
    if (e.target.value == "key-management") {
      navigate('/frontend/key-management');
    }
    else if (e.target.value == "contact") {
      navigate('/frontend/contact');
    }
  };
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <VerticalNav />
    </Box>
  );
  return (

    <AppBarColored position="sticky" >
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Inference
          </Typography>

          <Dropdown>
            <MenuButton sx={{ display: { xs: 'none', sm: 'block' } }}>Information</MenuButton>
            <Menu slots={{ listbox: Listbox }}>
              <MenuItem> <NavLink to="/">Introduction</NavLink></MenuItem>
              <MenuItem> <NavLink to="/frontend/manual/key">Manual</NavLink></MenuItem>
              <MenuItem> <NavLink to="/frontend/model">Model</NavLink></MenuItem>
            </Menu>
          </Dropdown>
          <Dropdown>
            <MenuButton sx={{ display: { xs: 'none', sm: 'block' } }}>Modes</MenuButton>
            <Menu slots={{ listbox: Listbox }}>
              <MenuItem ><NavLink to="/frontend/hub">Chat & Log</NavLink></MenuItem>
              <MenuItem ><NavLink to="/api/docs">API Docs</NavLink></MenuItem>
            </Menu>
          </Dropdown>


          <Button
            key='key-management'
            value='key-management'
            onClick={(e) => redirect(e)}
            sx={{
              textDecoration: 'none',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Key & Credit
          </Button>
          <Button
            key='contact'
            value ='contact'
            onClick={(e) => redirect(e)}
            sx={{
              textDecoration: 'none',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Contact
          </Button>
        </Toolbar>
      </Container>
    </AppBarColored>
  );
}
export default ResponsiveAppBar;