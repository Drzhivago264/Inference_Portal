import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetToken = (setTokenList, setLocalTokenCreateError) => {

    const {
        error: error,
        isLoading: isLoading,
        refetch: refetch
    } = useQuery("TokenData", () => baseGet('/frontend-api/get-token'), {  retry: true,
        onSuccess: (data) => {
            setTokenList(data.token_list)
        },
        onError: (error) => {
            setLocalTokenCreateError(error.response.data.detail)
        } 
     });
    return {
        refetch: refetch,
        error: error,
        isLoading: isLoading
    }
}