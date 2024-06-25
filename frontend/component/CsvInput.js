import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Papa from 'papaparse';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: 1,
});


const CsvFileInput = ({ onFileLoad }) => {

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        var preview_list = []
        var current_row = 0
        var from_row = 0
        var to_row = 1000
        if (file) {
            Papa.parse(file, {
                worker: true,
                step: function (result) {

                    if ( from_row < current_row && current_row < to_row) {      
                        console.log(from_row, current_row, to_row)             
                        preview_list.push(Object.assign({ id: preview_list.length }, result.data))
                        onFileLoad(preview_list)
                    }
                    current_row += 1
                   
                },

                header: true,
                skipEmptyLines: true,
            });
        }
    }; return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            Load File
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
    );
}; export default CsvFileInput;