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
  //   let promises = [];
  //   for (let i = 0; i <= friendsNo; i++) {
  //     promises.push(
  //       sendRequest(`/api/users/${account?.following[i]?._id}`, "GET")
  //     );
  //     //   }

  //     Promise.all(promises)
  //       .then(function handleData(data) {
  //         return fetch(`/api/users/`) // should be returned 1 time
  //           .then((response) => {
  //             if (response.ok) return response.json();
  //             throw new Error(response.statusText);
  //           });
  //       })
  //       .catch(function handleError(error) {
  //         console.log("Error" + error);
  //       });
  //   }
  //   console.log("friendsIdArr", FriendRecommended);
  console.log("friendsIdArr", friendsIdArr);
  console.log("friendsNo", friendsNo);
  console.log("kino account", account);
  return (
    <>
      <KinoloungeNavBar />
      <KinoCarousel />
      <h2 className="friends-watched-banner">Your friends have watched</h2>
      <FriendsWatched moviesWatched={movies} />
      <h2 className="you-might-be-interested-banner">
        You might be interested in
      </h2>
      <a id="For-you" />
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
