import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetUserDatasetRecord = (setRecordList, setNextPaginationPage, setPreviousPaginationPage, dataset_list, selectedIndex, pagnation_page, setDatasetColumn, setDatasetRow) => {

    const {
        error: error,
        isLoading: isLoading,
        refetch: refetch,
    } = useQuery(["RecordList", selectedIndex, pagnation_page, dataset_list], () => baseGet(`/frontend-api/get-dataset-record/${dataset_list[selectedIndex].id}?page=${pagnation_page}`),
        {
            enabled: !!dataset_list,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                setRecordList(data)
                setNextPaginationPage(data.next)
                setPreviousPaginationPage(data.previous)
                var column = [
                    {
                        field: 'system_prompt',
                        headerName: 'System Prompt',
                        width: 350,
                        editable: false,
                        disableColumnMenu: true,
                    },
                    {
                        field: 'prompt',
                        headerName: 'Prompt',
                        width: 350,
                        editable: false,
                        disableColumnMenu: true,
                    },
                    {
                        field: 'response',
                        headerName: 'Response',
                        width: 350,
                        editable: false,
                        disableColumnMenu: true,
                    }
                ]
                var column_name = ['system_prompt', 'prompt', 'response']
                var row = []

                for (let i in data.results.record_serializer) {

                    var temp_row = {
                        id: data.results.record_serializer[i].id,
                        system_prompt: data.results.record_serializer[i].system_prompt,
                        prompt: data.results.record_serializer[i].prompt,
                        response: data.results.record_serializer[i].response,
                    }
                    for (let ie in data.results.record_serializer[i].evaluation) {

                        if (!column_name.includes(
                            data.results.record_serializer[i].evaluation[ie].evaluation_name,
                        ) && data.results.record_serializer[i].evaluation[ie].evaluation_name) {
                            column_name.push(data.results.record_serializer[i].evaluation[ie].evaluation_name)
                            temp_row[data.results.record_serializer[i].evaluation[ie].evaluation_name] = data.results.record_serializer[i].evaluation[ie].score
                            column.push(
                                {
                                    field: data.results.record_serializer[i].evaluation[ie].evaluation_name,
                                    headerName: data.results.record_serializer[i].evaluation[ie].evaluation_name,
                                    width: 100,
                                    editable: false,
                                    disableColumnMenu: true,
                                }
                            )
                        }
                        else if (column_name.includes(
                            data.results.record_serializer[i].evaluation[ie].evaluation_name,
                        ) && data.results.record_serializer[i].evaluation[ie].evaluation_name) {
                            column_name.push(data.results.record_serializer[i].evaluation[ie].evaluation_name)
                            temp_row[data.results.record_serializer[i].evaluation[ie].evaluation_name] = data.results.record_serializer[i].evaluation[ie].score
                        }
                    }
                    row.push(
                        temp_row
                    )
                }

                console.log(column, row)
                setDatasetColumn(
                    column
                )
                setDatasetRow(
                    row
                )
            }
        }
    )

    return {
        error: error,
        isLoading: isLoading,
        refetch: refetch
    }
}