import { FormControl, FormLabel } from '@mui/material';

import Box from '@mui/material/Box';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiInput from '@mui/material/Input';
import React from "react";
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const SmallInput = styled(MuiInput)`
  max-width: 50px;
  
`;
const BigInput = styled(MuiInput)`
  max-width: 60px;
`;
const handleBlur = (value, hook, min, max) => {
    if (value) {
        if (value < min) {
            hook(min);
        } else if (value > max) {
            hook(max);
        }
    }
};
export const OpenAPIParameter = ({
    choosen_model,
    setChoosenModel,
    frequencypenalty,
    setFrequencyPenalty,
    presencepenalty,
    setPresencePenalty,
    agent_objects,
    top_p,
    setTopp,
    temperature,
    setTemperature,
    max_tokens,
    setMaxToken,
    max_turn,
    setMaxTurn }) => {
    const { t, i18n } = useTranslation();
    return (
        <Stack direction='column' spacing={0}>
            <FormControl  >
                <InputLabel id="model-label">Models</InputLabel>
                <Select
                    labelId="model-label"
                    id="model-select"
                    onChange={e => setChoosenModel(e.target.value)}
                    value={choosen_model}
                    label="Models"
                    size="small"
                >
                    {agent_objects.map((agent_object_) => {
                        return (
                            <MenuItem key={agent_object_.name} value={agent_object_.name}>{agent_object_.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <Box mt={1}>
                <FormLabel >Parameters</FormLabel>
            </Box>
            {max_turn &&
                <Box><Stack direction="row" spacing={1}>
                    <Typography style={{ flex: 1 }} gutterBottom>Max_turns
                        <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                            {t('parameter_explain.max_turn')}
                        </div>} arrow placement="top">
                            <IconButton size="small">
                                <HelpIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <SmallInput
                        value={max_turn}
                        size="small"
                        onChange={(event) => setMaxTurn(event.target.value === '' ? 0 : Number(event.target.value))}
                        onBlur={handleBlur(max_turn, setMaxTurn, 1, 10)}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 10,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />

                </Stack>
                    <Slider
                        step={1}
                        min={1}
                        max={10}
                        marks
                        valueLabelDisplay="off"
                        onChange={e => setMaxTurn(e.target.value)}
                        value={max_turn}
                    />
                </Box>}

            <Stack direction="row" spacing={1}>
                <Typography style={{ flex: 1 }} gutterBottom>Top_p
                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                        {t('parameter_explain.top_p')}
                    </div>} arrow placement="top">
                        <IconButton size="small">
                            <HelpIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <SmallInput
                    value={top_p}
                    size="small"
                    onChange={(event) => setTopp(event.target.value === '' ? 0 : Number(event.target.value))}
                    onBlur={handleBlur(top_p, setTopp, 0, 1)}
                    inputProps={{
                        step: 0.01,
                        min: 0,
                        max: 1,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Stack>
            <Slider
                step={0.01}
                min={0}
                max={1}
                valueLabelDisplay="off"
                onChange={e => setTopp(e.target.value)}
                value={top_p}
            />
            {agent_objects.map((agent_object_) => {
                if (agent_object_.name == choosen_model) {
                    return (
                        <Box key={agent_object_.name}>
                            <Stack direction="row" spacing={1}>
                                <Typography style={{ flex: 1 }} gutterBottom>Max_tokens
                                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                                        {t('parameter_explain.max_token')}
                                    </div>} arrow placement="top">
                                        <IconButton size="small">
                                            <HelpIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                                <BigInput
                                    value={!max_tokens ? agent_object_.context_length : max_tokens}
                                    size="small"
                                    onChange={(event) => setMaxToken(event.target.value === '' ? 0 : Number(event.target.value))}
                                    onBlur={handleBlur(max_tokens, setMaxToken, 1, agent_object_.context_length)}
                                    inputProps={{
                                        step: 1,
                                        min: 1,
                                        max: agent_object_.context_length,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            </Stack>
                            <Slider
                                step={1}
                                min={1}
                                max={agent_object_.context_length}
                                onChange={e => setMaxToken(e.target.value)}
                                value={max_tokens}
                                valueLabelDisplay="off"
                            />
                        </Box>
                    )
                }
            })}
            <Stack direction="row" spacing={1}>
                <Typography style={{ flex: 1 }} gutterBottom>Temperature
                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                        {t('parameter_explain.temperature')}
                    </div>} arrow placement="top">
                        <IconButton size="small">
                            <HelpIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <SmallInput
                    value={temperature}
                    size="small"
                    onChange={(event) => setTemperature(event.target.value === '' ? 0 : Number(event.target.value))}
                    onBlur={handleBlur(temperature, setTemperature, 0, 1)}
                    inputProps={{
                        step: 0.01,
                        min: 0,
                        max: 1,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Stack>
            <Slider
                defaultValue={0.73}
                step={0.01}
                min={0}
                max={1}
                onChange={e => setTemperature(e.target.value)}
                value={temperature}
                valueLabelDisplay="off"
            />
            <Stack direction="row" spacing={1}>
                <Typography style={{ flex: 1 }} gutterBottom>Presence penalty
                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                        {t('parameter_explain.presence_penalty')}
                    </div>} arrow placement="top">
                        <IconButton size="small">
                            <HelpIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <SmallInput
                    value={presencepenalty}
                    size="small"
                    onChange={(event) => setPresencePenalty(event.target.value === '' ? 0 : Number(event.target.value))}
                    onBlur={handleBlur(presencepenalty, setPresencePenalty, -2, 2)}
                    inputProps={{
                        step: 0.01,
                        min: -2,
                        max: 2,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Stack>
            <Slider
                aria-label="Small steps"
                defaultValue={0}
                step={0.01}
                min={-2}
                max={2}
                onChange={e => setPresencePenalty(e.target.value)}
                value={presencepenalty}
                valueLabelDisplay="off"
            />
            <Stack direction="row" spacing={1}>
                <Typography style={{ flex: 1 }} gutterBottom>Frequency penalty
                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                        {t('parameter_explain.frequency_penalty')}
                    </div>} arrow placement="top">
                        <IconButton size="small">
                            <HelpIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <SmallInput
                    value={frequencypenalty}
                    size="small"
                    onChange={(event) => setFrequencyPenalty(event.target.value === '' ? 0 : Number(event.target.value))}
                    onBlur={handleBlur(frequencypenalty, setFrequencyPenalty, -2, 2)}
                    inputProps={{
                        step: 0.01,
                        min: -2,
                        max: 2,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Stack>
            <Slider
                aria-label="Small steps"
                defaultValue={0}
                step={0.01}
                min={-2}
                max={2}
                onChange={e => setFrequencyPenalty(e.target.value)}
                value={frequencypenalty}
                valueLabelDisplay="off"
            />
        </Stack >)
}