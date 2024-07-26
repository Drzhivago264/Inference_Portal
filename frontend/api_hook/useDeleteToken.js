import { baseDelete } from "./baseDelete";
import { useMutation } from "react-query";
export const useDeleteToken = ({ setTokenList, setLocalTokenCreateError }) => {
    const { mutate: mutate } = useMutation(baseDelete);
    const deleteToken = (token_prefix, token_name, token_value, index) => {
        if (token_prefix && token_name && token_value) {
            const data = {
                token_name: token_name,
                prefix: token_prefix,
                first_and_last_char: token_value
            }
            mutate({ url: "/frontend-api/invalidate-token", data: data },
                {
                    onSuccess: () => setTokenList(prev => {
                        return prev.filter((_, i) => i !== index)
                    }),
                    onError: (error) => setLocalTokenCreateError(error.response.data.detail)

                })

        }
    };
    return ({
        fetch: deleteToken,
    }
    )
}