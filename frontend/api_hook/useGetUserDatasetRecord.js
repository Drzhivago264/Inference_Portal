import {baseGet} from "./baseGet";
import {useQuery} from "react-query";

export const useGetUserDatasetRecord = (setRecordList, dataset_list, dataset_row, selectedIndex, paginationModel, setDatasetColumn, setDatasetRow, setTotalRow) => {
	const {error, isLoading, refetch} = useQuery(
		["RecordList", selectedIndex, paginationModel, dataset_list, dataset_row],
		() => baseGet(`/frontend-api/get-dataset-record/${dataset_list[selectedIndex].id}?page=${paginationModel.page + 1}`),
		{
			enabled: !!dataset_list[selectedIndex],
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
                setTotalRow(data.count)
				const column = [
					{field: "system_prompt", headerName: "System Prompt", width: 200, editable: false, disableColumnMenu: true},
				];
				const column_name = ["system_prompt"];
				const row = [];
           
                for (let key in dataset_list[selectedIndex].default_content_structure) {
                    let new_column = {field: dataset_list[selectedIndex].default_content_structure[key]["unique"], headerName: dataset_list[selectedIndex].default_content_structure[key]["name"], width: 200, editable: false, disableColumnMenu: true};
                    if (!column.includes(new_column) && !column_name.includes(dataset_list[selectedIndex].default_content_structure[key]["unique"])) {
                        column.push(new_column);
                        column_name.push(dataset_list[selectedIndex].default_content_structure[key]["unique"]);
                    }
                }      
                for (let eva in dataset_list[selectedIndex].default_evaluation) {
                    let new_column = {field: dataset_list[selectedIndex].default_evaluation[eva]["unique"], headerName: dataset_list[selectedIndex].default_evaluation[eva]["evaluation_name"], width: 100, editable: false, disableColumnMenu: true};
                    if (!column.includes(new_column) && !column_name.includes(dataset_list[selectedIndex].default_evaluation[eva]["unique"])) {
                        column.push(new_column);
                        column_name.push(dataset_list[selectedIndex].default_evaluation[eva]["unique"]);
                    }
                }          
				data.results.record_serializer.forEach((record) => {
					const temp_row = {
						id: record.id,
						system_prompt: record.content[0]['value'],
					};

                    for (var key in record.content) {
                        temp_row[record.content[key]["unique"]] = record.content[key]["value"];
                    }
					temp_row["embedding"] = record.embedding;
					record.evaluation.forEach((evaluation) => {
						 if (column_name.includes(evaluation.unique) && evaluation.unique) {
							temp_row[evaluation.unique] = evaluation.evaluation_value;
						}
					});
					row.push(temp_row);
                    
				});
                column.push({field: "embedding", headerName: "Embedding", width: 200, editable: false, disableColumnMenu: true},)
				setRecordList(data);
				setDatasetColumn(column);
				setDatasetRow(row);
			},
		}
	);

	return {error, isLoading, refetch};
};
