// import { Link } from "react-router-dom";
import FriendsWatchedCard from "./KinoloungePage/FriendsWatchedCard";

export default function FriendsWatched({ moviesWatched }) {
  console.log("Firneds", moviesWatched);
  return (
    <>
      {/* To map according to movies watched */}
      {moviesWatched.movies?.map((movie) => (
        <span key={movie._id}>
          <FriendsWatchedCard movieDetails={movie} />
        </span>
      ))}
    </>
  );
}
