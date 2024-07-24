import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetUserDataset = (setDatasetList, setMaxDatasetNum, setMaxEvaluationNum) => {

    const {
        error: error,
        isLoading: isLoading,
        refetch: refetch
        
    } = useQuery("DatasetList", () => baseGet("/frontend-api/get-dataset"),
        {   
            retry: false,
            refetchOnWindowFocus: false,
            
            onSuccess: (data) => {
                setDatasetList(data.dataset_list), 
                setMaxDatasetNum(data.max_dataset_num),
                setMaxEvaluationNum(data.max_evaluation_num)
            },
        }
    );

    return {
        refetch: refetch,
        error: error,
        isLoading: isLoading
    }
}