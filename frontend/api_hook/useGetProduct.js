import { baseGet } from "./baseGet";
import { useQuery } from "react-query";
import { useState } from "react";

export const useGetProduct = () => {
    const [product_objects, setProduct] = useState([]);
    const {
        error: error,
        isLoading: isLoading,
    } = useQuery("ProductData", () => baseGet("/frontend-api/products"), {
        staleTime: Infinity, retry: true,
        onSuccess: (data) => setProduct(data.products)
    });

    return {
        product_objects: product_objects,
        error: error,
        isLoading: isLoading
    }
}