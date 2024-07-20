import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetRedirectAnon = (navigate, is_authenticated) => {

    const {
        error: error,
        isLoading: isLoading,
        refetch: refetch
    } = useQuery("LoginRedirect", () => baseGet('/frontend-api/check-login'), {
        retry: false,
        enabled: !is_authenticated,
        onError: (error) => {
            console.log(error)
            navigate("/frontend/login")
        }
    });

    return {
        refetch: refetch,
        error: error,
        isLoading: isLoading
    }
}