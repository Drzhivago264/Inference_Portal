export function agentsocket(
    websocket,
    setChatMessage,
    setThinking,
    document,
    setParentInstruct,
    setChildInstruct,
    setDefaultChildTemplateList,
    use_user_template,
    setUserParentInstruct,
    setUserChildInstruct,
    setDefaultUserChildTemplateList,
    setEditor,
    setCurrentParagraph,
    editorref) {

    websocket.current.onopen = () => {
        console.log("WebSocket  Connected");
    };
    websocket.current.onclose = () => {
        console.log("WebSocket  Disconnected");
    };
    websocket.current.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        if (dataFromServer) {
            if ((dataFromServer.hasOwnProperty("swap_template"))) {

                if (!use_user_template){
                    let new_child_template_list = []
                    for (var new_child in dataFromServer.child_template_name_list) {
                        new_child_template_list.push({ 'name': dataFromServer.child_template_name_list[new_child] })
                    }
                    setParentInstruct(dataFromServer.swap_instruction)
                    setChildInstruct(dataFromServer.default_child_instruct)     
                    setDefaultChildTemplateList(new_child_template_list)
                    if (setEditor) {
                        setEditor(JSON.parse(dataFromServer.swap_template))
                    }
                    if (editorref) {
                        editorref.current.render(JSON.parse(dataFromServer.swap_template))
                    }
                }
                else {
                    let new_child_template_list = []
                    for (var new_child in dataFromServer.child_template_name_list) {
                        new_child_template_list.push({ 'displayed_name': dataFromServer.child_template_name_list[new_child] })
                    }
                    setUserParentInstruct(dataFromServer.swap_instruction)
                    setUserChildInstruct(dataFromServer.default_child_instruct)
                    setDefaultUserChildTemplateList(new_child_template_list)
                    let default_editor = { "time": 1709749130861, "blocks": [{ "id": "1hYKvu7PTO", "type": "header", "data": { "text": "Response", "level": 2 } }, { "id": "SrV68agaen", "type": "paragraph", "data": { "text": "" } }], "version": "2.29.1" }
                    if (setEditor) {
                        setEditor(default_editor)
                    }
                    if (editorref) {
                        editorref.current.render(default_editor)
                    }
                }
                dataFromServer.message = ""
            }
            else if ((dataFromServer.hasOwnProperty("child_instruct"))) {
                if (!use_user_template){
                    setChildInstruct(dataFromServer.child_instruct)
                }
                else {
                    setUserChildInstruct(dataFromServer.child_instruct)
                }
                dataFromServer.message = ""
            }
            else if (dataFromServer.hasOwnProperty("paragraph")) {
                if (setCurrentParagraph) {
                    setCurrentParagraph(dataFromServer.paragraph)
                    dataFromServer.message = ""
                }
            }
            if (dataFromServer.role == "Human" || dataFromServer.role == "Server" || dataFromServer.holder) {

                if (dataFromServer.holder) {
                    setThinking(true)
                    dataFromServer.message = ""
                }
                if (dataFromServer.role=="Server") {
                    setThinking(false)
                }
                setChatMessage(chat_message => [
                    ...chat_message,
                    {
                        holder: dataFromServer.holder,
                        holderid: dataFromServer.holderid,
                        role: dataFromServer.role,
                        time: dataFromServer.time,
                        credit: dataFromServer.credit,
                        message: dataFromServer.message
                    },
                ])
            }
            else if (dataFromServer.hasOwnProperty("agent_action")) {
                if (dataFromServer.agent_action == "STOP" || dataFromServer.agent_action == "NEXT") {
                    var blockToAdd = {
                        type: 'paragraph',
                        data: {
                            text: dataFromServer.full_result.replace(/\n/g, "<br>")
                        }
                    };
                    editorref.current.blocks.insert(blockToAdd.type, blockToAdd.data, null, dataFromServer.result_id);
                }
            }
            else {
                setThinking(false)
                setChatMessage(chat_message => [
                    ...chat_message.slice(0, -1),
                    {
                        holder: chat_message[chat_message.length - 1].holder,
                        holderid: chat_message[chat_message.length - 1].holderid,
                        role: chat_message[chat_message.length - 1].role,
                        time: chat_message[chat_message.length - 1].time,
                        credit: chat_message[chat_message.length - 1].credit,
                        message: chat_message[chat_message.length - 1].message += dataFromServer.message
                    }
                ])

            };
            var logTa = document.getElementById("chat-log")
            if (!logTa) {
                var logTa = document.getElementById("chat-log-agent")
            }
            logTa.scrollTop = logTa.scrollHeight;
        }
    }
}