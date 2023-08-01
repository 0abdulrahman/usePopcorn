import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Header";
import Movie from "./Movie";
import WatchedOverview from "./WatchedOverview";
import LoadingSpinner from "./LoadingSpinner";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [closeMovies, setCloseMovies] = useState(false);
  const [closeWatched, setCloseWatched] = useState(false);
  const [closeWList, setCloseWList] = useState(false);
  const [openedMovie, setOpenedMovie] = useState(null);
  return (
    <>
      <Header setSearchResults={setSearchResults} setLoading={setLoading} setError={setError} />
      <Main>
        <Movies>
          <button onClick={() => setCloseMovies((prev) => !prev)}>-</button>
          {!loading &&
            !error &&
            searchResults &&
            !closeMovies &&
            searchResults.map((movie) => (
              <Movie
                movie={movie}
                key={movie.imdbID}
                openedMovie={openedMovie}
                setOpenedMovie={setOpenedMovie}
                setCloseWList={setCloseWList}
                setCloseWatched={setCloseWatched}
              />
            ))}
          {error && <p>{error}</p>}
          {loading && <LoadingSpinner autoHeight={false} />}
          {closeMovies && <p className="placeholder-p">Content hidden</p>}
          {searchResults.length < 1 && <p className="placeholder-p">Start searching to show content...</p>}
        </Movies>
        <WatchedOverview
          closeWatched={closeWatched}
          setCloseWatched={setCloseWatched}
          openedMovie={openedMovie}
          setOpenedMovie={setOpenedMovie}
          closeWList={closeWList}
          setCloseWList={setCloseWList}
        />
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="container">{children}</main>;
}

function Movies({ children }) {
  return <section>{children}</section>;
}

export default App;
