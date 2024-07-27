import dayjs from "dayjs";
import { multilineColumn } from "../custom_ui_component/MultipleLineEdittingDataGrid";

export function datasynthesissocket(
	websocket,
	setChatMessage,
	setCSVColumn,
	setCSVRow,
	genSubmit,
	submitSeed,
	setThinking,
	setIsRunning,
	row_ref,
	column_ref,
	is_running_ref,
	setUserParentInstruct,
	setDefaultUserChildTemplateList
) {
	const handleWebSocketEvent = (message) => {
		setChatMessage((chat_message) => [
			...chat_message,
			{
				holder: "",
				holderid: "",
				role: "Server",
				time: dayjs().format("mm:ss"),
				credit: "",
				message,
				status: "",
			},
		]);
	};

	websocket.current.onopen = () => {
		handleWebSocketEvent("Websocket Connected");
	};

	websocket.current.onclose = () => {
		handleWebSocketEvent("Websocket Disconnected");
	};
	websocket.current.onmessage = (message) => {
		const dataFromServer = JSON.parse(message.data);

		if (
			Object.prototype.hasOwnProperty.call(
				dataFromServer,
				"swap_instruction"
			)
		) {
			const new_child_template_list = Object.keys(
				dataFromServer.child_template_name_list
			).map((template_name) => ({
				displayed_name:
					dataFromServer.child_template_displayed_name_list[
						template_name
					],
				name: dataFromServer.child_template_name_list[template_name],
				instruct:
					dataFromServer.child_template_instruct_list[template_name],
			}));

			setUserParentInstruct(dataFromServer.swap_instruction);
			setDefaultUserChildTemplateList(new_child_template_list);
			dataFromServer.message = "";
		} else if (dataFromServer.role === "Server") {
			setChatMessage((chat_message) => [
				...chat_message,
				{
					holder: dataFromServer.holder,
					holderid: dataFromServer.holderid,
					role: dataFromServer.role,
					time: dataFromServer.time,
					credit: dataFromServer.credit,
					message: dataFromServer.message,
					status: dataFromServer.status,
				},
			]);
		} else if (
			Object.prototype.hasOwnProperty.call(
				dataFromServer,
				"response_list"
			)
		) {
			const response_list = {};
			const additional_column = [];

			if (dataFromServer.response_list.length > 0) {
				dataFromServer.response_list.forEach((response, i) => {
					const columnName = `Evolved_Prompt_No_${i}`;
					if (
						!Object.prototype.hasOwnProperty.call(
							column_ref.current,
							columnName
						)
					) {
						additional_column.push({
							field: columnName,
							headerName: `Evolved Prompt No.${i}`,
							width: 350,
							disableColumnMenu: true,
							editable: true,
							...multilineColumn,
						});
						response_list[columnName] = response;
					}
				});

				if (
					JSON.stringify(response_list) !==
						JSON.stringify(column_ref.current) &&
					additional_column.length > 0
				) {
					setCSVColumn([...column_ref.current, ...additional_column]);
				}

				const new_csv_row = row_ref.current.map((row) => {
					if (row.id === dataFromServer.row_no) {
						return { ...row, ...response_list };
					} else {
						return row;
					}
				});

				setCSVRow(new_csv_row);

				if (is_running_ref.current) {
					const next_value = genSubmit.current.next();

					if (next_value.value) {
						submitSeed(next_value.value[0], next_value.value[1]);
					} else if (next_value.done) {
						setThinking(false);
						setIsRunning(false);
					}
				}
			}
		}
	};
}
