import {useEffect, useState} from "react";

export function useLocalStorage(initialState, item) {
    const [items, setItems] = useState(() => {
        const data = localStorage.getItem(item);
        return data ? JSON.parse(data) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(item, JSON.stringify(items));
    }, [item, items]);

    return [items, setItems];
}