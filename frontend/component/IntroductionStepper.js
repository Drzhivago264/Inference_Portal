import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Create an API Key',
    description: `You are not required to provide any information to generate a random Key. This key will serve as you account that allows you to interact with all of our services. We value your privacy and we want to know as little as possible about you. We are also inclusive towards all sorts of people along with their opinions (or the opinions given to them).`,
  },
  {
    label: 'Write a Good Instruction',
    description:
      'After generating an API Key, you are automatically logged in, remember to export the Key file and keep it secure. You can then click on your Avatar and navigate to "Your Template" where you can craft and test the instructions for language models.',
  },
  {
    label: 'Share Your Agents with Peers or Clients.',
    description: `When you are happy with the behaviours of the language models under your instructions, you can generate an Oauth 2 token and share it with your Peers or Clients. An Oauth 2 token allows you to configure its expired time, credit limit and right (e.g., read/write). By using Oauth 2 token you can share the access to our services to those who you trust without revealing your master key.`,
  },
  {
    label: 'Inference at Scale via API Endpoints',
    description: `When you, your team or your organisation are/is happy with the behaviour of your agents, you can automatically inference your agent(s) via our APIs and let our infrastructure automatically scaling up to meet your demand.`,
  },
  {
    label: 'Asking For Even More',
    description: `If you feel that the current language models are too restrictive towards what you want to say/hear, contact us and we can train new models together (be mindful about the price that you are willing to pay!)`,
  },
];

export default function IntroductionVerticalLinearStepper() {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper orientation="vertical">
        {steps.map((step, index) => (
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