
export function chatsocket(websocket, setChatMessage, setThinking, document) {

    websocket.current.onopen = () => {
        console.log("WebSocket  Connected");
    };
    websocket.current.onclose = () => {
        console.log("WebSocket  Disconnected");
    };
    websocket.current.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        if (dataFromServer) {
            if (dataFromServer.role == "Human" || dataFromServer.role == "Server" || dataFromServer.holder) {

                if (dataFromServer.holder) {
                    setThinking(true)
                    dataFromServer.message = ""
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
            logTa.scrollTop = logTa.scrollHeight;
        }
    }
}


