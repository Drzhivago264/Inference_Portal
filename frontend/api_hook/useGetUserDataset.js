import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetUserDataset = (setDatasetList) => {

    const {
        error: error,
        isLoading: isLoading,
    } = useQuery("DatasetList", () => baseGet("/frontend-api/get-dataset"),
        {
            onSuccess: (data) => console.log(data),
            onError: (error) => console.log(error)
        }
    );

    return {
        error: error,
        isLoading: isLoading
    }
}