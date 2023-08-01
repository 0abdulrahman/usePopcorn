function WatchedListMovie({ movie, handleDelete }) {
  return (
    <li>
      <img src={movie.poster} alt={movie.title} />
      <div>
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
