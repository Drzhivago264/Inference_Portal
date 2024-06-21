import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';



export default function IntroductionVerticalLinearStepper({t}) {

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper orientation="vertical">
        {t('introduction.stepper', { returnObjects: true }).map((step, index) => (
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