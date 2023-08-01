function WatchedListMovie({ movie, handleDelete, setCloseWList, setOpenedMovie, setCloseWatched }) {
  function handleClick(id) {
    setCloseWList(true);
    setCloseWatched(false);
    setOpenedMovie(id);
  }

  return (
    <li>
      <img src={movie.poster} alt={movie.title} onClick={() => handleClick(movie.imdbID)} />
      <div onClick={() => handleClick(movie.imdbID)}>
        <h3>{movie.title}</h3>
        <p>
          <span>My Rating: </span>
          {movie.selfRating}/10⭐
        </p>
      </div>
      <button onClick={() => handleDelete(movie.imdbID)}>❌</button>
    </li>
  );
}

export default WatchedListMovie;
