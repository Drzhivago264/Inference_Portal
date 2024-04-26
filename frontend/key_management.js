import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import { styled } from '@mui/system';
import { FormControl, FormLabel } from '@mui/material';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { Input, inputClasses } from '@mui/base/Input';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoginIcon from '@mui/icons-material/Login';
import clsx from 'clsx';
import MenuItem from '@mui/material/MenuItem';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
function Hub() {

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const StickyBox = styled(Box)`
        position: -webkit-sticky;
        position: sticky;
        display: inline-block;
        top: 100px;
        `;

    const [explaination, setMessage] = useState('');
    const navigate = useNavigate();
    const [key, setKey] = useState("")
    const [keyError, setKeyError] = useState(false)
    const [keyname, setKeyName] = useState("")
    const [keynameError, setKeyNameError] = useState(false)
    const [amount, setAmount] = useState(10)
    const handleCreateKey = (event) => {

        event.preventDefault()

        setKeyNameError(false)
        if (keyname == '') {
            setKeyError(true)
        }

        if (keyname) {
            const csrftoken = getCookie('csrftoken');

            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                key: key,
            }
            console.log(key, destination)
            axios.post("/frontend-api/create-key", data, config)

                .then((response) => {
                    console.log(response)

                }).catch(error => {
                    console.log(error);
                });;
        }
    }
    useEffect(() => {
        axios.all([
            axios.get('/frontend-api/article/redirect/explaination'),
        ])

            .then(axios.spread((explaination_object) => {
                setMessage(explaination_object.data.article.content);
            }))
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Box
                my={1}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
            >
                <title>Modes</title>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <form autoComplete="off" onSubmit={handleCreateKey}>
                            <FormControl defaultValue="" required>
                                <Stack direction="row" spacing={1}>
                                    <TextField
                                        margin="normal"
                                        label="Key Name"
                                        type="text"
                                        size="small"
                                        onChange={e => setKey(e.target.value)}
                                        value={keyname}
                                        error={keynameError}
                                        autoComplete="off"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CreateIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button variant="contained" type="submit" endIcon={<LoginIcon />}>Go</Button>
                                </Stack>
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid item xs={8} >
                        <form autoComplete="off" onSubmit={handleCreateKey}>
                          
                            <Stack spacing={2}>
                                <Stack direction="row" spacing={1}>
                                    <TextField
                                        margin="normal"
                                        label="Key Name"
                                        type="text"
                                        size="small"
                                        onChange={e => setKey(e.target.value)}
                                        value={keyname}
                                        error={keynameError}
                                        autoComplete="off"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CreateIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
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
                                    />
                                                                  <FormControl defaultValue="" required size="small">
                                <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={e => setAmount(e.target.value)}
                                        value={amount}
                                        label="Amount"
                                    >
                                        <MenuItem value={10}>10 USD</MenuItem>
                                        <MenuItem value={20}>20 USD</MenuItem>
                                        <MenuItem value={30}>30 USD</MenuItem>
                                    </Select>
                                    </FormControl>
                                </Stack>
                                <Stack direction="row" spacing={1}>
  
                                    <Button variant="contained" name="topup" type="submit" endIcon={<LocalAtmIcon/>}>Top Up</Button>
                                    <Button variant="contained" name="checkcredit" type="submit" endIcon={<LocalAtmIcon/>}>Check Credit</Button>
                                    <Button variant="contained" type="submit" endIcon={<AccountBalanceWalletIcon />}>Check XMR Wallet</Button>
                                </Stack>
                                </Stack>
                           
                        </form>
                    </Grid>
                   
              
                </Grid>
            </Box>
        </Container>
    );
}

export default Hub;