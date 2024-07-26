import { basePost } from "./basePost";
import { useMutation } from "react-query";
export const usePostStripeRedirect = ({ setKeyError, setKeyNamePayError, key, keynamepay, amount }) => {
    const { mutate: mutate, isSuccess: stripeisSuccess, error: stripeerror, data: stripedata } = useMutation(basePost);
    const postStripeRedirect = (event) => {
        event.preventDefault();
        setKeyNamePayError(false);  
        setKeyNamePayError(keynamepay === '');
        setKeyError(key === '');
        if (keynamepay && key && amount) {
            const data = {
                key_name: keynamepay,
                key: key,
                product_id: amount,
            };
            mutate({ url: "/frontend-api/stripe-redirect", data });
        }
    }
    return ({
        fetch: postStripeRedirect,
        isSuccess: stripeisSuccess,
        error: stripeerror,
        data: stripedata
    }
    )
}