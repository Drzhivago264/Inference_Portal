import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetCreditBalance = (setCreditBalance, setPaymentHistory) => {
    const {
        error: error,
        isLoading: isLoading
    } = useQuery("CreditBalanceAndPaymentHistory", () => baseGet('/frontend-api/credit-balance-api'), {
        retry: false, refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setCreditBalance(
                {
                    "fiat_balance": data.fiat_balance,
                    "monero_balance": data.monero_balance,
                }
            )
            setPaymentHistory(data.payment_history)
        },
        onError: () => {
            setCreditBalance(null)
            setPaymentHistory(null)
        }
    });

    return {
        error: error,
        isLoading: isLoading
    }
}