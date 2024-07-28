import Papa from "papaparse";
import {basePost} from "./basePost";
import dayjs from "dayjs";
import {useMutation} from "react-query";

export const usePostLargeDatasetExport = ({dataset_id, dataset_name, extension, setSaveErrorMessage, setSaveError, setDownloadLink, setShowDownloadLink}) => {
	const {mutate: mutate, isLoading: isLoading, error: error, data: data} = useMutation(basePost);
	const format_to_hour = "YYYY-MM-DD HH:mm";
	const now = dayjs();
	const postLargedatasetExport = () => {
		if (dataset_id && extension) {
			const data = {id: dataset_id, extension: extension};
			mutate(
				{url: "/frontend-api/export-dataset", data: data},
				{
					onSuccess: (data) => {
						if (data.export_type === "celery") {
							setShowDownloadLink(true);
							setDownloadLink(data.download_link);
						} else if (data.export_type === "direct") {
							var a = document.createElement("a");
							if (extension == ".jsonl") {
								let download_content = data.records.map((x) => JSON.stringify(x)).join("\n");
								let blob = new Blob([download_content], {
									type: "application/jsonl",
								});
								let url = URL.createObjectURL(blob);
								a.setAttribute("href", url);
								a.setAttribute("download", `${dataset_name}_${now.format(format_to_hour)}.jsonl`);
								a.click();
							} else if (extension == ".csv") {
								
								let stringify_nesed_json = data.records.map(function (val) {
									return {prompt: val.prompt, response: val.response, system_prompt: val.system_prompt, evaluation: JSON.stringify(val.evaluation) };
								});
                                let download_content = Papa.unparse(stringify_nesed_json);
								let blob = new Blob([download_content]);
								if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveBlob(blob, `${dataset_name}.csv`);
								else {
									a.href = window.URL.createObjectURL(blob, {
										type: "text/plain",
									});
									a.download = `${dataset_name}_${now.format(format_to_hour)}.csv`;
									document.body.appendChild(a);
									a.click();
									document.body.removeChild(a);
								}
							}
						}
					},
					onError: (error) => {
						setSaveError(true);
						if (error.code === "ERR_BAD_RESPONSE") {
							setSaveErrorMessage("Failed, Internal Server Error!");
						} else {
							setSaveErrorMessage(error.response.data.detail);
						}
					},
				}
			);
		}
	};
	return {
		fetch: postLargedatasetExport,
		isLoading: isLoading,
		error: error,
		data: data,
	};
};
