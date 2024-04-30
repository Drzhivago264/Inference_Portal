import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import ResponsiveAppBar from './navbar';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControl, FormLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
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

    const [explaination, setMessage] = useState('');
    const navigate = useNavigate();
    const [key, setKey] = useState("")
    const [destination, setDestination] = useState("engineer")
    const [keyError, setKeyError] = useState(false)
    const [redirecterror, setRedirectError] = useState(null);
    const handleSubmit = (event) => {

        event.preventDefault()

        setKeyError(false)
        if (key == '') {
            setKeyError(true)
        }

        if (key && destination) {
            const csrftoken = getCookie('csrftoken');
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
            const data = {
                key: key,
                destination: destination
            }
            console.log(key, destination)
            axios.post("/frontend-api/hub-redirect", data, config)
                .then((response) => {
                    navigate(response.data.redirect_link, { replace: true });
                }).catch(error => {
                    console.log(error.response.data.detail)
                    setRedirectError(error.response.data.detail)
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
    const ErrorAlert = ({ error }) => {
        return (
            <Box mt={4}>
                <Typography variant="body1"  >
                    Request Failed!
                </Typography>
                <Box textAlign='center' my={2}>
                    <Alert variant="filled" severity="error">
                        {error}
                    </Alert>
                </Box>
            </Box >
        );
    };
    return (
        <Container maxWidth={false} disableGutters>
            <title>Hub</title>
            <ResponsiveAppBar />
            <Container maxWidth="lg">
                <Box
                    my={1}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                >
                    <Grid container spacing={2}>
                        <Grid item md={4} lg={3}>
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <FormControl defaultValue="" required>
                                    <Stack direction="row" spacing={1}>
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
                                        <Button variant="contained" type="submit" endIcon={<LoginIcon />}>Go</Button>
                                    </Stack>
                                    <FormLabel sx={{ m: 2 }}>Bring me to:</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        onChange={e => setDestination(e.target.value)}
                                        value={destination}
                                        sx={{ ml: 2 }}

                                    >
                                        <FormControlLabel value="chat" control={<Radio />} label="Chatbots" />
                                        <FormControlLabel value="engineer" control={<Radio />} label="Agents" />
                                        <FormControlLabel value="hotpot" control={<Radio />} label="Hotpot Mode" />
                                        <FormControlLabel value="toolbox" control={<Radio />} label="LLM Functions" />
                                        <FormControlLabel value="log" control={<Radio />} label="Retrieve Log" />
                                    </RadioGroup>

                                </FormControl>
                            </form>
                            {redirecterror && <ErrorAlert error={redirecterror} />}
                        </Grid>
                        <Grid item md={8} lg={9}>
                            <div dangerouslySetInnerHTML={{ __html: explaination }} ></div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Container>
    );
}

export default Hub;