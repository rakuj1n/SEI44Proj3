import Slider from "react-slick";
import FriendsWatchedCard from "./KinoloungePage/FriendsWatchedCard";

export default function FriendsWatched({ moviesWatched }) {
  console.log("FirnedsWatched", moviesWatched);
  return (
    <>
      <Slider
        slidesToShow={4}
        slidesToScroll={1}
        infinite={moviesWatched?.length > 4}
      >
        {/* {moviesWatched?.movies?.map((movie, index) => ( */}
        {moviesWatched?.map((movie, index) => (
          <div key={index}>
            <span key={movie._id}>
              <FriendsWatchedCard movieDetails={movie} />
            </span>
          </div>
        ))}
      </Slider>
    </>
  );
}
