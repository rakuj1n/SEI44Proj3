import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genreOptions, setGenreOptions] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch("/api/movies");
      if (response.ok) {
        const data = await response.json();
        setMovies(data.movies);

        // Extract unique genre values from movies data and sort them in ascending order
        const uniqueGenres = [
          ...new Set(data.movies.map((movie) => movie.genre)),
        ];
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

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

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
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
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
