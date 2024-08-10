import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetRedirectAnon = (navigate, is_authenticated) => {

    const {
        error: error,
        isLoading: isLoading,
        refetch: refetch
    } = useQuery(["LoginRedirect", is_authenticated], () => baseGet('/frontend-api/check-login'), {
        retry: false,
        enabled: !is_authenticated,
        onError: () => {
            navigate("/frontend/login")
        }
    });

    return {
        refetch: refetch,
        error: error,
        isLoading: isLoading
    }
}