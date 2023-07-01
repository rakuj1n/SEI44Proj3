import KinoloungeNavBar from "../../Components/KinoloungePage/KinoloungeNavbar";
import KinoCarousel from "../../Components/KinoloungePage/KinoloungeCarousel";

// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../../Components/MovieCard";
import FriendsWatched from "../../Components/FriendsWatched";

export default function KinoloungePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movie data from the backend
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <KinoloungeNavBar />
      Kinolounge page
      <KinoCarousel />
      <h2>Your friends have watched</h2>
      <FriendsWatched moviesWatched={movies} />
      <h2>Trending in Singapore</h2>
      {movies.movies?.map((movie) => (
        <MovieCard item={movie} />
      ))}
    </>
  );
}
