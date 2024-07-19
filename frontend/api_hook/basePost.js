import axios from "axios";
import { getCookie } from "../component/getCookie";

export const basePost = async ({url, data}) => {
    const csrftoken = getCookie('csrftoken');
    const config = {
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        }
    }
    const response = await axios.post(
        url, data, config
    );
    return response.data;
};