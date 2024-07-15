import * as React from 'react';

import Box from '@mui/material/Box';
import PropTypes from 'prop-types'
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

export default function IntroductionVerticalLinearStepper({t}) {

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper orientation="vertical">
        {t('introduction.stepper', { returnObjects: true }).map((step) => (
          <Step expanded={true} active={true} key={step.label}>
            <StepLabel>
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography sx={{ whiteSpace: "pre-wrap" }}>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>

    </Box>
  );
}

IntroductionVerticalLinearStepper.propTypes = {
  t: PropTypes.func,
}