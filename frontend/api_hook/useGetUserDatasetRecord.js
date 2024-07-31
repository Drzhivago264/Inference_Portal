import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetUserDatasetRecord = (setRecordList, dataset_list, selectedIndex, pagnation_page, setDatasetColumn, setDatasetRow, setTotalNode) => {

    const { error, isLoading, refetch } = useQuery(["RecordList", selectedIndex, pagnation_page ], () => baseGet(`/frontend-api/get-dataset-record/${dataset_list[selectedIndex].id}?page=${pagnation_page}`), {
        enabled: !!dataset_list[selectedIndex],
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setTotalNode(data.total_pages)
            const column = [
                { field: 'system_prompt', headerName: 'System Prompt', width: 350, editable: false, disableColumnMenu: true },
                { field: 'prompt', headerName: 'Prompt', width: 350, editable: false, disableColumnMenu: true },
                { field: 'response', headerName: 'Response', width: 350, editable: false, disableColumnMenu: true }
            ];
            const column_name = ['system_prompt', 'prompt', 'response'];
            const row = [];

            data.results.record_serializer.forEach(record => {
                const temp_row = {
                    id: record.id,
                    system_prompt: record.system_prompt,
                    prompt: record.prompt,
                    response: record.response,
                };

                record.evaluation.forEach(evaluation => {
                    if (!column_name.includes(evaluation.evaluation_name) && evaluation.evaluation_name) {
                        column_name.push(evaluation.evaluation_name);
                        temp_row[evaluation.evaluation_name] = evaluation.score;
                        column.push({
                            field: evaluation.evaluation_name,
                            headerName: evaluation.evaluation_name,
                            width: 100,
                            editable: false,
                            disableColumnMenu: true,
                        });
                    } else if (column_name.includes(evaluation.evaluation_name) && evaluation.evaluation_name) {
                        temp_row[evaluation.evaluation_name] = evaluation.score;
                    }
                });

                row.push(temp_row);
            });
            setRecordList(data);
            setDatasetColumn(column);
            setDatasetRow(row);
        }
    });

    return { error, isLoading, refetch };
}