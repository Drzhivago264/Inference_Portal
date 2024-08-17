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
					control={
						<Switch
							defaultChecked
							onChange={(e) =>
								setDuplicateMessage(e.target.checked)
							}
						/>
					}
					label='Duplicate Message'
				/>
			    </Box>
                )}
				<Stack direction='row' spacing={1}>
					<FormControlLabel
						control={
							<Switch
								checked={inference_parameter.usememory}
								onChange={(e) => toggleMemory(e.target.checked, "usememory", setInferenceParameter, inference_parameter)}
							/>
						}
						label='Use Memory (All)'
					/>
					<Box>
						<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{t("parameter_explain.use_memory")}</div>} arrow placement='top'>
							<IconButton size='small'>
								<HelpIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					</Box>
				</Stack>
				<Stack direction='row' spacing={1}>
					<FormControlLabel
						control={
							<Switch
								checked={inference_parameter.usememorycurrent}
								onChange={(e) => toggleMemory(e.target.checked, "usememorycurrent", setInferenceParameter, inference_parameter)}
							/>
						}
						label='Use Memory (Current)'
					/>
					<Box>
						<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{t("parameter_explain.use_memory_current")}</div>} arrow placement='top'>
							<IconButton size='small'>
								<HelpIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					</Box>
				</Stack>
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
				<Stack direction='row' spacing={1}>
					<Typography style={{flex: 1}} gutterBottom>
						Top_k
						<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{t("parameter_explain.top_k")}</div>} arrow placement='top'>
							<IconButton size='small'>
								<HelpIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					</Typography>
					<SmallInput
						value={inference_parameter.top_k}
						size='small'
						onChange={(e) =>
							setInferenceParameter({
								...inference_parameter,
								top_k: e.target.value === "" ? 0 : Number(e.target.value),
							})
						}
						onBlur={handleBlur(inference_parameter.top_k, "top_k", -1, 100, setInferenceParameter, inference_parameter)}
						inputProps={{
							step: 1,
							min: -1,
							max: 100,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				</Stack>
				<Slider
					defaultValue={-1}
					step={1}
					min={-1}
					max={100}
					valueLabelDisplay='off'
					onChange={(e) =>
						setInferenceParameter({
							...inference_parameter,
							top_k: e.target.value,
						})
					}
					value={inference_parameter.top_k}
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
				{model_objects.map((model_object_) => {
					if (model_object_.name == choosen_model) {
						return (
							<Box key={model_object_.name}>
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
									<SmallInput
										value={inference_parameter.max_tokens}
										size='small'
										onChange={(e) =>
											setInferenceParameter({
												...inference_parameter,
												max_tokens: e.target.value === "" ? 0 : Number(e.target.value),
											})
										}
										onBlur={handleBlur(
											inference_parameter.max_tokens,
											"max_token",
											1,
											model_object_.context_length,
											setInferenceParameter,
											inference_parameter
										)}
										inputProps={{
											step: 1,
											min: 1,
											max: model_object_.context_length,
											type: "number",
											"aria-labelledby": "input-slider",
										}}
									/>
								</Stack>
								<Slider
									defaultValue={1024}
									step={1}
									min={1}
									max={model_object_.context_length}
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
						</Tooltip>{" "}
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
							frequencypenalty: e.target.value === "" ? 0 : Number(e.target.value),
						})
					}
					value={inference_parameter.frequencypenalty}
					valueLabelDisplay='off'
				/>
				<Stack direction='row' spacing={1}>
					<FormControlLabel
						control={
							<Switch
								onChange={(e) =>
									setInferenceParameter({
										...inference_parameter,
										beam: e.target.value,
									})
								}
								value={inference_parameter.beam}
							/>
						}
						label='Beam'
					/>
					<Box>
						<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{t("parameter_explain.beam")}</div>} arrow placement='top'>
							<IconButton size='small'>
								<HelpIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					</Box>
				</Stack>
				<Stack direction='row' spacing={1}>
					<FormControlLabel
						control={
							<Switch
								onChange={(e) =>
									setInferenceParameter({
										...inference_parameter,
										earlystopping: e.target.value,
									})
								}
								value={inference_parameter.earlystopping}
							/>
						}
						label='Early Stop'
					/>
					<Box>
						<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{t("parameter_explain.early_stopping")}</div>} arrow placement='top'>
							<IconButton size='small'>
								<HelpIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					</Box>
				</Stack>
				<Stack direction='row' spacing={1}>
					<Typography style={{flex: 1}} gutterBottom>
						Best_of
						<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{t("parameter_explain.best_of")}</div>} arrow placement='top'>
							<IconButton size='small'>
								<HelpIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					</Typography>
					<SmallInput
						value={inference_parameter.bestof}
						size='small'
						onChange={(e) =>
							setInferenceParameter({
								...inference_parameter,
								bestof: e.target.value === "" ? 0 : Number(e.target.value),
							})
						}
						onBlur={handleBlur(inference_parameter.bestof, "bestof", 1, 5, setInferenceParameter, inference_parameter)}
						inputProps={{
							step: 1,
							min: 1,
							max: 5,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				</Stack>

				<Slider
					onChange={(e) =>
						setInferenceParameter({
							...inference_parameter,
							bestof: e.target.value,
						})
					}
					value={inference_parameter.bestof}
					marks
					defaultValue={2}
					step={1}
					min={1}
					max={5}
					valueLabelDisplay='off'
				/>
				<Stack direction='row' spacing={1}>
					<Typography style={{flex: 1}} gutterBottom>
						Length penalty
						<Tooltip title={<div style={{whiteSpace: "pre-line"}}>{t("parameter_explain.length_penalty")}</div>} arrow placement='top'>
							<IconButton size='small'>
								<HelpIcon fontSize='small' />
							</IconButton>
						</Tooltip>
					</Typography>
					<SmallInput
						value={inference_parameter.lengthpenalty}
						size='small'
						onChange={(e) =>
							setInferenceParameter({
								...inference_parameter,
								lengthpenalty: e.target.value === "" ? 0 : Number(e.target.value),
							})
						}
						onBlur={handleBlur(inference_parameter.lengthpenalty, "lengthpenalty", -2, 2, setInferenceParameter, inference_parameter)}
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
					onChange={(e) =>
						setInferenceParameter({
							...inference_parameter,
							lengthpenalty: e.target.value,
						})
					}
					value={inference_parameter.lengthpenalty}
					defaultValue={0}
					step={0.01}
					min={-2}
					max={2}
					valueLabelDisplay='off'
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
    setDuplicateMessage: PropTypes.func
};
