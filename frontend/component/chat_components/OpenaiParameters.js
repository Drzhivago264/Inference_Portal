import {BigInput, SmallInput, handleBlur} from "./chatParameterFunction";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import React from "react";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

export const OpenAPIParameter = ({
	choosen_model,
	setChoosenModel,
	agent_objects,
	max_turn,
	setMaxTurn,
	setSocketDestination,
	socket_destination,
	inference_parameter,
	setInferenceParameter,
	isToolBox,
}) => {
	const {t} = useTranslation();
	return (
		<Stack direction='column' spacing={1}>
			{!isToolBox && (
				<FormControl defaultValue=''>
					<InputLabel id='model-label'>Backends</InputLabel>
					<Select
						labelId='socket-label'
						id='socket-select'
						onChange={(e) => setSocketDestination(e.target.value)}
						value={socket_destination}
						label='Backends'
						size='small'>
						<MenuItem key={"/ws/engineer/"} value={"/ws/engineer/"}>
							Celery Backend
						</MenuItem>
						<MenuItem key={"/ws/engineer-async/"} value={"/ws/engineer-async/"}>
							Async Backend
						</MenuItem>
					</Select>
				</FormControl>
			)}
			<FormControl>
				<InputLabel id='model-label'>Models</InputLabel>
				<Select
					labelId='model-label'
					id='model-select'
					onChange={(e) => setChoosenModel(e.target.value)}
					value={choosen_model}
					label='Models'
					size='small'>
					{agent_objects.map((agent_object_) => {
						return (
							<MenuItem key={agent_object_.name} value={agent_object_.name}>
								{agent_object_.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<Box sx={{display: {xs: "none", sm: "block"}}}>
				<Box mt={1}>
					<FormLabel>Parameters</FormLabel>
				</Box>
				{max_turn && (
					<Box>
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
									min: 0,
									max: 10,
									type: "number",
									"aria-labelledby": "input-slider",
								}}
							/>
						</Stack>
						<Slider step={1} min={1} max={10} marks valueLabelDisplay='off' onChange={(e) => setMaxTurn(e.target.value)} value={max_turn} />
					</Box>
				)}

				<Stack direction='row' spacing={1}>
					<Typography style={{flex: 1}} gutterBottom>
						Top_p
						<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{t("parameter_explain.top_p")}</div>} arrow placement='top'>
							<IconButton size='small'>
								<HelpIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					</Typography>
					<SmallInput
						value={inference_parameter.top_p}
						size='small'
						onChange={(e) =>
							setInferenceParameter({
								...inference_parameter,
								top_p: e.target.value === "" ? 0 : Number(e.target.value),
							})
						}
						onBlur={handleBlur(inference_parameter.top_p, "top_p", 0, 1, setInferenceParameter, inference_parameter)}
						inputProps={{
							step: 0.01,
							min: 0,
							max: 1,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				</Stack>
				<Slider
					step={0.01}
					min={0}
					max={1}
					valueLabelDisplay='off'
					onChange={(e) =>
						setInferenceParameter({
							...inference_parameter,
							top_p: e.target.value,
						})
					}
					value={inference_parameter.top_p}
				/>
				{agent_objects.map((agent_object_) => {
					if (agent_object_.name == choosen_model) {
						return (
							<Box key={agent_object_.name}>
								<Stack direction='row' spacing={1}>
									<Typography style={{flex: 1}} gutterBottom>
										Max_tokens
										<Tooltip
											title={
												<div
													style={{
														whiteSpace: "pre-line",
													}}>
													{t("parameter_explain.max_token")}
												</div>
											}
											arrow
											placement='top'>
											<IconButton size='small'>
												<HelpIcon fontSize='small' />
											</IconButton>
										</Tooltip>
									</Typography>
									<BigInput
										value={!inference_parameter.max_tokens ? agent_object_.context_length : inference_parameter.max_tokens}
										size='small'
										onChange={(e) =>
											setInferenceParameter({
												...inference_parameter,
												max_tokens: e.target.value === "" ? 0 : Number(e.target.value),
											})
										}
										onBlur={handleBlur(
											inference_parameter.max_tokens,
											"max_tokens",
											1,
											agent_object_.context_length,
											setInferenceParameter,
											inference_parameter
										)}
										inputProps={{
											step: 1,
											min: 1,
											max: agent_object_.context_length,
											type: "number",
											"aria-labelledby": "input-slider",
										}}
									/>
								</Stack>
								<Slider
									step={1}
									min={1}
									max={agent_object_.context_length}
									onChange={(e) =>
										setInferenceParameter({
											...inference_parameter,
											max_tokens: e.target.value,
										})
									}
									value={inference_parameter.max_tokens}
									valueLabelDisplay='off'
								/>
							</Box>
						);
					}
				})}
				<Stack direction='row' spacing={1}>
					<Typography style={{flex: 1}} gutterBottom>
						Temperature
						<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{t("parameter_explain.temperature")}</div>} arrow placement='top'>
							<IconButton size='small'>
								<HelpIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					</Typography>
					<SmallInput
						value={inference_parameter.temperature}
						size='small'
						onChange={(e) =>
							setInferenceParameter({
								...inference_parameter,
								temperature: e.target.value === "" ? 0 : Number(e.target.value),
							})
						}
						onBlur={handleBlur(inference_parameter.temperature, "temperature", 0, 1, setInferenceParameter, inference_parameter)}
						inputProps={{
							step: 0.01,
							min: 0,
							max: 1,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				</Stack>
				<Slider
					defaultValue={0.73}
					step={0.01}
					min={0}
					max={1}
					onChange={(e) =>
						setInferenceParameter({
							...inference_parameter,
							temperature: e.target.value,
						})
					}
					value={inference_parameter.temperature}
					valueLabelDisplay='off'
				/>
				<Stack direction='row' spacing={1}>
					<Typography style={{flex: 1}} gutterBottom>
						Presence penalty
						<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{t("parameter_explain.presence_penalty")}</div>} arrow placement='top'>
							<IconButton size='small'>
								<HelpIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					</Typography>
					<SmallInput
						value={inference_parameter.presencepenalty}
						size='small'
						onChange={(e) =>
							setInferenceParameter({
								...inference_parameter,
								presencepenalty: e.target.value === "" ? 0 : Number(e.target.value),
							})
						}
						onBlur={handleBlur(inference_parameter.presencepenalty, "presencepenalty", -2, 2, setInferenceParameter, inference_parameter)}
						inputProps={{
							step: 0.01,
							min: -2,
							max: 2,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				</Stack>
				<Slider
					aria-label='Small steps'
					defaultValue={0}
					step={0.01}
					min={-2}
					max={2}
					onChange={(e) =>
						setInferenceParameter({
							...inference_parameter,
							presencepenalty: e.target.value,
						})
					}
					value={inference_parameter.presencepenalty}
					valueLabelDisplay='off'
				/>
				<Stack direction='row' spacing={1}>
					<Typography style={{flex: 1}} gutterBottom>
						Frequency penalty
						<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{t("parameter_explain.frequency_penalty")}</div>} arrow placement='top'>
							<IconButton size='small'>
								<HelpIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					</Typography>
					<SmallInput
						value={inference_parameter.frequencypenalty}
						size='small'
						onChange={(e) =>
							setInferenceParameter({
								...inference_parameter,
								frequencypenalty: e.target.value === "" ? 0 : Number(e.target.value),
							})
						}
						onBlur={handleBlur(inference_parameter.frequencypenalty, "frequencypenalty", -2, 2, setInferenceParameter, inference_parameter)}
						inputProps={{
							step: 0.01,
							min: -2,
							max: 2,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				</Stack>
				<Slider
					aria-label='Small steps'
					defaultValue={0}
					step={0.01}
					min={-2}
					max={2}
					onChange={(e) =>
						setInferenceParameter({
							...inference_parameter,
							frequencypenalty: e.target.value,
						})
					}
					value={inference_parameter.frequencypenalty}
					valueLabelDisplay='off'
				/>
			</Box>
		</Stack>
	);
};
OpenAPIParameter.propTypes = {
	isToolBox: PropTypes.bool,
	inference_parameter: PropTypes.object.isRequired,
	setInferenceParameter: PropTypes.func.isRequired,
	choosen_model: PropTypes.string.isRequired,
	setChoosenModel: PropTypes.func.isRequired,
	agent_objects: PropTypes.array.isRequired,
	max_turn: PropTypes.number.isRequired,
	setMaxTurn: PropTypes.func.isRequired,
	socket_destination: PropTypes.string,
	setSocketDestination: PropTypes.func,
};
