import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import {TextCopy} from "../custom_ui_component/TextCopy";

export const ChatBox = ({
	id,
	inputsize,
	ChatPaper,
	ChatInput,
	chat_message,
	shownthinking,
	usermessage,
	setUserMessage,
	usermessageError,
	submitChat,
	messagesEndRef,
	handleEnter,
	check_duplicate_message,
}) => {
	return (
		<Box>
			<ChatPaper id={id} variant='outlined'>
				<Stack spacing={1}>
					{chat_message.map((mess) => {
						if (mess.role == "Human") {
							return (
								<Paper key={mess.time + mess.message}>
									<Box
										sx={{
											borderRight: 5,
											borderColor: "primary.main",
											borderRadius: 1,
										}}
										p={1}
										className='message_log_container'
										style={{whiteSpace: "pre-wrap"}}>
										<Grid
											item
											sx={{
												display: "flex",
												justifyContent: "space-between",
											}}>
											<Box align='left'>
												<TextCopy message={`${mess.role} - ${mess.time}:\n\n${mess.message}`} />
											</Box>
											<Box pt={0.8}>
												<Box textAlign='right'>
													{mess.role} ({mess.time})
												</Box>
												<Box
													display='flex'
													sx={{
														wordBreak: "break-word",
													}}
													justifyContent='flex-end'
													style={{
														whiteSpace: "pre-wrap",
													}}>
													{mess.message}
												</Box>
											</Box>
										</Grid>
									</Box>
								</Paper>
							);
						} else if (mess.holder) {
							return (
								<Paper key={mess.holderid}>
									<Box
										p={1}
										sx={{borderLeft: 5, borderRadius: 1}}
										className='message_log_container'
										style={{whiteSpace: "pre-line"}}
										id={mess.holderid}>
										<Grid
											item
											sx={{
												display: "flex",
												justifyContent: "space-between",
											}}>
											<Box
												pt={0.8}
												align='left'
												sx={{wordBreak: "break-word"}}
												style={{
													whiteSpace: "pre-wrap",
												}}>
												<span>
													{mess.role} - {mess.time}: <br />
													<br />
													{mess.message}
												</span>
											</Box>
											<Box align='right'>
												<TextCopy message={`${mess.role} - ${mess.time}:\n\n${mess.message}`} />
											</Box>
										</Grid>
									</Box>
								</Paper>
							);
						} else if (mess.role == "Server") {
							return (
								<Paper key={mess.message}>
									<Box p={1} sx={{borderLeft: 5, borderRadius: 1}} className='message_log_container' style={{whiteSpace: "pre-line"}}>
										<Grid
											item
											sx={{
												display: "flex",
												justifyContent: "space-between",
											}}>
											<Box
												pt={0.8}
												align='left'
												style={{
													whiteSpace: "pre-wrap",
												}}>
												<span>
													{mess.message} ({mess.role} - {mess.time}){" "}
												</span>
											</Box>
											<Box align='right'>
												<TextCopy message={`${mess.role} - ${mess.time}:\n\n${mess.message}`} />
											</Box>
										</Grid>
									</Box>
								</Paper>
							);
						}
					})}
					<div ref={messagesEndRef}> </div>
				</Stack>
			</ChatPaper>
			{shownthinking && <LinearProgress />}
			<Box mt={2}>
				<Paper
					component='form'
					sx={{
						p: "2px 4px",
						display: "flex",
						minWidth: {inputsize},
					}}>
					<ChatInput
						id='standard-multiline-flexible'
						multiline
						maxRows={6}
						value={usermessage}
						error={usermessageError}
						onChange={(e) => {
							setUserMessage(e.target.value);
							{check_duplicate_message ? check_duplicate_message(e.target.value) : {}};
						}}
						onKeyPress={(e) => handleEnter(e)}
						minRows={4}
						variant='standard'
						InputProps={{
							endAdornment: (
								<InputAdornment
									sx={{
										position: "absolute",
										bottom: 30,
										right: 10,
									}}
									position='end'>
									<Button sx={{height: 32}} variant='contained' size='small' onClick={submitChat} endIcon={<SendIcon />}>
										Send
									</Button>
								</InputAdornment>
							),

							startAdornment: <InputAdornment position='start'> </InputAdornment>,
						}}
					/>
				</Paper>
			</Box>
		</Box>
	);
};

ChatBox.propTypes = {
	id: PropTypes.string,
	inputsize: PropTypes.number.isRequired,
	ChatPaper: PropTypes.elementType.isRequired,
	ChatInput: PropTypes.elementType.isRequired,
	chat_message: PropTypes.array.isRequired,
	shownthinking: PropTypes.bool.isRequired,
	usermessage: PropTypes.string.isRequired,
	setUserMessage: PropTypes.func.isRequired,
	usermessageError: PropTypes.bool.isRequired,
	submitChat: PropTypes.func.isRequired,
	messagesEndRef: PropTypes.object.isRequired,
	handleEnter: PropTypes.func.isRequired,
	check_duplicate_message: PropTypes.func,
};
