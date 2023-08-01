import WatchedListMovie from "./WatchedListMovie";

function WatchedList({ watchedList, setWatchedList, closeWList, setCloseWList, setCloseWatched, setOpenedMovie }) {
  function handleDelete(id) {
    const newData = watchedList.filter((movie) => movie.imdbID !== id);
    setWatchedList(newData);
    localStorage.setItem("watchedList", JSON.stringify(newData));
  }

  function handleClose() {
    setCloseWList((prev) => !prev);
    setCloseWatched((prev) => !prev);
  }

  return (
    <>
      <button onClick={handleClose} className="close-watched-list">
        {!closeWList ? "❌ Close watched list" : "🎬 Open watched list"}
      </button>

      {!closeWList && watchedList.length > 0 && (
        <ul className="watched-list">
          {watchedList.map((movie) => (
            <WatchedListMovie
              key={movie.imdbID}
              movie={movie}
              handleDelete={handleDelete}
              setCloseWList={setCloseWList}
              setOpenedMovie={setOpenedMovie}
              setCloseWatched={setCloseWatched}
            />
          ))}
        </ul>
      )}

      {!closeWList && watchedList.length < 1 && <p>No movies were added yet.</p>}
    </>
  );
}

export default WatchedList;
