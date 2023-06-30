import KinoloungeNavBar from "../../Components/KinoloungeNavbar";
import KinoCarousel from "../../Components/KinoloungeCarousel";
import FriendCard from "../../Components/FriendCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";

export default function KinoloungePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    async function getMovies() {
      try {
        const movies = await sendRequest(`/api/movies/`, "GET");
        setMovies(movies);
        console.log(movies);
      } catch (err) {
        console.log(err);
      }
    }
    getMovies();
  }, []);
  console.log("movies", movies);

  return (
    <>
      <KinoloungeNavBar />
      Kinolounge page
      <KinoCarousel />
      <h2>Your friends have watched</h2>
      <FriendCard />
      <Link to="/kinolounge/movie/">MovieLink</Link>
    </>
  );
}
