export default function ToggleButton({onClick, children}){
    return (
        <button
            className="btn-toggle"
            onClick={onClick}
        >
            {children}
        </button>
    );
}