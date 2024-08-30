import {baseGet} from "./baseGet";
import {useQuery} from "react-query";

export const useGetUserDatasetRecord = (setRecordList, dataset_list, selectedIndex, pagnation_page, setDatasetColumn, setDatasetRow, setTotalNode) => {
	const {error, isLoading, refetch} = useQuery(
		["RecordList", selectedIndex, pagnation_page],
		() => baseGet(`/frontend-api/get-dataset-record/${dataset_list[selectedIndex].id}?page=${pagnation_page}`),
		{
			enabled: !!dataset_list[selectedIndex],
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
				setTotalNode(data.total_pages);
				const column = [
					{field: "system_prompt", headerName: "System Prompt", width: 200, editable: false, disableColumnMenu: true},
					{field: "embedding", headerName: "Embedding", width: 200, editable: false, disableColumnMenu: true},
				];
				const column_name = ["system_prompt"];
				const row = [];
           
                for (var key in dataset_list[selectedIndex].default_content_structure) {
                    let new_column = {field: key, headerName: key, width: 200, editable: false, disableColumnMenu: true};
                    if (!column.includes(new_column) && !column_name.includes(key)) {
                        column.push(new_column);
                        column_name.push(key);
                    }
                }
				data.results.record_serializer.forEach((record) => {
					const temp_row = {
						id: record.id,
						system_prompt: record.content['System Prompt'],
					};

                    for (var key in record.content) {
                        temp_row[key] = record.content[key];
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

				setRecordList(data);
				setDatasetColumn(column);
				setDatasetRow(row);
			},
		}
	);

	return {error, isLoading, refetch};
};
