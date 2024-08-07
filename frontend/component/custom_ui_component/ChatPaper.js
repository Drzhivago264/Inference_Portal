import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";

export const ChatPaper = styled(Paper)(({theme}) => ({
	height: '70vh',
	overflow: "auto",
	padding: theme.spacing(2),
	...theme.typography.body2,
}));