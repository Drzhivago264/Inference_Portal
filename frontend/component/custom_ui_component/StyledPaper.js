import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	...theme.typography.body2,
}));

export default StyledPaper;
