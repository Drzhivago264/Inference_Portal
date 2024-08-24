import {basePost} from "./basePost";
import {useMutation} from "react-query";
export const usePostMoneroConfirmation = ({setKeyError, setKeyNamePayError, setTransactionHashError = null, key, keynamepay, transactionhash = null}) => {
	const {mutate: mutate, isLoading: keycheckisLoading, error: keycheckerror, data: keycheckdata} = useMutation(basePost);
	const postKeyCheck = (event, url) => {
		event.preventDefault();
		setKeyNamePayError(keynamepay === "");
		setKeyError(key === "");
		if (setTransactionHashError) {
			setTransactionHashError(transactionhash === "");
		}
		if (keynamepay && key) {
			const data = transactionhash ? {key_name: keynamepay, key: key, tx_id: transactionhash} : {key_name: keynamepay, key: key, tx_id: null};
			mutate({url, data});
		}
	};
	return {
		fetch: postKeyCheck,
		isLoading: keycheckisLoading,
		error: keycheckerror,
		data: keycheckdata,
	};
};
