function Movie({ movie, openedMovie, setOpenedMovie, setCloseWList, setCloseWatched }) {
  function handleClick() {
    setCloseWList(true);
    setCloseWatched(false);
    if (openedMovie === movie.imdbID) {
      setOpenedMovie(null);
    } else {
      setOpenedMovie(movie.imdbID);
    }
  }

  return (
    <article onClick={handleClick}>
      <img src={movie.Poster} alt={movie.Title} />
      <div>
        <h3 className="fs-4">{movie.Title}</h3>
        <span>{movie.Year}</span>
        <p>
          <span>Type: </span>
          {movie.Type}
        </p>
      </div>
    </article>
  );
}

export default Movie;
