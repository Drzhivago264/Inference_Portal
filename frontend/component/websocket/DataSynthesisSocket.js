
export function datasynthesissocket(websocket) {

    websocket.current.onopen = () => {
        console.log("WebSocket  Connected");
    };
    websocket.current.onclose = () => {
        console.log("WebSocket  Disconnected");
    };
    websocket.current.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        if (dataFromServer) {
            console.log(dataFromServer)
        }
    }
}


