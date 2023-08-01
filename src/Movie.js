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

  const activeStyle = { backgroundColor: "#5b40a3", color: "#fff" };

  return (
    <article onClick={handleClick} style={openedMovie === movie.imdbID ? activeStyle : null}>
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
