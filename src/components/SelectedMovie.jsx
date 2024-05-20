import {useEffect, useRef, useState} from "react";
import StarRating from "./StarRating";
import {useKey} from "../hooks/useKey";

const KEY = "5d64745c";

export default function SelectedMovie({id, handleCloseMovie, onAddMovie, watched}) {
    const isWatched = watched.map((movie) => movie.imdbID).includes(id);
    const [movieDetails, setMovieDetails] = useState({});
    const [userRating, setUserRating] = useState(0);
    const watchedRating = watched.find((movie) => movie.imdbID === id)?.userRating;

    const countRef = useRef(0);


    const {Year: year, Title: title, Poster: poster, Runtime: runtime, imdbRating, Plot: plot,
    Released: released, Actors: actors, Director: director, Genre: genre} = movieDetails;

    function handleAddMovie() {
        const movie = {
            title, poster, year, director, imdbID: id,
            imdbRating: Number(imdbRating), runtime: Number(runtime.split(" ").at(0)), userRating,
            ratingChoices: countRef,
        }

        onAddMovie(movie);
        handleCloseMovie();
    }

    useKey("Escape", handleCloseMovie);

    useEffect(() => {
        async function getMovieDetails(){
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
            const data = await res.json();
            setMovieDetails(data);
        }

        getMovieDetails();
    }, [id]);

    useEffect(() => {
        document.title = `${movieDetails.Title || "Movies"} - usePopcorn`;

        return () => {
            document.title = "usePopcorn";
        }
    }, [movieDetails.Title]);

    useEffect(() => {
        if(userRating > 0) {
            countRef.current += 1;
            console.log(countRef.current);
        }
    }, [userRating])

    return (
      <div className="details">
          <header>
              <button className="btn-back" onClick={handleCloseMovie}>
                  &larr;
              </button>
              <img src={poster} alt={`Poster of ${title}`} />
              <div className="details-overview">
                  <h2>{title}</h2>
                  <p>{released} &bull; {runtime}</p>
                  <p>{genre}</p>
                  <p><span>⭐</span>{imdbRating} IMDB Rating</p>
              </div>
          </header>

          <section>
              <div className="rating">
              {!isWatched ?
                  <>
                          <StarRating max={10} color={"gold"} size={24} onHandleSetMovie={setUserRating} />
                          {
                              userRating > 0 && <button className="btn-add" onClick={handleAddMovie}>Add to list</button>
                          }
                  </>
                  :
                  <>
                      <p>This movie has already been rated: {watchedRating}<span>🌟</span></p>
                  </>

              }
              </div>
              <p><em>{plot}</em></p>
              <p>Starring: {actors}</p>
              <p>Directed by {director}</p>
          </section>
      </div>
    );
}