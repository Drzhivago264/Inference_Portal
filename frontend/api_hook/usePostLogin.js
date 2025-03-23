import { basePost } from "./basePost";
import { useMutation } from "react-query";
export const usePostLogin = ({ setKeyError, key, setIsAuthenticated, navigate, setLoginError, setRedirectError }) => {
    const { mutate: mutate, isLoading: loginisLoading } = useMutation(basePost);
    const postLogin= (event) => {
        event.preventDefault();
        setKeyError(key === "");
        if (key) {
            const data = { key: key };
            mutate({ url: "/frontend-api/login", data }, {
                onSuccess: () => {
						setIsAuthenticated(true);
						navigate("/frontend/hub");
					},
                onError: (error) => {
						setLoginError(error.response.data.key[0]);
                        setKeyError(false);
                        if (setRedirectError) {
					    setRedirectError(false);
                        }
                    },

                }
            );
        }
    }
    return ({
        fetch: postLogin,
        isLoading: loginisLoading,
    }
    )
}