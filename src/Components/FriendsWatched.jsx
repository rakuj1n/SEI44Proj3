import Slider from "react-slick";
import FriendsWatchedCard from "./KinoloungePage/FriendsWatchedCard";

export default function FriendsWatched({ moviesWatched }) {
  console.log("FirnedsWatched", moviesWatched);
  return (
    <>
      {/* To map according to movies watched */}

      <Slider slidesToShow={4} slidesToScroll={1}>
        {moviesWatched.movies?.map((movie, index) => (
          // <div className="movie-item" key={index}>
          <div key={index}>
            <span key={movie._id}>
              <FriendsWatchedCard movieDetails={movie} />
            </span>
          </div>
        ))}
      </Slider>

      {/* {moviesWatched.movies?.map((movie) => (
        <span key={movie._id}>
          <FriendsWatchedCard movieDetails={movie} />
        </span>
      ))} */}
    </>
  );
}
