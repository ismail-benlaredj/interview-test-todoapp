import { useState, useEffect } from "react";

export default function useCacheData<T>(key: string): T | undefined {
    const [data, setData] = useState<T>();

    useEffect(() => {
        const cache = localStorage.getItem(key);
        if (cache) {
            const parsedCache: T = JSON.parse(cache);
            setData(parsedCache);
        }
    }, [key]);

    return data;
}