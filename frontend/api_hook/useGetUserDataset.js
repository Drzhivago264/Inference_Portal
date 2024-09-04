import {baseGet} from "./baseGet";
import {useQuery} from "react-query";

export const useGetUserDataset = (
	setDatasetList,
	dataset_list,
	setMaxDatasetNum,
	setMaxEvaluationNum,
	selectedIndex,
	setCurrentSystemPrompt,
	setCurrentEvaluation,
	setCurrentContent
) => {
	const {
		isSuccess: isSuccess,
		isLoading: isLoading,
		isError: isError,
		refetch: refetch,
	} = useQuery(["DatasetList", dataset_list], () => baseGet("/frontend-api/get-dataset"), {
		retry: false,
		refetchOnWindowFocus: false,
		onSuccess: (data) => {
			setDatasetList(data.dataset_list);
			if (setMaxDatasetNum) {
				setMaxDatasetNum(data.max_dataset_num);
			}
			if (setMaxEvaluationNum) {
				setMaxEvaluationNum(data.max_evaluation_num);
			}
			if (setCurrentContent) {
				setCurrentContent(data.dataset_list[selectedIndex].default_content_structure);
			}
			if (setCurrentEvaluation) {
				setCurrentEvaluation(data.dataset_list[selectedIndex].default_evaluation);
			}
			if (setCurrentSystemPrompt) {
				setCurrentSystemPrompt(data.dataset_list[selectedIndex].default_system_prompt);
			}
		},
	});

	return {
		refetch: refetch,
		isSuccess: isSuccess,
		isError: isError,
		isLoading: isLoading,
	};
};
