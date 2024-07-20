import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetLogout = (setLoginState) => {

    const {
        error: error,
        isLoading: isLoading,
        refetch: refetch
    } = useQuery("LogoutState", () => baseGet('/frontend-api/logout'), {
        retry: true,
        enabled: false,
        staleTime: Infinity,
        onSuccess: () => {
            setLoginState(false)
        }
    });

    return {
        refetch: refetch,
        error: error,
        isLoading: isLoading
    }
}