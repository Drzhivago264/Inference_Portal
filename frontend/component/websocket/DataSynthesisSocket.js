
export function datasynthesissocket(websocket, setCSVColumn, setCSVRow, genSubmit, submitSeed, setThinking, setIsRunning, row_ref, column_ref, is_running_ref) {

    websocket.current.onopen = () => {
        console.log("WebSocket  Connected");
    };
    websocket.current.onclose = () => {
        console.log("WebSocket  Disconnected");
    };
    websocket.current.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        if (dataFromServer['role'] == "Server") {

        }
        else {
            var response_list = {}
            var additional_column = []

            if (dataFromServer['response_list'].length > 0) {
                for (var i = 0; i < dataFromServer['response_list'].length; i++) {
                    if (!column_ref.current.hasOwnProperty(`Evolved_Prompt_No_${i}`)) {
                        additional_column.push({
                            field: `Evolved_Prompt_No_${i}`,
                            headerName: `Evolved Prompt No.${i}`,
                            width: 350,
                            disableColumnMenu: true,
                            editable: true,
                        })

                        response_list[`Evolved_Prompt_No_${i}`] = dataFromServer['response_list'][i]
                    }
                }

                if (response_list != column_ref.current && additional_column.length > 0) {
                    setCSVColumn([
                        ...column_ref.current,
                        ...additional_column
                    ]
                    )
                }

                const new_csv_row = row_ref.current.map(row => {
                    console.log(row.id, dataFromServer['row_no'])
                    if (row.id === dataFromServer['row_no']) {
                        console.log({ ...row, ...response_list })
                        return { ...row, ...response_list };
                    } else {

                        return row;
                    }
                }
                )
                setCSVRow(new_csv_row)
                if (is_running_ref.current) {
                    var next_value = genSubmit.current.next()

                    if (next_value.value) {
                        submitSeed(next_value.value[0], next_value.value[1])
                    }
                    else if (next_value.done) {
                        setThinking(false)
                        setIsRunning(false)
                    }
                }
            }

        }
    }
}


