import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import KeyIcon from '@mui/icons-material/Key';
import LinearProgress from '@mui/material/LinearProgress';
import SendIcon from '@mui/icons-material/Send';


export const ChatBox = ({ 
    inputsize,
    size,
    ChatPaper,
    ChatInput,
    state,
    key,
    keyError,
    setKey,
    chat_message,
    shownthinking,
    usermessage,
    setUserMessage,
    usermessageError,
    submitChat,
    messagesEndRef,
    handleEnter }) => {
    return (
        <Grid item md={size}>
            <ChatPaper id={'chat-log'} variant="outlined">
                {!state && <TextField
                    margin="normal"
                    label="Key"
                    type="password"
                    size="small"
                    onChange={e => setKey(e.target.value)}
                    value={key}
                    error={keyError}
                    autoComplete="off"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <KeyIcon />
                            </InputAdornment>
                        ),
                    }}
                />}
                <Stack spacing={1}>
                    {chat_message.map((mess) => {

                        if (mess.role == 'Human') {
                            return (
                                <Paper  ><Box sx={{ borderRight: 5, borderColor: 'primary.main', borderRadius: 1 }} p={1} className="message_log_container" style={{ whiteSpace: 'pre-line', textAlign: 'right' }}>  <span> ({mess.role} - {mess.time}) {mess.message} </span></Box></Paper>
                            )
                        }
                        else if (mess.holder) {
                            return (
                                <Paper ><Box p={1} sx={{ borderLeft: 5, borderRadius: 1 }} className="message_log_container" style={{ whiteSpace: 'pre-line' }} id={mess.holderid} >  <span> {mess.role} - {mess.time}: {mess.message}</span></Box></Paper>
                            )
                        }
                        else if (mess.role == 'Server') {
                            return (
                                <Paper  ><Box p={1} sx={{ borderLeft: 5, borderRadius: 1 }} className="message_log_container" style={{ whiteSpace: 'pre-line' }}>  <span> {mess.message} ({mess.role} - {mess.time}) </span></Box></Paper>
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
                    sx={{ p: '2px 4px', display: 'flex', minWidth: {inputsize} }}
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
        </Grid>
    )
}