import {MenuItem as BaseMenuItem, menuItemClasses} from "@mui/base/MenuItem";
import {ColorModeContext, UserContext, WebSocketContext} from "../../App.js";
import React, {useContext, useEffect, useState} from "react";
import {UserVeticalNav, VerticalNav} from "./VerticalNav.js";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import {Button as BaseButton} from "@mui/base/Button";
import {MenuButton as BaseMenuButton} from "@mui/base/MenuButton";
import Box from "@mui/material/Box";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloseIcon from "@mui/icons-material/Close";
import Constant_Colours from "../color.js";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import {Dropdown} from "@mui/base";
import Fade from "@mui/material/Fade";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Jdenticon from "react-jdenticon";
import {Link} from "react-router-dom";
import {Menu} from "@mui/base/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import {MenuItem} from "@mui/base/MenuItem";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import i18next from "i18next";
import {styled} from "@mui/system";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const blue = Constant_Colours.blue;
const grey = Constant_Colours.grey;

const Listbox = styled("ul")(
	({theme}) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 80px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"};
  z-index: 1;
  `
);
const MenuItem_DropBox = styled(BaseMenuItem)(
	({theme}) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }
  z-index: 999;
  &:focus {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
  `
);
const NavLink = styled(Link)(
	({theme}) => `
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 10;
    width:100%;
    cursor: pointer;
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    &.active {
        color: #4d4dff;
    }
`
);
const Button = styled(BaseButton)(
	({theme}) => `
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
  color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
    outline: none;
  }
  `
);

const AvatarWithHover = styled(Avatar)(
	`
  background: #CCC;
  &:hover {
    -webkit-filter: brightness(70%);
    -webkit-transition: all 0.1s ease;
    -moz-transition: all 0.1s ease;
    -o-transition: all 0.1s ease;
    -ms-transition: all 0.1s ease;
    transition: all 0.1s ease;
  }
  `
);

const AppBarColored = styled(AppBar)(
	({theme}) => `
  background: ${theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.25)" : "rgba(255,255,255, 0.15)"};
  color: ${theme.palette.mode === "dark" ? "white" : "black"};
  border-bottom: 1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.25)"};
  backdrop-filter: blur(20px); 
  `
);

const StyledBadge = styled(Badge)(({theme}) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""',
		},
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1,
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0,
		},
	},
}));
const MenuButton = styled(BaseMenuButton)(
	({theme}) => `
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
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
    outline: none;
  }
  `
);
const DrawerHeader = styled("div")(({theme}) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

function ResponsiveAppBar({max_width, timeout = 0}) {
	const navigate = useNavigate();
	const [destination, setDestination] = useState(null);
	const [default_language, setDefaultLanguage] = useState(i18next.language);
	const {t, i18n} = useTranslation();

	useEffect(() => {
		if (destination) {
			navigate(destination);
		}
	}, [destination]);

	const redirect = (e) => {
		navigate(`/frontend/${e.target.value}`);
	};
	const handleChangeLanguage = (lang) => {
		setDefaultLanguage(lang);
		i18n.changeLanguage(lang);
	};
	const [open, setOpen] = useState(false);
	const [useropen, setUserOpen] = useState(false);
	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};
	const toggleUserDrawer = (newOpen) => () => {
		setUserOpen(newOpen);
	};
	const DrawerList = (
		<Box sx={{width: 250}} role='presentation' onClick={toggleDrawer(false)}>
			<VerticalNav navigate={setDestination} />
		</Box>
	);
	const UserDrawerList = (
		<Box sx={{width: 320}} role='presentation' onClick={toggleUserDrawer(false)}>
			<UserVeticalNav navigate={setDestination} />
		</Box>
	);
	const {colorMode, theme} = useContext(ColorModeContext);
	const {is_authenticated, user_key_name} = useContext(UserContext);
	const {websocket_hash} = useContext(WebSocketContext);
	return (
		<Fade in={true} timeout={timeout}>
			<AppBarColored position='sticky' elevation={0}>
				<Drawer size='md' variant='outlined' open={open} onClose={toggleDrawer(false)}>
					{DrawerList}
				</Drawer>
				<Container maxWidth={max_width}>
					<Toolbar disableGutters>
                        
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							sx={{
								mr: 2,
								display: {
									xs: "block",
									sm: "block",
									md: "none",
								},
							}}
							onClick={toggleDrawer(true)}>
							<MenuIcon />
						</IconButton>
						<Avatar
							alt='logo'
							src='https://static.professorparakeet.com/image/android-chrome-192x192.png'
							onClick={() => {
								navigate("/");
							}}
							sx={{width: 42, height: 42}}
							variant='rounded'
						/>
						<Typography
							variant='h6'
							noWrap
							component='a'
							onClick={() => {
								navigate("/");
							}}
							sx={{
								mr: 1,
								mt: 0.55,
								fontWeight: 700,
								color: "inherit",
								textDecoration: "none",
							}}>
							{t("navbar.Prof_Parakeet")}
						</Typography>

						<Dropdown>
							<MenuButton
								sx={{
									display: {
										xs: "none",
										sm: "none",
										md: "block",
									},
								}}>
								{t("navbar.Information")}
							</MenuButton>
							<Menu slots={{listbox: Listbox}}>
								{[
									{path: "/", label: t("navbar.Introduction")},
									{path: "/frontend/manual/key", label: t("navbar.Manual")},
									{path: "/frontend/model", label: t("navbar.Model")},
								].map((item, index) => (
									<MenuItem_DropBox key={index}>
										<NavLink to={item.path}>{item.label}</NavLink>
									</MenuItem_DropBox>
								))}
							</Menu>
						</Dropdown>
						<Dropdown>
							<MenuButton
								sx={{
									display: {
										xs: "none",
										sm: "none",
										md: "block",
									},
								}}>
								{t("navbar.Modes")}
							</MenuButton>
							<Menu slots={{listbox: Listbox}}>
								<MenuItem_DropBox>
									<NavLink to='/frontend/hub'>{t("navbar.Bots_Agents")}</NavLink>
								</MenuItem_DropBox>
								<MenuItem_DropBox>
									<NavLink to='/frontend/api/docs'>{t("navbar.API_Docs")}</NavLink>
								</MenuItem_DropBox>
							</Menu>
						</Dropdown>
						<Button
							key='key-management'
							value='key-management'
							onClick={(e) => redirect(e)}
							sx={{
								textDecoration: "none",
								display: {
									xs: "none",
									sm: "none",
									md: "block",
								},
							}}>
							{t("navbar.Manage_Key")}
						</Button>
						<Button
							key='contact'
							value='contact'
							onClick={(e) => redirect(e)}
							sx={{
								textDecoration: "none",
								display: {
									xs: "none",
									sm: "none",
									md: "block",
								},
							}}>
							{t("navbar.Contact")}
						</Button>

						<Stack direction='row' spacing={1} sx={{marginLeft: "auto"}} alignContent='center' alignItems='center'>
							<FormControl>
								<InputLabel id='select-language-label'>{t("navbar.Language")}</InputLabel>
								<Select
									labelId='select-language-label'
									id='select-language-id'
									value={default_language}
									label={t("navbar.Language")}
									onChange={(e) => handleChangeLanguage(e.target.value)}
									size='small'>
									<MenuItem value='vi'>Tiếng Việt</MenuItem>
									<MenuItem value='en'>English</MenuItem>
								</Select>
							</FormControl>
							{!is_authenticated && (
								<Box  ml={1}>
									<Button
										key='login'
										value='login'
										onClick={redirect}
										sx={{
											textDecoration: "none",
											display: {
												xs: "none",
												sm: "block",
											},
										}}>
										{t("navbar.Login")}
									</Button>
								</Box>
							)}
							<StyledBadge
								overlap='circular'
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								variant='dot'
                 
								sx={{display: is_authenticated ? "block" : "none"}}>
								<AvatarWithHover
									sx={{
										width: 38,
										height: 38,
										cursor: "pointer",
									}}
									onClick={toggleUserDrawer(true)}
									style={{
										border: "1px solid lightgray",
									}}>
									{websocket_hash && <Jdenticon size='38' value={websocket_hash} />}
								</AvatarWithHover>
							</StyledBadge>
							<Box sx={{display: is_authenticated ? "none" : "block"}}>
								<IconButton aria-label='color-mode' onClick={colorMode.toggleColorMode} color='inherit'>
									{theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
								</IconButton>
							</Box>
							<Box sx={{display: is_authenticated ? "block" : "none"}}>
								<IconButton onClick={colorMode.toggleColorMode} color='inherit'>
									{theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
								</IconButton>
							</Box>
						</Stack>
						<Drawer size='md' variant='outlined' anchor='right' open={useropen} onClose={toggleUserDrawer(false)}>
							<Stack
								direction='row'
								sx={{
									display: "flex",
									justifyContent: "space-between",
								}}
  
                                >
								<Stack pl={1} direction='row' spacing={1} alignContent='center' alignItems='center'>
									<AvatarWithHover
										sx={{
											width: 38,
											height: 38,
											cursor: "pointer",                         
										}}
                                      
										style={{
											border: "1px solid lightgray",
										}}>
										{websocket_hash && <Jdenticon size='38' value={websocket_hash} />}
									</AvatarWithHover>
									<div
										style={{
											overflow: "hidden",
											textOverflow: "ellipsis",
											width: "11rem",
                                            paddingTop: '5px'
										}}>
										<Typography  sx={{fontWeight: "bold"}} noWrap variant='body1'>
											{user_key_name}
										</Typography>
									</div>
								</Stack>
								<DrawerHeader>
									<IconButton size="small" onClick={toggleUserDrawer(false)}>
										<CloseIcon />
									</IconButton>
								</DrawerHeader>
							</Stack>
							<Divider />
							{UserDrawerList}
						</Drawer>
					</Toolbar>
				</Container>
			</AppBarColored>
		</Fade>
	);
}
ResponsiveAppBar.propTypes = {
	max_width: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
	timeout: PropTypes.number,
};
export default ResponsiveAppBar;
