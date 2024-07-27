export const closeWebSocket = (socket) => {
	if (socket.current) {
		socket.current.close();
	}
};
export const scrollToBottom = (messagesEndRef) => {
	messagesEndRef.current?.scrollIntoView({
		behavior: "smooth",
		block: "nearest",
		inline: "nearest",
	});
};

export const handleListItemClick = (event, index, setSelectedIndex) => {
	setSelectedIndex(index);
};

export const swap_template = (template, type, websocket) => {
	websocket.current.send(
		JSON.stringify({
			swap_template: template,
			template_type: type,
		})
	);
};
export const swap_child_instruction = (child, type, websocket) => {
	websocket.current.send(
		JSON.stringify({
			swap_child_instruct: child,
			template_type: type,
		})
	);
};
