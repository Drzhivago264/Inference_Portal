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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const LogPaper = styled(Paper)(({ theme }) => ({
    height: 265,
    overflow: 'auto',
    padding: theme.spacing(1),
    ...theme.typography.caption,
}));

export const LogBox = ({
    chat_message,
    messagesEndRef,

}) => {

    return (
        <Box m={2}>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="log-content"
                    id="log-header"
                >
                    <Typography sx={{ color: 'text.secondary' }}>Run Log</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <LogPaper
                        variant="outlined"
                    >
                        <Stack spacing={1}>
                            {chat_message.map((mess) => {
                                return (
                                    <Box key={mess.message} align="left" style={{ whiteSpace: "pre-wrap" }} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Box>{mess.time}~{mess.message}</Box>
                                        <Box sx={{ color: mess.status === "200 Success" ? 'success.main' : 'error.main' }}>
                                            {mess.status}
                                        </Box>
                                    </Box>
                                )
                            })}
                            <div ref={messagesEndRef}> </div>
                        </Stack>
                    </LogPaper>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}