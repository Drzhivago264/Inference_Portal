import { basePost } from "./basePost";
import { useMutation } from "react-query";
export const usePostKeyCreate = ({ setKeyNameError, setKeyCreateLoading, setRandomAnimation, setLocalKeyCreateError, keyname }) => {
    const { mutate: mutate, error: serverkeycreateerror, data: serverkeycreatedata } = useMutation(basePost);
    const postKeyCreate = (event, url) => {
        event.preventDefault();
        setKeyNameError(false);
        setKeyCreateLoading(true);
        setRandomAnimation(false);
        setLocalKeyCreateError("");
        if (!keyname) {
            setKeyNameError(true);
            setKeyCreateLoading(false);
        } else if (keyname.length > 50) {
            setLocalKeyCreateError("Key name exceeds max characters of 50");
            setKeyNameError(true);
            setKeyCreateLoading(false);
        } else {
            const data = { key_name: keyname };
            mutate({ url, data });
        }
    }
    return ({
        fetch: postKeyCreate,
        error: serverkeycreateerror,
        data: serverkeycreatedata
    }
    )
}