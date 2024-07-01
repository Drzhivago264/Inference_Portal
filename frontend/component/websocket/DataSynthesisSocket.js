
export function datasynthesissocket(websocket, setCSVColumn, setCSVRow, csv_column, csv_row, setThinking) {

    websocket.current.onopen = () => {
        console.log("WebSocket  Connected");
    };
    websocket.current.onclose = () => {
        console.log("WebSocket  Disconnected");
    };
    websocket.current.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        if (dataFromServer['role'] == "Server") {
            console.log(dataFromServer)
        }
        else {
            var response_list = {}
            if (dataFromServer['response_list'].length > 0) { 
                for (var i = 0; i < dataFromServer['response_list'].length; i++) {
                    setCSVColumn([
                        ...csv_column,
                        {
                            field: `Evolved_Prompt_No_${i}`,
                            headerName: `Evolved Prompt No.${i}`,
                            width: 350,
                            disableColumnMenu: true,
                            editable: true,
                        }
                    ]
                    )
                    response_list[`Evolved_Prompt_No_${i}`] = dataFromServer['response_list'][i]

                }
            }
            console.log(response_list)
            setCSVRow(csv_row.map(row => {
                console.log(row.id, dataFromServer['row_no'])
                if (row.id === dataFromServer['row_no']) {
                    console.log({ ...row, ...response_list })
                    return { ...row, ...response_list };
                } else {

                    return row;
                }
            }));
            setThinking(false)

        }
    }
}


