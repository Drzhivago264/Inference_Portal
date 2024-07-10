import { FormControl, FormLabel } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GetAppIcon from '@mui/icons-material/GetApp';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

export const ChatExport = ({
    chat_message,
    choosen_export_format_chatlog,
    setChoosenExportFormatChatLog,
    number_of_remove_message
}) => {

    const handleExportChatLog = (event) => {
        event.preventDefault()
        var chat_message_clone = [...chat_message]
        var a = document.createElement('a')
        if (choosen_export_format_chatlog == ".json") {
            var download_content = JSON.stringify(chat_message_clone.splice(number_of_remove_message), null, 4)
            var blob = new Blob([download_content], { type: "application/json" })
            var url = URL.createObjectURL(blob)
            a.setAttribute('href', url)
            a.setAttribute('download', 'Chat_log_from_Professor_Parakeet.json')

        }
        else if (choosen_export_format_chatlog == ".txt") {
            var json = chat_message_clone.splice(number_of_remove_message)
            var download_content = ""
            for (const k in json) {
                download_content += (json[k]['role'] + "-" + json[k]['time'] + ":\n" + json[k]['message'] + "\n")
            }
            var blob = new Blob([download_content], { type: "text/plain" })
            var url = URL.createObjectURL(blob)
            a.setAttribute('href', url)
            a.setAttribute('download', 'Chat_log_from_Professor_Parakeet.txt')
        }

        a.click()

    }
    return (
        <Box mt={2}>
            <FormControl fullWidth>
                <Stack direction={'row'} spacing={1}>
                    <InputLabel id="export-label-chatlog">Formats</InputLabel>
                    <Select
                        labelId="export-label-chatlog"
                        id="export-select-chatlog"
                        onChange={e => setChoosenExportFormatChatLog(e.target.value)}
                        value={choosen_export_format_chatlog}
                        label="Export"
                        size="small"
                        fullWidth
                    >
                        {['.json', '.txt'].map((format) => {
                            return (
                                <MenuItem key={format} value={format}>{format}</MenuItem>
                            )
                        })}
                    </Select>
                    <Button fullWidth size="small" variant="contained" onClick={handleExportChatLog} endIcon={<GetAppIcon />}>Export</Button>
                </Stack>
            </FormControl>
        </Box>
    )
}
