import { useEffect, useState } from "react";

import axios from "axios";
import { useQuery } from "react-query";

const retrieveModels = async () => {
    const response = await axios.get(
        "/frontend-api/model",
    );
    return response.data;
};

export const useGetModel = () => {
    const [agent_objects, setAgents] = useState([]);
    const [model_objects, setModels] = useState([]);
    const [server_objects, setServers] = useState([]);
    const {
        status: status,
        data: data,
        error: error,
        isLoading: isLoading,
    } = useQuery("ModelData", retrieveModels, { staleTime: Infinity, retry: false });

    useEffect(() => {
        if (status == "success") {
            setModels(data.models_bot);
            setAgents(data.models_agent)
            setServers(data.servers)
        }
    }, [status, data]);
    return {
        agent_objects: agent_objects,
        model_objects: model_objects,
        server_objects: server_objects,
        error: error,
        isLoading: isLoading
    }
}