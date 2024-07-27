import React, {useContext} from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import {UserContext} from "../../App";
import {useNavigate} from "react-router-dom";

export default function IntroductionVerticalLinearStepper({t}) {
	const {is_authenticated} = useContext(UserContext);
	const navigate = useNavigate();
	return (
		<Box sx={{maxWidth: 400}}>
			<Stepper orientation='vertical'>
				{t("introduction.stepper", {returnObjects: true}).map((step, index) => (
					<Step expanded={true} active={true} key={step.label}>
						<StepLabel>{step.label}</StepLabel>
						<StepContent>
							<Typography sx={{whiteSpace: "pre-wrap"}}>{step.description}</Typography>
							{index === 0 && (
								<Button
									variant='contained'
									disabled={is_authenticated}
									onClick={() => navigate("/frontend/key-management")}
									sx={{mt: 1, mr: 1}}>
									Get a Key
								</Button>
							)}
							{index === 1 && (
								<Button
									variant='contained'
									disabled={!is_authenticated}
									onClick={() => navigate("/frontend/user-instruction")}
									sx={{mt: 1, mr: 1}}>
									Your Template(s)
								</Button>
							)}
							{index === 2 && (
								<Button
									variant='contained'
									disabled={!is_authenticated}
									onClick={() => navigate("/frontend/token-management")}
									sx={{mt: 1, mr: 1}}>
									Create Token(s)
								</Button>
							)}
							{index === 3 && (
								<Button variant='contained' disabled={!is_authenticated} onClick={() => navigate("/frontend/api/docs")} sx={{mt: 1, mr: 1}}>
									View API Docs
								</Button>
							)}
							{index === 4 && (
								<Button
									variant='contained'
									disabled={!is_authenticated}
									onClick={() => navigate("/frontend/prompt-writing")}
									sx={{mt: 1, mr: 1}}>
									Dataset
								</Button>
							)}
						</StepContent>
					</Step>
				))}
			</Stepper>
		</Box>
	);
}

IntroductionVerticalLinearStepper.propTypes = {
	t: PropTypes.func,
};
