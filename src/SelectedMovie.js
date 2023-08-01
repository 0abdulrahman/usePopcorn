import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import LoadingSpinner from "./LoadingSpinner";

function SelectedMovie({ openedMovie, watchedList, setWatchedList, setCloseWatched, setCloseWList }) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [length, setLength] = useState(0);

  const key = "c8cc698c";
  const ratedMovie = watchedList.find((movie) => movie.imdbID === selectedMovie?.imdbID);
  function handleAdd() {
    const isWatched = watchedList.map((movie) => movie.imdbID).includes(openedMovie.imdbID);
    setCloseWatched(true);
    setCloseWList(false);
    if (!isWatched) {
      const newMovie = {
        imdbID: selectedMovie.imdbID,
        title: selectedMovie.Title,
        selfRating: length,
        poster: selectedMovie.Poster,
        runtime: selectedMovie.Runtime,
      };
      setWatchedList((prev) => [...prev, newMovie]);
    }
  }

  useEffect(() => {
    async function getMovie() {
      if (openedMovie === null) return;
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`https://www.omdbapi.com/?i=${openedMovie}&apikey=${key}`);
        if (!response.ok) throw new Error();
        const movie = await response.json();
        if (movie.Response === "False") throw new Error();
        setSelectedMovie(movie);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getMovie();
  }, [openedMovie]);

  return (
    <>
      {loading && <LoadingSpinner autoHeight={true} />}
      {!loading && !error && openedMovie && (
        <div className="selected-movie">
          <div className="img">
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          </div>
          <h2>{selectedMovie.Title}</h2>
          {ratedMovie ? (
            <p
              className="rated-inform
            "
            >
              You've already rated this movie {ratedMovie.selfRating}/10⭐
            </p>
          ) : (
            <>
              <StarRating length={length} setLength={setLength} />
              <button className="add-btn" onClick={handleAdd}>
                Add to my list
              </button>
            </>
          )}
          <ul>
            <li>
              <span>Year:</span> {selectedMovie.Year}
            </li>
            <li>
              <span>Genre:</span> {selectedMovie.Genre}
            </li>
            <li>
              <span>IMDB Rating:</span> {selectedMovie.imdbRating}/10⭐
            </li>
            <li>
              <span>Director(s):</span> {selectedMovie.Director}
            </li>
            <li>
              <span>Plot: </span>
              {selectedMovie.Plot}
            </li>
          </ul>
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
}

export default SelectedMovie;
