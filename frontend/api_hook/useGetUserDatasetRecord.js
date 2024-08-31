import {baseGet} from "./baseGet";
import {useQuery} from "react-query";

export const useGetUserDatasetRecord = (setRecordList, dataset_list, selectedIndex, pagnation_page, setDatasetColumn, setDatasetRow, setTotalNode) => {
	const {error, isLoading, refetch} = useQuery(
		["RecordList", selectedIndex, pagnation_page, dataset_list],
		() => baseGet(`/frontend-api/get-dataset-record/${dataset_list[selectedIndex].id}?page=${pagnation_page}`),
		{
			enabled: !!dataset_list[selectedIndex],
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
				setTotalNode(data.total_pages);
				const column = [
					{field: "system_prompt", headerName: "System Prompt", width: 200, editable: false, disableColumnMenu: true},
				];
				const column_name = ["system_prompt"];
				const row = [];
           
                for (var key in dataset_list[selectedIndex].default_content_structure) {
                    let new_column = {field: dataset_list[selectedIndex].default_content_structure[key]["name"], headerName: dataset_list[selectedIndex].default_content_structure[key]["name"], width: 200, editable: false, disableColumnMenu: true};
                    if (!column.includes(new_column) && !column_name.includes(dataset_list[selectedIndex].default_content_structure[key]["name"])) {
                        column.push(new_column);
                        column_name.push(dataset_list[selectedIndex].default_content_structure[key]["name"]);
                    }
                }                
				data.results.record_serializer.forEach((record) => {
					const temp_row = {
						id: record.id,
						system_prompt: record.content[0]['value'],
					};

                    for (var key in record.content) {
                        temp_row[record.content[key]["name"]] = record.content[key]["value"];
                    }
					temp_row["embedding"] = record.embedding;
					record.evaluation.forEach((evaluation) => {
						if (!column_name.includes(evaluation.evaluation_name) && evaluation.evaluation_name) {
							column_name.push(evaluation.evaluation_name);
							temp_row[evaluation.evaluation_name] = evaluation.evaluation_value;
							column.push({
								field: evaluation.evaluation_name,
								headerName: evaluation.evaluation_name,
								width: 100,
								editable: false,
								disableColumnMenu: true,
							});
						} else if (column_name.includes(evaluation.evaluation_name) && evaluation.evaluation_name) {
							temp_row[evaluation.evaluation_name] = evaluation.evaluation_value;
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
