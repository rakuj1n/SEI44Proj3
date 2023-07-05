import Slider from "react-slick";
import FriendsWatchedCard from "./KinoloungePage/FriendsWatchedCard";

export default function ForYou({ moviesWatched }) {
  return (
    <>
      <Slider
        slidesToShow={4}
        slidesToScroll={1}
        infinite={moviesWatched?.length > 4}
      >
        {moviesWatched?.movies
          ?.filter((movie) => !movie.nowShowing)
          .map((movie, index) => (
            // {moviesWatched?.map((movie, index) => (
            <div className="ForYouLink" key={index}>
              {console.log("nowShowing", movie.nowShowing)}
              <FriendsWatchedCard movieDetails={movie} />
            </div>
          ))}
      </Slider>
    </>
  );
}
