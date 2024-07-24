import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetUserDataset = (setDatasetList, setMaxDatasetNum, setMaxEvaluationNum, selectedIndex, setCurrentSystemPrompt, setCurrentEvaluation) => {

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
                setMaxEvaluationNum(data.max_evaluation_num),
                setCurrentEvaluation(data.dataset_list[selectedIndex].default_evaluation),
                setCurrentSystemPrompt(data.dataset_list[selectedIndex].default_system_prompt)

            },
        }
    );

    return {
        refetch: refetch,
        error: error,
        isLoading: isLoading
    }
}