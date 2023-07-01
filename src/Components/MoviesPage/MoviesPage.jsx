import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/movies");
      if (response.ok) {
        const data = await response.json();
        console.log(data.movies);
        setMovies(data.movies);
      } else {
        console.error("Failed to fetch movies");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Movies</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie._id.toString()} className="movie-item">
            <Link to={`/movies/${movie._id.toString()}`}>
              <img src={movie.poster} alt={movie.title} />
            </Link>
            <div className="movie-details">
              <Link to={`/movies/${movie._id.toString()}`}>
                <h2>{movie.title}</h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
