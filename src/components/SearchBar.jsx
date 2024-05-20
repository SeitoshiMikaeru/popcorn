import {useRef} from "react";
import {useKey} from "../hooks/useKey";

export default function SearchBar({query, setQuery, placeholder}){
    const inputElement = useRef(null);

    useKey("Enter", () => {
        if(document.activeElement === inputElement.current)
            return;
        inputElement.current.focus();
        setQuery("");
    });

    return <input
        className="search"
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputElement}
    />
}