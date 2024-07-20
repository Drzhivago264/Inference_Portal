import axios from "axios";
import { getCookie } from "../component/getCookie";

export const basePut = async ({url, data}) => {
    const csrftoken = getCookie('csrftoken');
    const config = {
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        }
    }
    const response = await axios.put(
        url, data, config
    );
    return response.data;
};