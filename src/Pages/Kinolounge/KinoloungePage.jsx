import KinoloungeNavBar from "../../Components/KinoloungePage/KinoloungeNavbar";
import KinoCarousel from "../../Components/KinoloungePage/KinoloungeCarousel";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import MovieCard from "../../Components/MovieCard";
import FriendsWatched from "../../Components/FriendsWatched";
import sendRequest from "../../utilities/send-request";
import ForYou from "../../Components/ForYou";

export default function KinoloungePage({ user }) {
  const [movies, setMovies] = useState([]);
  const [statusFriendList, setStatusFriendList] = useState("idle");
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("idle");
  const [allFollowingMovieRecoList, setAllFollowingMovieRecoList] =
    useState(null);
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
  console.log("movies", movies);
  useEffect(() => {
    async function getAllFollowingMovieRecoList() {
      setStatus("loadingfollowing");
      try {
        const res = await sendRequest(
          `/api/users/${user._id}/your-following-recommended`,
          "GET"
        );
        setAllFollowingMovieRecoList(res[0].moviesRecommended);
      } catch (err) {
        console.log(err);
      }
      setStatus("success");
    }
    getAllFollowingMovieRecoList();
  }, []);

  console.log("ALL FOLLOWIBNG", allFollowingMovieRecoList);
  // let movieRecommendList = [];
  // for (let i = 0; i < allFollowingMovieRecoList.length; i++) {
  //   // console.log(allFollowingMovieRecoList[i]?._id);
  //   movieRecommendList.push(allFollowingMovieRecoList[i]?._id);
  // }
  // console.log("RecommendList", movieRecommendList);

  // console.log("friendsIdArr", friendsIdArr);
  // console.log("friendsNo", friendsNo);
  // console.log("kino account", account);
  return (
    <>
      <KinoloungeNavBar />
      <KinoCarousel />
      <h2 className="friends-watched-banner">Your friends have watched</h2>
      <FriendsWatched moviesWatched={allFollowingMovieRecoList} />

      <h2 className="you-might-be-interested-banner">
        You might be interested in
      </h2>
      <ForYou moviesWatched={movies} />
      {/* <Slider slidesToShow={4} slidesToScroll={1}>
        {movies.movies?.map((movie, index) => (
          <div key={index}>
            <span>
              <MovieCard item={movie} />
            </span>
          </div>
        ))}
      </Slider> */}
      {/* {movies.movies?.map((movie) => (
        <MovieCard item={movie} />
      ))} */}
    </>
  );
}
