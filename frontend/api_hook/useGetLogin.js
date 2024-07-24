import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetLogin = (setIsAuthenticated, is_authenticated, setUserKeyName, setWebsocketHash) => {

    const {
        error: error,
        isLoading: isLoading

    } = useQuery(["LoginState", is_authenticated], () => baseGet('/frontend-api/check-login'), {
        retry: false, refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setIsAuthenticated(true)
            setUserKeyName(data.key_name)
            setWebsocketHash(data.websocket_hash)
        },
        onError: () => {
            setIsAuthenticated(false)
            setUserKeyName(null)
            setWebsocketHash(null)
        }
    });

    return {
        error: error,
        isLoading: isLoading
    }
}