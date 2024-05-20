import {useEffect} from "react";

export function useLocalStorage(key, items) {
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(items));
    }, [key, items]);
}