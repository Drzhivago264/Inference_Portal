import React from "react";
import { FormControl, FormLabel } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import MuiInput from '@mui/material/Input';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

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
    return (
        <Stack direction='column' spacing={1}>
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
            <Divider></Divider>
            <FormLabel >Parameters</FormLabel>
            {max_turn &&
                <Box><Stack direction="row" spacing={1}>
                    <Typography gutterBottom>Max_turns:</Typography>
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
                <Typography gutterBottom>Top_p: </Typography>
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
                        <Box>
                            <Stack direction="row" spacing={1}>
                                <Typography gutterBottom>Max_tokens: </Typography>
                                <BigInput
                                    value={max_tokens}
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
                                defaultValue={1024}
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
                <Typography gutterBottom>Temperature: </Typography>
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
                <Typography gutterBottom>Presence penalty: </Typography>
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
                <Typography gutterBottom>Frequency penalty: </Typography>
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

export const ChatParameter = ({
    setSocketDestination,
    socket_destination,
    setUseMemory,
    choosen_model,
    setChoosenModel,
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
    beam, setBeam,
    max_tokens, setMaxToken,
    model_objects,
    agent_objects,
    earlystopping,
    setEarlyStopping
}) => {
    return (
        <FormControl fullWidth defaultValue="">
            <Stack direction='column' spacing={1}>
                <InputLabel id="model-label">Models</InputLabel>
                <Select
                    labelId="model-label"
                    id="model-select"
                    onChange={e => setChoosenModel(e.target.value)}
                    value={choosen_model}
                    label="Models"
                    size="small"
                >
                    {model_objects.map((model_object_) => {
                        return (
                            <MenuItem key={model_object_.name} value={model_object_.name}>{model_object_.name}</MenuItem>
                        )
                    })}
                    {agent_objects.map((agent_object_) => {
                        return (
                            <MenuItem key={agent_object_.name} value={agent_object_.name}>{agent_object_.name}</MenuItem>
                        )
                    })}
                </Select>
                <Divider></Divider>
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
                        <MenuItem key={"/ws/chat/"} value={"/ws/chat/"}>Celery Backend</MenuItem>
                        <MenuItem key={"/ws/chat-async/"} value={"/ws/chat-async/"}>Async Backend</MenuItem>
                    </Select>
                </FormControl>
                <Divider></Divider>
                <FormLabel id="demo-radio-buttons-group-label">Parameters</FormLabel>
                <FormControlLabel control={<Switch defaultChecked onChange={e => setUseMemory(e.target.checked)} />} label="Use Memory" />
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
                    <Typography gutterBottom>Top_p: </Typography>
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
                    <Typography gutterBottom>Top_k: </Typography>
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
                    if (agent_object_.name == choosen_model) {
                        return (
                            <Box>
                                <Stack direction="row" spacing={1}>
                                    <Typography gutterBottom>Max_tokens: </Typography>
                                    <SmallInput
                                        value={max_tokens}
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
                                    defaultValue={1024}
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
                    if (model_object_.name == choosen_model) {
                        return (
                            <Box>
                                <Typography gutterBottom>Max_tokens: {max_tokens}</Typography>
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
                    <Typography gutterBottom>Temperature: </Typography>
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
                    <Typography gutterBottom>Presence penalty: </Typography>
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
                    <Typography gutterBottom>Frequency penalty: </Typography>
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
                <Stack direction="row">
                    <FormControlLabel control={<Switch
                        onChange={e => setBeam(e.target.checked)}
                        value={beam}
                    />} label="Beam Search" />
                    <FormControlLabel control={<Switch
                        onChange={e => setEarlyStopping(e.target.checked)}
                        value={earlystopping}
                    />} label="Early Stopping" />
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Typography gutterBottom>Best_of:</Typography>
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
                    <Typography gutterBottom>Length penalty:</Typography>
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
        </FormControl>
    )
}

export const HotpotParameter = ({
    template_list,
    setUseMemory,
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
    beam, setBeam,
    max_tokens, setMaxToken,
    model_objects,
    agent_objects,
    earlystopping,
    setEarlyStopping,
    socket_destination,
    setSocketDestination,
    swap_template,
    max_turn,
    setMaxTurn
}) => {
    return (
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
                    onChange={e => { setChoosenTemplate(e.target.value); swap_template(e.target.value) }}
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

            <Divider></Divider>
            <FormLabel id="demo-radio-buttons-group-label">Parameters</FormLabel>
            <FormControlLabel control={<Switch defaultChecked onChange={e => setDuplicateMessage(e.target.checked)} />} label="Duplicate Message" />
            <FormControlLabel control={<Switch defaultChecked onChange={e => setUseMemory(e.target.checked)} />} label="Use Memory" />
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
                <Typography gutterBottom>Max_turns: </Typography>
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
                <Typography gutterBottom>Top_p: </Typography>
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
                <Typography gutterBottom>Top_k: </Typography>
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
                        <Box>
                            <Stack direction="row" spacing={1}>
                                <Typography gutterBottom>Max_tokens: </Typography>
                                <BigInput
                                    value={max_tokens}
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
                                defaultValue={1024}
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
                        <Box>
                            <Stack direction="row" spacing={1}>
                                <Typography gutterBottom>Max_tokens: </Typography>
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
                <Typography gutterBottom>Temperature: </Typography>
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
                <Typography gutterBottom>Presence penalty: </Typography>
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
                <Typography gutterBottom>Frequency penalty: </Typography>
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
            <Stack direction="row">
                <FormControlLabel control={<Switch
                    onChange={e => setBeam(e.target.checked)}
                    value={beam}
                />} label="Beam Search" />
                <FormControlLabel control={<Switch
                    onChange={e => setEarlyStopping(e.target.checked)}
                    value={earlystopping}
                />} label="Early Stopping" />
            </Stack>
            <Stack direction="row" spacing={1}>
                <Typography gutterBottom>Best_of:</Typography>
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
                <Typography gutterBottom>Length penalty:</Typography>
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


