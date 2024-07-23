import { useEffect, useState } from "react";

import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetModel = () => {
    const [agent_objects, setAgents] = useState([]);
    const [model_objects, setModels] = useState([]);
    const [server_objects, setServers] = useState([]);
    
    const { status, data, error, isLoading } = useQuery("ModelData", () => baseGet("/frontend-api/model"), { staleTime: Infinity, retry: false });

    useEffect(() => {
        if (status === "success" && data) {
            setModels(data.models_bot);
            setAgents(data.models_agent);
            setServers(data.servers);
        }
    }, [status, data]);

    return {
        agent_objects,
        model_objects,
        server_objects,
        error,
        isLoading
    };
}