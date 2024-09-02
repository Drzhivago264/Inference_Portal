import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetUserDataset = (setDatasetList, dataset_list, setMaxDatasetNum, setMaxEvaluationNum, selectedIndex, setCurrentSystemPrompt, setCurrentEvaluation, setCurrentContent) => {

    const {
        isSuccess: isSuccess,
        isLoading: isLoading,
        isError: isError,
        refetch: refetch

    } = useQuery(["DatasetList", dataset_list], () => baseGet("/frontend-api/get-dataset"),
        {
            retry: false,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                setDatasetList(data.dataset_list),
                setMaxDatasetNum(data.max_dataset_num),
                setMaxEvaluationNum(data.max_evaluation_num),
                console.log(data.dataset_list[0].default_content_structure[0]["is_required"])
                setCurrentEvaluation(data.dataset_list[selectedIndex].default_evaluation),
                setCurrentSystemPrompt(data.dataset_list[selectedIndex].default_system_prompt)
                setCurrentContent(data.dataset_list[selectedIndex].default_content_structure)
            },
        }
    );

    return {
        refetch: refetch,
        isSuccess:isSuccess,
        isError: isError,
        isLoading: isLoading,
    }
}