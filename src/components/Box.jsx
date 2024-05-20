import {useState} from "react";
import ToggleButton from "./ToggleButton";


export default function Box({children}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <ToggleButton onClick={() => setIsOpen((open) => !open)}>
                {isOpen ? "–" : "+"}
            </ToggleButton>
            {isOpen && (
                children
            )}
        </div>
    );
}