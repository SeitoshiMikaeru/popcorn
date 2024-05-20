import WatchedItem from "./WatchedItem";

export default function WatchedMoviesList({watched, onRemoveMovie}) {
    return <ul className="list">
        {watched.map((movie) => (
            <WatchedItem movie={movie} onRemoveMovie={onRemoveMovie} />
        ))}
    </ul>
}