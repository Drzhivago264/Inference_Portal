import React, { useContext } from "react";

import ApiIcon from "@mui/icons-material/Api";
import ArticleIcon from "@mui/icons-material/Article";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import InventoryIcon from "@mui/icons-material/Inventory";
import KeyIcon from "@mui/icons-material/Key";
import LayersIcon from "@mui/icons-material/Layers";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RuleIcon from "@mui/icons-material/Rule";
import SavingsIcon from "@mui/icons-material/Savings";
import StorageIcon from "@mui/icons-material/Storage";
import { UserContext } from "../../App.js";
import { useGetLogout } from "../../api_hook/useGetLogout.js";

export const UserVeticalNav = ({ navigate }) => {
	const { setIsAuthenticated, setUserKeyName, setWebsocketHash } =
		useContext(UserContext);
	const { refetch } = useGetLogout(
		setIsAuthenticated,
		setUserKeyName,
		setWebsocketHash
	);
	const log_out = () => {
		refetch();
	};
	const listItems = [
		{
			onClick: () => navigate("/frontend/prompt-writing"),
			icon: <InventoryIcon />,
			text: "Your Dataset",
			disabled: false,
		},
		{
			onClick: () => navigate("/frontend/user-instruction"),
			icon: <HistoryEduIcon />,
			text: "Your Templates",
			disabled: false,
		},
		{
			onClick: () => navigate("/frontend/token-management"),
			icon: <RuleIcon />,
			text: "Your Access Token(s)",
			disabled: false,
		},
		{
			onClick: () => navigate("/frontend/log"),
			icon: <StorageIcon />,
			text: "Your Logs",
			disabled: false,
		},
		{
			onClick: null,
			icon: <ReceiptIcon />,
			text: "Your Payment History",
			disabled: true,
		},
		{
			onClick: () => navigate("/frontend/cost-monitoring"),
			icon: <SavingsIcon />,
			text: "Cost Monitoring",
			disabled: false,
		},
		{
			onClick: () => log_out(),
			icon: <LogoutIcon color='error' />,
			text: "Log Out",
			disabled: false,
			primaryTypographyProps: {
				style: {
					color: "#f44336",
				},
			},
		},
	];
	return (
		<List>
			{listItems.map((item, index) => (
				<ListItemButton
					key={index}
					sx={{ height: 38 }}
					onClick={item.onClick}
					disabled={item.disabled}>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText
						primaryTypographyProps={{
							fontWeight: "medium",
							variant: "body2",
							...item.primaryTypographyProps,
						}}
						primary={item.text}
					/>
				</ListItemButton>
			))}
		</List>
	);
};
UserVeticalNav.propTypes = {
	navigate: PropTypes.func.isRequired,
};
export const VerticalNav = ({ navigate }) => {
	const listItems = [
		{
			redirect: "/frontend/key-management",
			icon: KeyIcon,
			text: "Manage Key",
		},
		{ redirect: "/frontend/api/docs", icon: ApiIcon, text: "APIs" },
		{ redirect: "/frontend/hub", icon: ChatIcon, text: "Inference" },
		{ redirect: "/frontend/manual/key", icon: ArticleIcon, text: "Manual" },
		{ redirect: "/frontend/model", icon: LayersIcon, text: "Models" },
		{ redirect: "/frontend/contact", icon: EmailIcon, text: "Contact Us" },
	];
	return (
		<List>
			{listItems.map((item, index) => (
				<React.Fragment key={index}>
					<ListItemButton
						onClick={() => {
							item.redirect && navigate(item.redirect);
						}}
						component={item.href && Link}
						href={item.href}>
						<ListItemIcon>
							<item.icon />
						</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItemButton>
				</React.Fragment>
			))}
		</List>
	);
};

VerticalNav.propTypes = {
	navigate: PropTypes.func.isRequired,
};
