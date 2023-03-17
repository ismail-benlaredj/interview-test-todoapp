import { useState, useEffect } from 'react';

type Data = any;

export default function useFetchData(url: string): [Data | null, boolean, Error | null] {
    const [data, setData] = useState<Data | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setData(json);
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };
        if (url != '') {
            fetchData();
        }
    }, [url]);

    return [data, isLoading, error];
}
