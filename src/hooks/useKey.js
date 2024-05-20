import {useEffect} from "react";

export function useKey(key, callback) {
    useEffect(() => {
        function esc (e) {
            if(e.code === key) {
                callback();
            }
        }

        document.addEventListener('keydown', esc);

        return () => {
            document.removeEventListener('keydown', esc);
        }
    }, [callback, key]);
}