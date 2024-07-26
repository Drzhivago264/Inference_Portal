import { basePost } from "./basePost";
import { useMutation } from "react-query";
export const usePostTokenCreate = ({ setTokenNameError, setTokenCreateLoading, setShowKeyCreateResponse, setRandomAnimation, setLocalTokenCreateError, tokenname, permission, ttl, time_unit, use_ttl }) => {
    const { mutate: tokencreatemutate, error: servertokencreateerror, data: servertokencreatedata} = useMutation(basePost);
    const postCreateToken = (event) => {
        event.preventDefault()
        setTokenNameError(false)
        setRandomAnimation(false)
        setLocalTokenCreateError(null)
        setTokenCreateLoading(true);
        setShowKeyCreateResponse(false)
        var perm_count = 0;
        for (var key in permission) {
            if (permission[key]) {
                perm_count++;
            }
        }
        if (tokenname == '') {
            setTokenCreateLoading(false)
            setTokenNameError(true)
        }
        else if (perm_count === 0) {
            setLocalTokenCreateError("You tried to create a token without any permission, the key will be unusable. Associate at least one permission for the token.")
            setTokenCreateLoading(false)
        }
        else if (tokenname.length > 50) {
            setLocalTokenCreateError("You tried to create a token name longer than 50 chars.")
            setTokenCreateLoading(false)
        }
        else if (ttl <= 0 || ttl > 999999) {
            setLocalTokenCreateError("You tried to create a token with invalid time to live (0 < ttl < 999999).")
            setTokenCreateLoading(false)
        }
        else if (!['day', 'hour', 'minute', 'second'].includes(time_unit)) {
            setLocalTokenCreateError("You tried to create a token with invalid time unit ['day', 'hour', 'minute', 'second'].")
            setTokenCreateLoading(false)
        }
        else {
            const data = {
                token_name: tokenname,
                permission: permission,
                ttl: ttl,
                time_unit: time_unit,
                use_ttl: use_ttl
            }
            tokencreatemutate({ url: "/frontend-api/generate-token", data: data }, {
                onSuccess: () => {
                    setShowKeyCreateResponse(true)

                }
            })
        }
    }
    return ({
        fetch: postCreateToken,
        error: servertokencreateerror,
        data: servertokencreatedata
    }
    )
}