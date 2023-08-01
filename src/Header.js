import { useEffect, useRef, useState } from "react";
import { useKey } from "./CustomHooks/useKey";

function Header({ setSearchResults, setLoading, setError }) {
  const [search, setSearch] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const searchInput = useRef(null);
  const key = "c8cc698c";
  function handleSearch(e) {
    setSearch(e.target.value);
  }

  useKey("Enter", () => {
    if (document.activeElement === searchInput.current) return;
    searchInput.current.focus();
    setSearch("");
  });

  useEffect(() => {
    const controller = new AbortController();
    async function getMovies() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${search}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(response.message);

        const jsonData = await response.json();
        if (jsonData.Response === "False") throw new Error("Movie not found.");
        setSearchResults(jsonData.Search);
        setTotalResults(jsonData.totalResults);
      } catch (err) {
        setError(err.message);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    }

    if (search.length < 3) {
      setSearchResults([]);
      setTotalResults(0);
      setError("");
      return;
    }

    getMovies();

    return () => {
      controller.abort();
    };
  }, [search, setError, setLoading, setSearchResults]);

  return (
    <header className="fixed-top  shadow">
      <nav className="container d-flex justify-content-between align-items-center gap-2 gap-md-3 ">
        <div className="fw-semibold fs-5">🍿 usePopcorn</div>
        <input
          type="search"
          placeholder="Search movies..."
          className=" flex-fill"
          value={search}
          onChange={(e) => handleSearch(e)}
          ref={searchInput}
        />
        <p className="mb-0 d-none d-md-block">
          Found <span>{totalResults}</span> results
        </p>
      </nav>
    </header>
  );
}

export default Header;
