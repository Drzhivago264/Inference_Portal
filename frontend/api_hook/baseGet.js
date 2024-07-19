import axios from "axios";

export const baseGet = async (url) => {
    const response = await axios.get(
        url,
    );
    return response.data;
};