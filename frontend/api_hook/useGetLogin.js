import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetLogin = (setLoginState, setUserKeyName, setWebsocketHash) => {

    const {
        error: error,
        isLoading: isLoading,
        refetch: refetch
    } = useQuery("LoginState", () => baseGet('/frontend-api/check-login'), {
        retry: false, refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setLoginState(true)
            setUserKeyName(data.key_name)
            setWebsocketHash(data.websocket_hash)
        },
        onError: () => {
            setLoginState(false)
        }
    });

    return {
        refetch: refetch,
        error: error,
        isLoading: isLoading
    }
}