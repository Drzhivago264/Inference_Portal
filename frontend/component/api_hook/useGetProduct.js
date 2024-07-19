import { useEffect, useState } from "react";

import axios from "axios";
import { useQuery } from "react-query";

const retrieveModels = async () => {
    const response = await axios.get(
        "/frontend-api/products",
    );
    return response.data;
};

export const useGetProduct = () => {
    const [product_objects, setProduct] = useState([]);
    const {
        status: status,
        data: data,
        error: error,
        isLoading: isLoading,
    } = useQuery("ProductData", retrieveModels, { staleTime: Infinity, retry: false });

    useEffect(() => {
        if (status == "success") {
            setProduct(data.products);
        }
    }, [status, data]);
    return {
        product_objects: product_objects,
        error: error,
        isLoading: isLoading
    }
}