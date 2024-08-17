import MuiInput from "@mui/material/Input";
import {styled} from "@mui/material/styles";
export const toggleMemory = (value, memory_type, setInferenceParameter, inference_parameter) => {
    if (memory_type === "usememory") {
        setInferenceParameter({
            ...inference_parameter,
            usememory: value,
            usememorycurrent: !value,
        });
    } else if (memory_type === "usememorycurrent") {
        setInferenceParameter({
            ...inference_parameter,
            usememory: !value,
            usememorycurrent: value,
        });
    } else {
        setInferenceParameter({
            ...inference_parameter,
            usememory: false,
            usememorycurrent: false,
        });
    }
};

export const handleBlur = (value, field, min, max, setInferenceParameter, inference_parameter) => {
    if (value) {
        if (value < min) {
            setInferenceParameter({
                ...inference_parameter,
                [field]: min,
            })
        } else if (value > max) {
            setInferenceParameter({
                ...inference_parameter,
                [field]: max,
            })
        }
    }
};

export const SmallInput = styled(MuiInput)`
	max-width: 50px;
`;
export const BigInput = styled(MuiInput)`
	max-width: 60px;
`;