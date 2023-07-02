import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch("/api/movies");
      if (response.ok) {
        const data = await response.json();
        setMovies(data.movies);
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

  return (
    <div>
      <h2>Movies</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.title} className="movie-item">
            <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-image"
              />
            </Link>
            <div className="movie-details">
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
