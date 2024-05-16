import React, { useState, useEffect, useContext } from 'react';
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
import ResponsiveAppBar from './component/navbar';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControl, FormLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { MuiMarkdown, getOverrides } from 'mui-markdown';
import explaination_ from '../docs/PageContent/mode_explaination.md'
import { Highlight, themes } from 'prism-react-renderer';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import { logout } from './component/check_login';
import Footer from './component/footer';
import { UserContext } from './App.js'
import { getCookie } from './component/getCookie.js';
function Hub() {
    const { is_authenticated, setIsAuthenticated } = useContext(UserContext);
    const [explaination, setMessage] = useState('');
    const navigate = useNavigate();
    const [destination, setDestination] = useState("engineer")
    const [key, setKey] = useState("")
    const [keyError, setKeyError] = useState(false)
    const [redirecterror, setRedirectError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault()
        setKeyError(false)
        if (!is_authenticated && key == '') {
            setKeyError(true)
        }
        else {
            if (destination) {
                const csrftoken = getCookie('csrftoken');
                const config = {
                    headers: {
                        'content-type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    }
                }
                const data = {
                    key: key,
                    check_login: is_authenticated,
                    destination: destination
                }
          
                axios.post("/frontend-api/hub-redirect", data, config)
                    .then((response) => {
                        setIsAuthenticated(true)
                        navigate(response.data.redirect_link, { replace: true, state: { credential: key } });
                    }).catch(error => {
                        setRedirectError(error.response.data.detail)
                        if (error.response.status == "400") {
                            setRedirectError("Your key is incorrect")
                        }
                    });
            }
        }
    }
    useEffect(() => {
        axios.all([
            axios.get(explaination_),
        ])
            .then(axios.spread((explaination_object) => {
                setMessage(explaination_object.data);
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
                                    {!is_authenticated && <Stack mt={3} direction="row" spacing={1}>
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
                                        <Button variant="contained" type="submit" endIcon={<LoginIcon />}>Login</Button>

                                    </Stack>
                                    }
                                    {is_authenticated && <Stack mt={3} direction="row" spacing={1}>
                                        <Button variant="contained" type="submit" endIcon={<AssistantDirectionIcon />}>Redirect</Button>
                                        <Divider orientation="vertical" flexItem />
                                        <Button variant="outlined" onClick={() => { logout(setIsAuthenticated) }} color="error" endIcon={<LogoutIcon />}>Logout</Button>
                                    </Stack>
                                    }
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
                            <MuiMarkdown overrides={{
                                ...getOverrides({ Highlight, themes, theme: themes.okaidia }),
                                h1: {
                                    component: 'h1',
                                },
                                h2: {
                                    component: 'h2',
                                },
                                h3: {
                                    component: 'h3',
                                },
                            }}>{explaination}</MuiMarkdown>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Container>
    );
}

export default Hub;