import KinoloungeNavBar from "../../Components/KinoloungePage/KinoloungeNavbar";
import KinoCarousel from "../../Components/KinoloungePage/KinoloungeCarousel";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import MovieCard from "../../Components/MovieCard";
import FriendsWatched from "../../Components/FriendsWatched";
import sendRequest from "../../utilities/send-request";

export default function KinoloungePage({ user }) {
  const [movies, setMovies] = useState([]);
  const [statusFriendList, setStatusFriendList] = useState("idle");
  const [account, setAccount] = useState(null);
  //   const [friendAccount, setFriendAccount] = useState(null);

  useEffect(() => {
    // Fetch movie data from the backend
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error(error));
  }, []);

  // This useEffect gets the user details and so their following
  useEffect(() => {
    async function getAccount() {
      setStatusFriendList("loading");
      try {
        const account = await sendRequest(`/api/users/${user._id}`, "GET");
        setAccount(account);
      } catch (err) {
        console.log(err);
      }
      setStatusFriendList("success");
    }
    getAccount();
  }, []);

  let friendsNo = account?.following.length;

  let friendsIdArr = [];
  for (let i = 0; i < friendsNo; i++) {
    friendsIdArr.push(account?.following[i]._id);
  }

  //   console.log("friendsIdArr", FriendRecommended);
  console.log("friendsIdArr", friendsIdArr);
  console.log("friendsNo", friendsNo);
  console.log("kino account", account);
  return (
    <>
      <KinoloungeNavBar />
      Kinolounge page
      <KinoCarousel />
      <h2>Your friends have watched</h2>
      <FriendsWatched moviesWatched={movies} />
      <h2>You might be interested in</h2>
      <Slider slidesToShow={4} slidesToScroll={1}>
        {movies.movies?.map((movie, index) => (
          // <div className="movie-item" key={index}>
          <div key={index}>
            <span>
              <MovieCard item={movie} />
            </span>
          </div>
        ))}
      </Slider>
      {/* {movies.movies?.map((movie) => (
        <MovieCard item={movie} />
      ))} */}
    </>
  );
}
