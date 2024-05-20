import {useEffect, useState} from "react";

const KEY = "5d64745c";

export function useMovies(query, callback){
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        callback?.();
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setErr("");
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    {signal: controller.signal});

                if (!res.ok) {
                    throw new Error("Something went wrong with fetching movies!");
                }
                const data = await res.json();

                if (data.Response === "False") {
                    throw new Error("There were no movies found. Try something else!");
                }
                setMovies(data.Search);
            } catch (e) {
                if(e.name !== "AbortError"){
                    setErr(e.message);
                }
            } finally {
                setIsLoading(false);
            }

        }

        if(query.length < 4) {
            setMovies([]);
            setErr("");
            return;
        }

        fetchMovies();

        return () => {
            controller.abort();
        }
    }, [query, callback]);

    return {movies, isLoading, err};
}
