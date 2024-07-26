import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetToken = (setTokenList, setLocalTokenCreateError) => {
    const {
        error: error,
        isLoading: isLoading,
    } = useQuery("TokenData", () => baseGet('/frontend-api/get-token'),
        {
            retry: false,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                setTokenList(data.token_list)
            },
            onError: (error) => {
                setLocalTokenCreateError(error.response.data.detail)
            }
        });
    return {
        error: error,
        isLoading: isLoading
    }
}