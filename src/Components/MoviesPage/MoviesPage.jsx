import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genreOptions, setGenreOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async () => {
    try {
      const response = await fetch("/api/movies");
      if (response.ok) {
        const data = await response.json();
        setMovies(data.movies);
        const genresArray = data.movies.map((movie) => movie.genre);
        const flattenedGenres = [].concat(...genresArray);
        const uniqueGenres = Array.from(new Set(flattenedGenres));
        const sortedGenres = uniqueGenres.sort((a, b) => a.localeCompare(b));
        setGenreOptions(["All", ...sortedGenres]);
      } else {
        console.error("Failed to fetch movies");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSelectedGenre("All");
    setSearchTerm("");
  };

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) => movie.genre.includes(selectedGenre));

  const searchResults = filteredMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Movies</h2>
      <div className="filter-container">
        <label htmlFor="genre" className="filter-label">
          Filter by Genre:
        </label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={handleGenreChange}
          className="filter-dropdown"
        >
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <label htmlFor="search" className="filter-label">
          Search:
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="filter-input"
        />
        <button onClick={handleReset} className="reset-button">
          Reset
        </button>
      </div>
      <div className="movies-grid">
        {searchResults.map((movie) => (
          <div key={movie.title} className="movie-item">
            <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-image"
              />
            </Link>
            <div className="all-movie-details">
              <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                <h2 className="movie-title">{movie.title}</h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
