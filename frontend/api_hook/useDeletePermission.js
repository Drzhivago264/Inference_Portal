import { baseDelete } from "./baseDelete";
import { useMutation } from "react-query";
export const useDeletePermission = ({ setTokenList, setLocalTokenCreateError, token_list }) => {
    const { mutate: mutate } = useMutation(baseDelete);
    const deletePermission = (token_prefix, token_name, token_value, permission, token_index, perm_index) => {
        if (token_prefix && token_name && token_value && permission) {
            const data = {
                token_name: token_name,
                prefix: token_prefix,
                first_and_last_char: token_value,
                permission: permission
            }
            mutate({ url: "/frontend-api/remove-permission", data: data },
                {
                    onSuccess: () => {
                        setTokenList((prev) => {
                            const items = token_list[token_index].permissions.filter(
                                (_, permIndex) => permIndex !== perm_index
                            );
                            const newState = prev;
                            newState[token_index].permissions = items;
                            return [...newState];
                        });
                    },
                    onError: (error) => {
                        setLocalTokenCreateError(error.response.data.detail)
                    }
                }
            )
        }
    };
    return ({
        fetch: deletePermission,
    }
    )
}