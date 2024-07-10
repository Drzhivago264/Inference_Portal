import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Papa from 'papaparse';
import React from 'react';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

export const DatasetExport = ({
    filename,
    data,
    choosen_export_format,
    setChoosenExportFormat
}) => {

    const handleExportChatLog = (event) => {
        event.preventDefault()
        var data_clone = [...data]
        var a = document.createElement('a')
        if (choosen_export_format == ".json") {
            var download_content = JSON.stringify(data_clone)
            var blob = new Blob([download_content], { type: "application/json" })
            var url = URL.createObjectURL(blob)
            a.setAttribute('href', url)
            a.setAttribute('download', `${filename}.json`)

        }
        else if (choosen_export_format == ".csv") {
            var download_content = Papa.unparse(data)
            var blob = new Blob([download_content]);
            if (window.navigator.msSaveOrOpenBlob)  
                window.navigator.msSaveBlob(blob, `${filename}.csv`);
            else
            {
                var a = window.document.createElement("a");
                a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
                a.download = `${filename}.csv`;
                document.body.appendChild(a);
                a.click(); 
                document.body.removeChild(a);
            }
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
                        onChange={e => setChoosenExportFormat(e.target.value)}
                        value={choosen_export_format}
                        label="Export"
                        size="small"
                        fullWidth
                    >
                        {['.json', '.csv'].map((format) => {
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
