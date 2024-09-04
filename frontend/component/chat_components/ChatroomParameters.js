import {BigInput, SmallInput, handleBlur, toggleMemory} from "./chatParameterFunction";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

export const MemorySwitch = ({explaination, checked, memoryType, parameter, setParameterHook, label}) => {
	return (
		<Stack direction='row' spacing={1}>
			<FormControlLabel
				control={<Switch checked={checked} onChange={(e) => toggleMemory(e.target.checked, memoryType, setParameterHook, parameter)} />}
				label={label}
			/>
			<Box>
				<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{explaination}</div>} arrow placement='top'>
					<IconButton size='small'>
						<HelpIcon fontSize='small' />
					</IconButton>
				</Tooltip>
			</Box>
		</Stack>
	);
};
const SwitchParameter = ({explaination, name, display_name, value, inference_parameter, setInferenceParameter}) => {
	return (
		<Stack direction='row' spacing={1}>
			<FormControlLabel
				control={
					<Switch
						onChange={(e) =>
							setInferenceParameter({
								...inference_parameter,
								[name]: e.target.value,
							})
						}
						value={value}
					/>
				}
				label={display_name}
			/>
			<Box>
				<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{explaination}</div>} arrow placement='top'>
					<IconButton size='small'>
						<HelpIcon fontSize='small' />
					</IconButton>
				</Tooltip>
			</Box>
		</Stack>
	);
};
export const Parameter = ({
	explaination,
	marks,
	name,
	display_name,
	value,
	inference_parameter,
	setInferenceParameter,
	step,
	min,
	max,
	use_big_input = false,
}) => {
	return (
		<>
			<Stack direction='row' spacing={1}>
				<Typography style={{flex: 1}} gutterBottom>
					{display_name}
					<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{explaination}</div>} arrow placement='top'>
						<IconButton size='small'>
							<HelpIcon fontSize='small' />
						</IconButton>
					</Tooltip>
				</Typography>
				{!use_big_input && (
					<SmallInput
						value={value}
						size='small'
						onChange={(e) =>
							setInferenceParameter({
								...inference_parameter,
								[name]: e.target.value === "" ? 0 : Number(e.target.value),
							})
						}
						onBlur={handleBlur(value, name, min, max, setInferenceParameter, inference_parameter)}
						inputProps={{
							step: step,
							min: min,
							max: max,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				)}
				{use_big_input && (
					<BigInput
						value={value}
						size='small'
						onChange={(e) =>
							setInferenceParameter({
								...inference_parameter,
								[name]: e.target.value === "" ? 0 : Number(e.target.value),
							})
						}
						onBlur={handleBlur(value, name, min, max, setInferenceParameter, inference_parameter)}
						inputProps={{
							step: step,
							min: min,
							max: max,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				)}
			</Stack>
			<Slider
				step={step}
				marks={marks}
				min={min}
				max={max}
				valueLabelDisplay='off'
				onChange={(e) =>
					setInferenceParameter({
						...inference_parameter,
						[name]: e.target.value,
					})
				}
				value={value}
			/>
		</>
	);
};
export const ChatParameter = ({
	setSocketDestination,
	socket_destination,
	choosen_model,
	setChoosenModel,
	model_objects,
	agent_objects,
	inference_parameter,
	setInferenceParameter,
	room_type,
	max_turn,
	setMaxTurn,
	setDuplicateMessage,
}) => {
	const {t} = useTranslation();
	return (
		<Stack direction='column' spacing={0}>
			<Stack direction='column' spacing={1}>
				{room_type == "chat_room" && (
					<FormControl defaultValue=''>
						<InputLabel id='model-label'>Models</InputLabel>
						<Select
							labelId='model-label'
							id='model-select'
							onChange={(e) => setChoosenModel(e.target.value)}
							value={choosen_model}
							label='Models'
							size='small'>
							{model_objects.map((model_object_) => {
								return (
									<MenuItem key={model_object_.name} value={model_object_.name}>
										{model_object_.name}
									</MenuItem>
								);
							})}
							{agent_objects.map((agent_object_) => {
								return (
									<MenuItem key={agent_object_.name} value={agent_object_.name}>
										{agent_object_.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				)}

				<FormControl defaultValue=''>
					<InputLabel id='model-label'>Backends</InputLabel>
					<Select
						labelId='socket-label'
						id='socket-select'
						onChange={(e) => setSocketDestination(e.target.value)}
						value={socket_destination}
						label='Backends'
						size='small'>
						<MenuItem key={"none_async"} value={"none_async"}>
							Celery Backend
						</MenuItem>
						<MenuItem key={"async"} value={"async"}>
							Async Backend
						</MenuItem>
					</Select>
				</FormControl>
			</Stack>
			<Box sx={{display: {xs: "none", sm: "block"}}}>
				<Box mt={1}>
					<FormLabel id='demo-radio-buttons-group-label'>Parameters</FormLabel>
				</Box>
				{room_type == "hotpot_room" && (
					<Box ml={1}>
						<FormControlLabel
							control={<Switch defaultChecked onChange={(e) => setDuplicateMessage(e.target.checked)} />}
							label='Duplicate Message'
						/>
					</Box>
				)}
				<MemorySwitch
					checked={inference_parameter.usememory}
					explaination={t("parameter_explain.use_memory")}
					parameter={inference_parameter}
					setParameterHook={setInferenceParameter}
					memoryType='usememory'
					label='Use Memory (All)'
				/>
				<MemorySwitch
					checked={inference_parameter.usememorycurrent}
					explaination={t("parameter_explain.use_memory_current")}
					parameter={inference_parameter}
					setParameterHook={setInferenceParameter}
					memoryType='usememorycurrent'
					label='Use Memory (Current)'
				/>

				<RadioGroup
					defaultValue='chat'
					name='radio-buttons-group'
					onChange={(e) =>
						setInferenceParameter({
							...inference_parameter,
							mode: e.target.value,
						})
					}
					value={inference_parameter.mode}>
					<FormControlLabel key='chat' value='chat' control={<Radio size='small' />} label='Chat Bot Mode' />
					<FormControlLabel key='generate' value='generate' control={<Radio size='small' />} label='Text Completion' />
				</RadioGroup>
				{room_type == "hotpot_room" && (
					<>
						<Stack direction='row' spacing={1}>
							<Typography style={{flex: 1}} gutterBottom>
								Max_turns
								<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{t("parameter_explain.max_turn")}</div>} arrow placement='top'>
									<IconButton size='small'>
										<HelpIcon fontSize='small' />
									</IconButton>
								</Tooltip>
							</Typography>
							<SmallInput
								value={max_turn}
								size='small'
								onChange={(event) => setMaxTurn(event.target.value === "" ? 0 : Number(event.target.value))}
								onBlur={handleBlur(max_turn, setMaxTurn, 1, 10)}
								inputProps={{
									step: 1,
									min: 1,
									max: 10,
									type: "number",
									"aria-labelledby": "input-slider",
								}}
							/>
						</Stack>
						<Slider step={1} min={1} max={10} marks valueLabelDisplay='off' onChange={(e) => setMaxTurn(e.target.value)} value={max_turn} />
					</>
				)}
				<Parameter
					display_name='Top_p'
					name='top_p'
					setInferenceParameter={setInferenceParameter}
					inference_parameter={inference_parameter}
					max={1}
					min={0}
					step={0.01}
					value={inference_parameter.top_p}
					explaination={t("parameter_explain.top_p")}
					marks={false}
				/>
				<Parameter
					display_name='Top_k'
					name='top_k'
					setInferenceParameter={setInferenceParameter}
					inference_parameter={inference_parameter}
					max={100}
					min={-1}
					step={1}
					value={inference_parameter.top_k}
					explaination={t("parameter_explain.top_k")}
					marks={false}
				/>

				{agent_objects.map((agent_object_) => {
					if (agent_object_.name == choosen_model) {
						return (
							<Box key={agent_object_.name}>
								<Parameter
									display_name='Max_tokens'
									name='max_tokens'
									setInferenceParameter={setInferenceParameter}
									inference_parameter={inference_parameter}
									max={agent_object_.context_length}
									min={1}
									step={1}
									value={!inference_parameter.max_tokens ? agent_object_.context_length : inference_parameter.max_tokens}
									explaination={t("parameter_explain.max_token")}
									marks={false}
								/>
							</Box>
						);
					}
				})}
				{model_objects.map((model_object_) => {
					if (model_object_.name == choosen_model) {
						return (
							<Box key={model_object_.name}>
								<Parameter
									display_name='Max_tokens'
									name='max_tokens'
									setInferenceParameter={setInferenceParameter}
									inference_parameter={inference_parameter}
									max={model_object_.context_length}
									min={1}
									step={1}
									value={inference_parameter.max_tokens}
									explaination={t("parameter_explain.max_token")}
									marks={false}
								/>
							</Box>
						);
					}
				})}
				<Parameter
					display_name='Temperature'
					name='temperature'
					setInferenceParameter={setInferenceParameter}
					inference_parameter={inference_parameter}
					max={1}
					min={0}
					step={0.01}
					value={inference_parameter.temperature}
					explaination={t("parameter_explain.temperature")}
					marks={false}
				/>
				<Parameter
					display_name='Presence Penalty'
					name='presencepenalty'
					setInferenceParameter={setInferenceParameter}
					inference_parameter={inference_parameter}
					max={2}
					min={-2}
					step={0.01}
					value={inference_parameter.presencepenalty}
					explaination={t("parameter_explain.presence_penalty")}
					marks={false}
				/>
				<Parameter
					display_name='Frequency Penalty'
					name='frequencypenalty'
					setInferenceParameter={setInferenceParameter}
					inference_parameter={inference_parameter}
					max={2}
					min={-2}
					step={0.01}
					value={inference_parameter.frequencypenalty}
					explaination={t("parameter_explain.frequency_penalty")}
					marks={false}
				/>
				<SwitchParameter
					explaination={t("parameter_explain.beam")}
					display_name='Beam'
					name='beam'
					value={inference_parameter.beam}
					setInferenceParameter={setInferenceParameter}
					inference_parameter={inference_parameter}
				/>
				<SwitchParameter
					explaination={t("parameter_explain.early_stopping")}
					display_name='Early Stop'
					name='earlystopping'
					value={inference_parameter.earlystopping}
					setInferenceParameter={setInferenceParameter}
					inference_parameter={inference_parameter}
				/>

				<Parameter
					display_name='Best_of'
					name='bestof'
					setInferenceParameter={setInferenceParameter}
					inference_parameter={inference_parameter}
					max={5}
					min={1}
					step={1}
					value={inference_parameter.bestof}
					explaination={t("parameter_explain.best_of")}
					marks={true}
				/>
				<Parameter
					display_name='Length Penalty'
					name='lengthpenalty'
					setInferenceParameter={setInferenceParameter}
					inference_parameter={inference_parameter}
					max={2}
					min={-2}
					step={0.01}
					value={inference_parameter.lengthpenalty}
					explaination={t("parameter_explain.length_penalty")}
					marks={false}
				/>
			</Box>
		</Stack>
	);
};
ChatParameter.propTypes = {
	room_type: PropTypes.string.isRequired,
	max_turn: PropTypes.number,
	setMaxTurn: PropTypes.func,
	setSocketDestination: PropTypes.func.isRequired,
	socket_destination: PropTypes.string.isRequired,
	choosen_model: PropTypes.string.isRequired,
	setChoosenModel: PropTypes.func.isRequired,
	model_objects: PropTypes.array.isRequired,
	agent_objects: PropTypes.array.isRequired,
	inference_parameter: PropTypes.object.isRequired,
	setInferenceParameter: PropTypes.func.isRequired,
	setDuplicateMessage: PropTypes.func,
};

MemorySwitch.propTypes = {
	explaination: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	memoryType: PropTypes.string.isRequired,
	parameter: PropTypes.object.isRequired,
	setParameterHook: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
};

Parameter.propTypes = {
	use_big_input: PropTypes.bool,
	marks: PropTypes.bool.isRequired,
	explaination: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	display_name: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	step: PropTypes.number.isRequired,
	inference_parameter: PropTypes.object.isRequired,
	setInferenceParameter: PropTypes.func.isRequired,
};

SwitchParameter.propTypes = {
	explaination: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	display_name: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	inference_parameter: PropTypes.object.isRequired,
	setInferenceParameter: PropTypes.func.isRequired,
};
