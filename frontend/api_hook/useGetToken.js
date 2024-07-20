import { baseGet } from "./baseGet";
import { useEffect } from "react";
import { useQuery } from "react-query";

export const useGetToken = (setTokenList, setLocalTokenCreateError) => {

    const {
        status: status,
        data: data,
        error: error,
        isLoading: isLoading,
        refetch: refetch
    } = useQuery("TokenData", () => baseGet('/frontend-api/get-token'), {  retry: true });

    useEffect(() => {
        if (status == "success") {
            setTokenList(data.token_list)
        }
        if (error) {
            setLocalTokenCreateError(error.response.data.detail)
        }
    }, [status, data]);
    return {
        refetch: refetch,
        error: error,
        isLoading: isLoading
    }
}