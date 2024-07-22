import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetUserDataset = (setDatasetList, setMaxDatasetNum) => {

    const {
        error: error,
        isLoading: isLoading,
    } = useQuery("DatasetList", () => baseGet("/frontend-api/get-dataset"),
        {   
            retry: false,
            onSuccess: (data) => {
                setDatasetList(data.dataset_list), 
                setMaxDatasetNum(data.max_dataset_num)
            },
        }
    );

    return {
        error: error,
        isLoading: isLoading
    }
}