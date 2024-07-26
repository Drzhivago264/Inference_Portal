import { basePost } from "./basePost";
import { useMutation } from "react-query";
export const usePostKeyCheck = ({ setKeyError, setKeyNamePayError, key, keynamepay }) => {
    const { mutate: mutate, isLoading: keycheckisLoading, error: keycheckerror, data: keycheckdata } = useMutation(basePost);
    const postKeyCheck = (event, url) => {
        event.preventDefault();
        setKeyNamePayError(keynamepay === '');
        setKeyError(key === '');
        if (keynamepay && key) {
            const data = { key_name: keynamepay, key: key };
            mutate({ url, data });
        }
    }
    return ({
        fetch: postKeyCheck,
        isLoading: keycheckisLoading,
        error: keycheckerror,
        data: keycheckdata
    }
    )
}