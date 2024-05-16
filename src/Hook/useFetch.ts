import { useEffect, useState } from "react";

type ApiResponse<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};

const useFetch = <T>(url: string, options?: RequestInit): ApiResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error: any) { // <-- Aquí estamos utilizando `error: any` para forzar el tipo de error
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();

    }, [url, options]);

    return { data, loading, error };
};

export default useFetch;
