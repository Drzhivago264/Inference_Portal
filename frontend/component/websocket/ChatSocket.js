import dayjs from "dayjs";

export function chatsocket(websocket, setChatMessage, setThinking, document) {
	websocket.current.onopen = () => {
		console.log("WebSocket  Connected");
	};
	websocket.current.onclose = () => {
		setChatMessage((chat_message) => [
			...chat_message,
			{
				holder: "",
				holderid: "",
				role: "Server",
				time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
				credit: "",
				message: "Websocket Disconnected!",
			},
		]);
	};
	websocket.current.onmessage = (message) => {
		const dataFromServer = JSON.parse(message.data);
		if (dataFromServer) {
			if (
				dataFromServer.role === "Human" ||
				dataFromServer.role === "Server" ||
				dataFromServer.holder
			) {
				if (dataFromServer.holder) {
					setThinking(true);
					dataFromServer.message = "";
				}
				if (dataFromServer.role === "Server") {
					setThinking(false);
				}
				setChatMessage((chat_message) => [
					...chat_message,
					{
						holder: dataFromServer.holder,
						holderid: dataFromServer.holderid,
						role: dataFromServer.role,
						time: dataFromServer.time,
						credit: dataFromServer.credit,
						message: dataFromServer.message,
					},
				]);
			} else {
				setThinking(false);
				setChatMessage((chat_message) => [
					...chat_message.slice(0, -1),
					{
						...chat_message[chat_message.length - 1],
						message:
							chat_message[chat_message.length - 1].message +
							dataFromServer.message,
					},
				]);
			}
			document.getElementById("chat-log").scrollTop =
				document.getElementById("chat-log").scrollHeight;
		}
	};
}
