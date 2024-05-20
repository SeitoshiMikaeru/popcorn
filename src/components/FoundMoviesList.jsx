import SearchItem from "./SearchItem";

export default function FoundMoviesList({movies, handleSelectId}) {
    return <ul className="list list-movies">
        {movies?.map((movie) => (
            <SearchItem movie={movie} handleSelectId={handleSelectId}/>
        ))}
    </ul>
}