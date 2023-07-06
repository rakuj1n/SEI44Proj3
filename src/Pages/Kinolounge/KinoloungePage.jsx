import KinoloungeNavBar from "../../Components/KinoloungePage/KinoloungeNavbar";
import KinoCarousel from "../../Components/KinoloungePage/KinoloungeCarousel";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import MovieCard from "../../Components/MovieCard";
import FriendsWatched from "../../Components/FriendsWatched";
import sendRequest from "../../utilities/send-request";
import ForYou from "../../Components/ForYou";
import { Link } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";

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

  const followingsRecommendationsList = allFollowingMovieRecoList
    ?.filter((movie) => !movie.nowShowing)
    .map((item) => {
      const avgRating = (
        item.comments
          .map((item) => ({
            rating: item.rating,
            comment: item.comment,
            name: item.userId.name,
            picture: item.userId.picture,
            userid: item.userId._id,
          }))
          .filter((item) =>
            (account
              ? account?.following.map((item) => item._id)
              : []
            ).includes(item.userid)
          )
          .reduce((acc, curr) => acc + curr.rating, 0) /
        item.comments
          .map((item) => ({
            rating: item.rating,
            comment: item.comment,
            name: item.userId.name,
            picture: item.userId.picture,
            userid: item.userId._id,
          }))
          .filter((item) =>
            (account
              ? account?.following.map((item) => item._id)
              : []
            ).includes(item.userid)
          ).length
      ).toFixed(1);

      return (
        // <>
        //   <Slider
        //     slidesToShow={4}
        //     slidesToScroll={1}
        //     infinite={item?.length > 4}
        //   >
        <div className="movieitem" key={isNaN(avgRating) ? "0" : avgRating}>
          <p>
            <strong>{item.title}</strong>
            {/* {JSON.stringify(item)} */}
          </p>
          <Link
            to={`/kinolounge/${item._id}/`}
            className="friend-watched-container"
            state={{ item }}
          >
            <img alt="poster" className="poster" src={item.poster} />
          </Link>
          <p>
            <em>
              Average following's rating:&nbsp;
              <strong>
                {isNaN(avgRating) ? "Not Rated" : avgRating}{" "}
                {isNaN(avgRating) ? "" : <StarOutlined />}
              </strong>
            </em>
          </p>
          <div className="commentsection">
            {item.comments
              .map((item) => ({
                rating: item.rating,
                comment: item.comment,
                name: item.userId.name,
                picture: item.userId.picture,
                userid: item.userId._id,
              }))
              .filter((item) =>
                (account
                  ? account?.following.map((item) => item._id)
                  : []
                ).includes(item.userid)
              )
              .map((item) => (
                <div className="commentsectionitem">
                  <div>
                    <img
                      className="profilepic"
                      src={`${item.picture}`}
                      alt="profilePics"
                    />
                    <p style={{ margin: "0", marginBottom: "0" }}>
                      <strong>{item.rating}</strong> <StarOutlined />
                    </p>
                  </div>
                  <p>
                    {item.name}: <em>"{item.comment}"</em>
                  </p>
                </div>
              ))}
          </div>
        </div>
        //   </Slider>
        // </>
      );
    });

  return (
    <body id="kinoloungePage">
      <KinoloungeNavBar />
      <KinoCarousel />
      <h2 className="friends-watched-banner">Your friends have watched</h2>
      <div className="movielist">
        {!followingsRecommendationsList ? (
          <>
            <small>
              Thank you for using our platform! Currently, we don't have any
              recommendations to display for you. To generate personalized
              recommendations, we suggest following some people who share your
              interests. By doing so, our system will be able to provide you
              with tailored suggestions that align with your preferences. We
              hope this helps enhance your experience on our platform. Happy
              exploring!{" "}
            </small>
            <br />
          </>
        ) : (
          followingsRecommendationsList?.sort((a, b) => b.key - a.key)
        )}
      </div>

      <h2 className="you-might-be-interested-banner">
        You might be interested in
      </h2>
      <ForYou moviesWatched={movies} />
    </body>
  );
}
