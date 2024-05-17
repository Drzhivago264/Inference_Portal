import * as React from 'react';
import { useContext } from "react";
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
import { VerticalNav, UserVeticalNav } from './vertical_nav.js';
const blue = Constant_Colours.blue;
const grey = Constant_Colours.grey;
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Avatar from '@mui/material/Avatar';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { ColorModeContext, UserContext } from '../App.js'
import { Divider, Stack } from '@mui/material';
import Badge from '@mui/material/Badge';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
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
  padding-bottom: 10px;
  padding-left: 8px;
  padding-right: 8px;
  max-height: 40px;
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

const AvatarWithHover = styled(Avatar)(
  ({ theme }) => `
  &:hover {
    -webkit-filter: brightness(70%);
    -webkit-transition: all 0.1s ease;
    -moz-transition: all 0.1s ease;
    -o-transition: all 0.1s ease;
    -ms-transition: all 0.1s ease;
    transition: all 0.1s ease;
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
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
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [destination, setDestination] = React.useState(null)
  React.useEffect(() => {
    if (destination) {
      navigate(destination, { replace: true })
    }
  }, [destination]);

  const redirect = (e) => {
    navigate(`/frontend/${e.target.value}`);
  };
  const [open, setOpen] = React.useState(false);
  const [useropen, setUserOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const toggleUserDrawer = (newOpen) => () => {
    setUserOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <VerticalNav />
    </Box>
  );
  const UserDrawerList = (
    <Box sx={{ width: 320 }} role="presentation" onClick={toggleUserDrawer(false)}>
      <UserVeticalNav navigate={setDestination} />
    </Box>
  );
  const { colorMode, mode, theme } = useContext(ColorModeContext);
  const { is_authenticated, setIsAuthenticated, user_hashed_key, user_key_name } = useContext(UserContext);
  const getUserAvatarURL = (user_hashed_key) => {
    if (!user_hashed_key) return '';
    return `https://www.gravatar.com/avatar/${user_hashed_key}?s=256&d=identicon&r=PG&f=y&so-version=2`;
  };
  return (
    <AppBarColored position="sticky" elevation={0}>
      <Drawer size="md"
        variant="outlined" open={open} onClose={toggleDrawer(false)}>
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
              <MenuItem ><NavLink to="/frontend/api/docs">API Docs</NavLink></MenuItem>
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
            value='contact'
            onClick={(e) => redirect(e)}
            sx={{
              textDecoration: 'none',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Contact
          </Button>

          {!is_authenticated &&
            <Stack direction='row' sx={{ marginLeft: "auto" }}>
              <Box mt={0.5}>
                <Button
                  key='login'
                  value='login'
                  onClick={(e) => redirect(e)}
                  sx={{
                    textDecoration: 'none',
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  Login
                </Button>
              </Box>
              <Box>
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
            </Stack>
          }
          {is_authenticated &&
            <Stack direction='row' spacing={1} sx={{ marginLeft: "auto" }}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <AvatarWithHover src={getUserAvatarURL(user_hashed_key)} sx={{ width: 38, height: 38, cursor: 'pointer' }} onClick={toggleUserDrawer(true)} style={{ border: '1px solid lightgray' }} >
                </AvatarWithHover>
              </StyledBadge>
              <Box>
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
            </Stack>
          }
          <Drawer size="md"
            variant="outlined"
            anchor='right' open={useropen} onClose={toggleUserDrawer(false)}>
            <Stack direction='row' sx={{ display: "flex", justifyContent: "space-between" }}>
              <Stack direction='row' sx={{ display: "flex", justifyContent: "space-between" }} mt={1.5} ml={1.5} mr={1.5} >
                <AvatarWithHover src={getUserAvatarURL(user_hashed_key)} sx={{ width: 38, height: 38, cursor: 'pointer' }} style={{ border: '1px solid lightgray' }} >
                </AvatarWithHover>
                <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '11rem' }}>
                  <Typography m={1.2} sx={{ fontWeight: 'bold' }} noWrap variant='body1'>
                    Parent Key: {user_key_name}
                  </Typography>
                </div>
              </Stack>
              <DrawerHeader>
                <IconButton onClick={toggleUserDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </DrawerHeader>
            </Stack>
            <Divider />
            {UserDrawerList}
          </Drawer>


        </Toolbar>
      </Container>
    </AppBarColored >
  );
}
export default ResponsiveAppBar;