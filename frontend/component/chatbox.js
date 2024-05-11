import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
export const ChatBox = ({
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
    handleEnter
}) => {

    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(e);
    }
    return (
        <Box>
            <ChatPaper id={'chat-log'} variant="outlined">
                <Stack spacing={1}>
                    {chat_message.map((mess) => {
                        if (mess.role == 'Human') {
                            return (
                                <Paper key={mess.time} >
                                    <Box sx={{ borderRight: 5, borderColor: 'primary.main', borderRadius: 1 }} p={1} className="message_log_container" style={{ whiteSpace: 'pre-line', textAlign: 'right' }}>
                                        <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Box align="left">
                                                <IconButton onClick={() => copyToClipboard(`${mess.role} (${mess.time})\n\n${mess.message}`)} aria-label="copy" size="small">
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                            <Box pt={0.8} align="right">
                                                <span > {mess.role} ({mess.time})  <br /><br /> {mess.message} </span>
                                            </Box>
                                        </Grid>
                                    </Box>
                                </Paper>
                            )
                        }
                        else if (mess.holder) {
                            return (
                                <Paper key={mess.holderid}>
                                    <Box p={1} sx={{ borderLeft: 5, borderRadius: 1 }} className="message_log_container" style={{ whiteSpace: 'pre-line' }} id={mess.holderid} >
                                        <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Box pt={0.8} align="left">
                                                <span> {mess.role} - {mess.time}: <br /><br /> {mess.message}</span>
                                            </Box>
                                            <Box align="right">
                                                <IconButton onClick={() => copyToClipboard(`${mess.role} - ${mess.time}:\n\n${mess.message}`)} aria-label="copy" size="small">
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    </Box>
                                </Paper>
                            )
                        }
                        else if (mess.role == 'Server') {
                            return (
                                <Paper key={mess.message + mess.time} >
                                    <Box p={1} sx={{ borderLeft: 5, borderRadius: 1 }} className="message_log_container" style={{ whiteSpace: 'pre-line' }}>
                                        <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Box pt={0.8} align="left">
                                                <span> {mess.message} ({mess.role} - {mess.time}) </span>
                                            </Box>
                                            <Box align="right">
                                                <IconButton onClick={() => copyToClipboard(`${mess.message} (${mess.role} - ${mess.time})`)} aria-label="copy" size="small">
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    </Box>
                                </Paper>
                            )
                        }
                    })}
                </Stack>
                <div ref={messagesEndRef}> </div>
            </ChatPaper>
            {shownthinking && <LinearProgress />}
            <Box mt={2}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', minWidth: { inputsize } }}
                >
                    <ChatInput
                        id="standard-multiline-flexible"
                        multiline
                        maxRows={6}
                        value={usermessage}
                        error={usermessageError}
                        onChange={e => setUserMessage(e.target.value)}
                        onKeyUp={e => handleEnter(e)}
                        minRows={4}
                        variant="standard"
                        InputProps={{
                            endAdornment: <InputAdornment sx={{ position: 'absolute', bottom: 30, right: 10 }} position="end">
                                <  Button sx={{ height: 32, }} variant="contained" size="small" onClick={submitChat} endIcon={<SendIcon />}>Send</Button></InputAdornment>,
                            startAdornment: <InputAdornment position="start">   </InputAdornment>,
                        }}
                    />
                </Paper>
            </Box>
        </Box>
    )
}

export const ChatBoxHotpot = ({
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
    check_duplicate_message
}) => {
    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(e);
    }
    return (
        <Box>
            <ChatPaper id={id} variant="outlined">
                <Stack spacing={1}>
                    {chat_message.map((mess) => {

                        if (mess.role == 'Human') {
                            return (
                                <Paper  key={mess.time + mess.message}>
                                    <Box sx={{ borderRight: 5, borderColor: 'primary.main', borderRadius: 1 }} p={1} className="message_log_container" style={{ whiteSpace: 'pre-line', textAlign: 'right' }}>
                                        <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Box align="left">
                                                <IconButton onClick={() => copyToClipboard(`${mess.role} (${mess.time})\n\n${mess.message}`)} aria-label="copy" size="small">
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                            <Box pt={0.8} align="right">
                                                <span > {mess.role} ({mess.time})  <br /><br /> {mess.message} </span>
                                            </Box>
                                        </Grid>
                                    </Box>
                                </Paper>
                            )
                        }
                        else if (mess.holder) {
                            return (
                                <Paper key={mess.holderid}>
                                    <Box p={1} sx={{ borderLeft: 5, borderRadius: 1 }} className="message_log_container" style={{ whiteSpace: 'pre-line' }} id={mess.holderid} >
                                        <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Box pt={0.8} align="left">
                                                <span> {mess.role} - {mess.time}: <br /><br /> {mess.message}</span>
                                            </Box>
                                            <Box align="right">
                                                <IconButton onClick={() => copyToClipboard(`${mess.role} - ${mess.time}:\n\n${mess.message}`)} aria-label="copy" size="small">
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    </Box>
                                </Paper>
                            )
                        }
                        else if (mess.role == 'Server') {
                            return (
                                <Paper key={mess.message}  >
                                    <Box p={1} sx={{ borderLeft: 5, borderRadius: 1 }} className="message_log_container" style={{ whiteSpace: 'pre-line' }}>
                                        <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Box pt={0.8} align="left">
                                                <span> {mess.message} ({mess.role} - {mess.time}) </span>
                                            </Box>
                                            <Box align="right">
                                                <IconButton onClick={() => copyToClipboard(`${mess.message} (${mess.role} - ${mess.time})`)} aria-label="copy" size="small">
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    </Box>
                                </Paper>
                            )
                        }
                    })}

                </Stack>
                <div ref={messagesEndRef}> </div>
            </ChatPaper>
            {shownthinking && <LinearProgress />}
            <Box mt={2}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', minWidth: { inputsize } }}
                >
                    <ChatInput
                        id="standard-multiline-flexible"
                        multiline
                        maxRows={6}
                        value={usermessage}
                        error={usermessageError}
                        onChange={e => { setUserMessage(e.target.value); check_duplicate_message(e.target.value) }}
                        onKeyUp={e => handleEnter(e)}
                        minRows={4}
                        variant="standard"
                        InputProps={{
                            endAdornment: <InputAdornment sx={{ position: 'absolute', bottom: 30, right: 10 }} position="end">
                                <  Button sx={{ height: 32, }} variant="contained" size="small" onClick={submitChat} endIcon={<SendIcon />}>Send</Button></InputAdornment>,

                            startAdornment: <InputAdornment position="start">   </InputAdornment>,
                        }}
                    />
                </Paper>
            </Box>
        </Box>
    )
}