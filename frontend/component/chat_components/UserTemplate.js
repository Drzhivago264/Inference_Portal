import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
const UserTemplate = ({
    setChoosenUserTemplate,
    choosen_user_template,
    user_template_list,
    use_user_template,
    handle_use_user_template,
    swap_template
}) => {

    return (
        <FormControl disabled={user_template_list.length === 0}>
            <InputLabel id="use-agent-label">{`Users' Agents`}</InputLabel>
            <Select
                labelId="user-agent-label"
                id="user-agent-select"
                onChange={(e, obj) => { setChoosenUserTemplate(e.target.value); swap_template(obj.props.name, "user_template") }}
                value={user_template_list.length === 0 ? "Empty Template" : choosen_user_template}
                label="Users' Agents"
                size="small"
                disabled={!use_user_template}
            >
                {user_template_list.map((template) => {
                    return (
                        <MenuItem key={template.name} value={template.displayed_name} name={template.name}>{template.displayed_name}</MenuItem>
                    )
                })}
            </Select>
            <FormControlLabel control={<Switch checked={use_user_template} onChange={handle_use_user_template} />} label="Use My Template" />
            {user_template_list.length == 0 && <FormHelperText>{`No Users' Agent Found`}</FormHelperText>}
        </FormControl>
    )
}
UserTemplate.propTypes = {
    setChoosenUserTemplate: PropTypes.func.isRequired,
    choosen_user_template: PropTypes.string.isRequired,
    user_template_list: PropTypes.array.isRequired,
    handle_use_user_template: PropTypes.func.isRequired,
    swap_template: PropTypes.func.isRequired,
    use_user_template: PropTypes.bool.isRequired,
};
export default UserTemplate