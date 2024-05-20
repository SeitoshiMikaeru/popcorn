import {useState} from "react";
import Navigation from "./components/Navigation";
import MainComponent from "./components/MainComponent";
import NumberResults from "./components/NumberResults";
import SearchBar from "./components/SearchBar";
import FoundMoviesList from "./components/FoundMoviesList";
import Box from "./components/Box";
import Summary from "./components/Summary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import SelectedMovie from "./components/SelectedMovie";

import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorageRetrieve";

export default function App() {
  const [watched, setWatched] = useLocalStorage([], "watched");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const {movies, err, isLoading} = useMovies(query, handleCloseMovie);

  function handleAddWatched(movie) {
    setWatched((prev) => [...prev, movie]);
  }

  function handleRemoveMovie(id) {
    setWatched(watched => watched.filter((movie) => movie.imdbID !== id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleSelectId(id) {
    setSelectedId((prev) => prev === id ? null : id);
  }

  return (
    <>
      <Navigation>
        <SearchBar placeholder={"Search for thighs..."} query={query} setQuery={setQuery}/>
        <NumberResults length={movies.length} />
      </Navigation>

      <MainComponent>
        <Box>
          {
            err ? <p className="error">{err}</p>
            :
            isLoading ? <Loader /> : <FoundMoviesList movies={movies} handleSelectId={handleSelectId} />
          }
        </Box>
        <Box>
          {
            selectedId ?
                <SelectedMovie id={selectedId} watched={watched} handleCloseMovie={handleCloseMovie} onAddMovie={handleAddWatched}/>
                :
                <>
                  <Summary watched={watched}/>
                  <WatchedMoviesList watched={watched} onRemoveMovie={handleRemoveMovie}/>
                </>
          }
        </Box>
      </MainComponent>

      <footer>&copy; All Boobs Reserved; 2024</footer>
    </>
  );
}

function Loader() {
  return (
    <p className="loader">
      Loading...
    </p>
  );
}
