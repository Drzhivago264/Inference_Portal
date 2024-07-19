import { useEffect, useState } from "react";

import { baseGet } from "./baseGet";
import { useQuery } from "react-query";

export const useGetProduct = () => {
    const [product_objects, setProduct] = useState([]);
    const {
        status: status,
        data: data,
        error: error,
        isLoading: isLoading,
    } = useQuery("ProductData", () => baseGet("/frontend-api/products"), { staleTime: Infinity, retry: false });

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