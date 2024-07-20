import axios from "axios";
import { getCookie } from "../component/getCookie";

export const baseDelete = async ({ url, data }) => {
    const csrftoken = getCookie('csrftoken');

    const response = axios.delete(url, {
        headers: {
            'content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        }, 
        data: data
    }
    )
    return response.data;
};