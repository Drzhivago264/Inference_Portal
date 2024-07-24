import { baseGet } from "./baseGet";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
export const useGetLogout = (setLoginState, setUserKeyName, setWebsocketHash) => {
    const navigate = useNavigate();
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
            setUserKeyName(null)
            setWebsocketHash(null)
            navigate("/")
            
        }
    });

    return {
        refetch: refetch,
        error: error,
        isLoading: isLoading
    }
}