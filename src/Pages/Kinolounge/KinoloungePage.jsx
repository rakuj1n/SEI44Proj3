import KinoloungeNavBar from "../../Components/KinoloungePage/KinoloungeNavbar";
import KinoCarousel from "../../Components/KinoloungePage/KinoloungeCarousel";
import FriendCard from "../../Components/FriendCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import MovieCard from "../../Components/MovieCard";

export default function KinoloungePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movie data from the backend
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error(error));
  }, []);
  console.log("movies", movies);
  console.log("movies1", movies.movies);

  return (
    <>
      <KinoloungeNavBar />
      Kinolounge page
      <KinoCarousel />
      <h2>Your friends have watched</h2>
      <FriendCard />
      <Link to="/kinolounge/movie/">MovieLink</Link>
      <h2>Trending in Singapore</h2>
      {movies.movies?.map((movie) => (
        <MovieCard item={movie} />
        // <div key={movie.id}>test</div>
      ))}
    </>
  );
}
