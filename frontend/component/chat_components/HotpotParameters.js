import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiInput from '@mui/material/Input';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from "react";
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { swap_template } from './chatUtils';
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

export const HotpotParameter = ({
    template_list,
    setUseMemory,
    setUseMemoryCurrent,
    usememory,
    usememorycurrent,
    setDuplicateMessage,
    choosen_chat_model,
    choosen_template,
    setChoosenTemplate,
    setChoosenChatModel,
    choosen_agent_model,
    setChoosenAgentModel,
    mode,
    setMode,
    top_k,
    setTopk,
    top_p,
    setTopp,
    temperature,
    setTemperature,
    bestof,
    setBestof,
    lengthpenalty,
    setLengthPenalty,
    frequencypenalty,
    setFrequencyPenalty,
    presencepenalty,
    setPresencePenalty,
    beam, 
    setBeam,
    max_tokens, 
    setMaxToken,
    model_objects,
    agent_objects,
    earlystopping,
    setEarlyStopping,
    socket_destination,
    setSocketDestination,
    max_turn,
    setMaxTurn,
    agent_websocket
}) => {
    const { t } = useTranslation();
    const toggleMemory = (value, memory_type) => {
        if (memory_type == "usememory" && value) {
            setUseMemory(value)
            setUseMemoryCurrent(!value)
        }
        else if (memory_type == "usememorycurrent" && value) {
            setUseMemory(!value)
            setUseMemoryCurrent(value)
        }
        else {
            setUseMemory(false)
            setUseMemoryCurrent(false)
        }
    }
    return (
        <Stack direction='column' spacing={0}>
            <Stack direction='column' spacing={1}>
                <FormControl defaultValue="">
                    <InputLabel id="model-label">Backends</InputLabel>
                    <Select
                        labelId="socket-label"
                        id="socket-select"
                        onChange={e => setSocketDestination(e.target.value)}
                        value={socket_destination}
                        label="Backends"
                        size="small"
                    >
                        <MenuItem key={"none_async"} value={"none_async"}>Celery Backend</MenuItem>
                        <MenuItem key={"async"} value={"async"}>Async Backend</MenuItem>
                    </Select>
                </FormControl>
                <FormControl  >
                    <InputLabel id="model-label">Chat Models</InputLabel>
                    <Select
                        labelId="model-label"
                        id="model-select"
                        onChange={e => setChoosenChatModel(e.target.value)}
                        value={choosen_chat_model}
                        label="Models"
                        size="small"
                    >
                        {agent_objects.map((agent_object_) => {
                            return (
                                <MenuItem key={agent_object_.name} value={agent_object_.name}>{agent_object_.name}</MenuItem>
                            )
                        })}
                        {model_objects.map((model_object_) => {
                            return (
                                <MenuItem key={model_object_.name} value={model_object_.name}>{model_object_.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl  >
                    <InputLabel id="model-label">Agent Models</InputLabel>
                    <Select
                        labelId="model-label"
                        id="model-select"
                        onChange={e => setChoosenAgentModel(e.target.value)}
                        value={choosen_agent_model}
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
                <FormControl >
                    <InputLabel id="agent-label">Agents</InputLabel>
                    <Select
                        labelId="agent-label"
                        id="agent-select"
                        onChange={e => { setChoosenTemplate(e.target.value); swap_template(e.target.value, 'system', agent_websocket) }}
                        value={choosen_template}
                        label="Agents"
                        size="small"
                    >
                        {template_list.map((template) => {
                            return (
                                <MenuItem key={template.name} value={template.name}>{template.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Stack>
            <Box mt={1}>
                <FormLabel id="demo-radio-buttons-group-label">Parameters</FormLabel>
            </Box>
            <Box ml={1}>
                <FormControlLabel control={<Switch defaultChecked onChange={e => setDuplicateMessage(e.target.checked)} />} label="Duplicate Message" />
            </Box>
            <Stack direction='row' spacing={1}>
                <FormControlLabel control={<Switch checked={usememory} onChange={e => toggleMemory(e.target.checked, "usememory")} />} label="Use Memory (All)" />
                <Box>
                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                        {t('parameter_explain.use_memory')}
                    </div>} arrow placement="top">
                        <IconButton size="small">
                            <HelpIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Stack>
            <Stack direction='row' spacing={1}>
                <FormControlLabel control={<Switch checked={usememorycurrent} onChange={e => toggleMemory(e.target.checked, "usememorycurrent")} />} label="Use Memory (Current)" />
                <Box>
                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                        {t('parameter_explain.use_memory_current')}
                    </div>} arrow placement="top">
                        <IconButton size="small">
                            <HelpIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Stack>
            <RadioGroup
                defaultValue="chat"
                name="radio-buttons-group"
                onChange={e => setMode(e.target.value)}
                value={mode}
            >
                <FormControlLabel key="chat" value='chat' control={<Radio size="small" />} label="Chat Bot Mode" />
                <FormControlLabel key="generate" value='generate' control={<Radio size="small" />} label="Text Completion" />
                <Divider></Divider>

            </RadioGroup>
            <Stack direction="row" spacing={1}>
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
                        min: 1,
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
            <Stack direction="row" spacing={1}>
                <Typography style={{ flex: 1 }} gutterBottom>Top_k
                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                        {t('parameter_explain.top_k')}
                    </div>} arrow placement="top">
                        <IconButton size="small">
                            <HelpIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <SmallInput
                    value={top_k}
                    size="small"
                    onChange={(event) => setTopk(event.target.value === '' ? 0 : Number(event.target.value))}
                    onBlur={handleBlur(top_k, setTopk, -1, 100)}
                    inputProps={{
                        step: 1,
                        min: -1,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Stack>
            <Slider
                defaultValue={-1}
                step={1}
                min={-1}
                max={100}
                valueLabelDisplay="off"
                onChange={e => setTopk(e.target.value)}
                value={top_k}
            />
            {agent_objects.map((agent_object_) => {
                if (agent_object_.name == choosen_chat_model) {
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
            {model_objects.map((model_object_) => {
                if (model_object_.name == choosen_chat_model) {
                    return (
                        <Box key={model_object_.name}>
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
                                    value={max_tokens}
                                    size="small"
                                    onChange={(event) => setMaxToken(event.target.value === '' ? 0 : Number(event.target.value))}
                                    onBlur={handleBlur(max_tokens, setMaxToken, 1, model_object_.context_length)}
                                    inputProps={{
                                        step: 1,
                                        min: 1,
                                        max: model_object_.context_length,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            </Stack>
                            <Slider
                                defaultValue={1024}
                                step={1}
                                min={1}
                                max={model_object_.context_length}
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
            <Divider></Divider>
            <Stack direction="row" spacing={1}>
                <FormControlLabel control={<Switch
                    onChange={e => setBeam(e.target.checked)}
                    value={beam}
                />} label="Beam Search" />
                <Box>
                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                        {t('parameter_explain.beam')}
                    </div>} arrow placement="top">
                        <IconButton size="small">
                            <HelpIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
                <FormControlLabel control={<Switch
                    onChange={e => setEarlyStopping(e.target.checked)}
                    value={earlystopping}
                />} label="Early Stopping" />
                <Box>
                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                        {t('parameter_explain.early_stopping')}
                    </div>} arrow placement="top">
                        <IconButton size="small">
                            <HelpIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
                <Typography style={{ flex: 1 }} gutterBottom>Best_of
                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                        {t('parameter_explain.best_of')}
                    </div>} arrow placement="top">
                        <IconButton size="small">
                            <HelpIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <SmallInput
                    value={bestof}
                    size="small"
                    onChange={(event) => setBestof(event.target.value === '' ? 0 : Number(event.target.value))}
                    onBlur={handleBlur(bestof, setBestof, 1, 5)}
                    inputProps={{
                        step: 1,
                        min: 1,
                        max: 5,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Stack>

            <Slider
                onChange={e => setBestof(e.target.value)}
                value={bestof}
                marks
                defaultValue={2}
                step={1}
                min={1}
                max={5}
                valueLabelDisplay="off"
            />
            <Stack direction="row" spacing={1}>
                <Typography style={{ flex: 1 }} gutterBottom>Length penalty
                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>
                        {t('parameter_explain.length_penalty')}
                    </div>} arrow placement="top">
                        <IconButton size="small">
                            <HelpIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <SmallInput
                    value={lengthpenalty}
                    size="small"
                    onChange={(event) => setLengthPenalty(event.target.value === '' ? 0 : Number(event.target.value))}
                    onBlur={handleBlur(lengthpenalty, setLengthPenalty, -2, 2)}
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
                onChange={e => setLengthPenalty(e.target.value)}
                value={lengthpenalty}
                defaultValue={0}
                step={0.01}
                min={-2}
                max={2}
                valueLabelDisplay="off"
            />
        </Stack>
    )
}

HotpotParameter.propTypes = {
    template_list: PropTypes.array.isRequired,
    setUseMemory: PropTypes.func.isRequired,
    setUseMemoryCurrent: PropTypes.func.isRequired,
    usememory: PropTypes.bool.isRequired,
    usememorycurrent: PropTypes.bool.isRequired,
    setDuplicateMessage: PropTypes.func.isRequired,
    choosen_chat_model: PropTypes.string.isRequired,
    choosen_template: PropTypes.string.isRequired,
    setChoosenTemplate: PropTypes.func.isRequired,
    setChoosenChatModel: PropTypes.func.isRequired,
    choosen_agent_model: PropTypes.string.isRequired,
    setChoosenAgentModel: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    setMode: PropTypes.func.isRequired,
    top_k: PropTypes.number.isRequired,
    setTopk: PropTypes.func.isRequired,
    top_p: PropTypes.number.isRequired,
    setTopp: PropTypes.func.isRequired,
    temperature: PropTypes.number.isRequired,
    setTemperature: PropTypes.func.isRequired,
    bestof: PropTypes.number.isRequired,
    setBestof: PropTypes.func.isRequired,
    lengthpenalty: PropTypes.number.isRequired,
    setLengthPenalty: PropTypes.func.isRequired,
    frequencypenalty: PropTypes.number.isRequired,
    setFrequencyPenalty: PropTypes.func.isRequired,
    presencepenalty: PropTypes.number.isRequired,
    setPresencePenalty: PropTypes.func.isRequired,
    beam: PropTypes.number.isRequired,
    setBeam: PropTypes.func.isRequired,
    max_tokens: PropTypes.number.isRequired,
    setMaxToken: PropTypes.func.isRequired,
    model_objects: PropTypes.array.isRequired,
    agent_objects: PropTypes.array.isRequired,
    earlystopping: PropTypes.bool.isRequired,
    setEarlyStopping: PropTypes.func.isRequired,
    socket_destination: PropTypes.string.isRequired,
    setSocketDestination: PropTypes.func.isRequired,
    agent_websocket: PropTypes.object.isRequired,
    max_turn: PropTypes.number.isRequired,
    setMaxTurn: PropTypes.func.isRequired,
};