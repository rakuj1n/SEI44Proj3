import { Link, useNavigate } from "react-router-dom";

export default function FriendsWatchedCard({ movieDetails }) {
  // console.log("details", movieDetails);
  // const navigate = useNavigate();
  // const handleMovieNavigate = () => {
  //   console.log("click");
  //   navigate(`/kinolounge/${movieDetails._id}/`, {
  //     state: {
  //       movieDetails,
  //     },
  //   });
  // };

  return (
    <>
      <Link
        to={`/kinolounge/${movieDetails._id}/`}
        className="friend-watched-container"
        // onClick={handleMovieNavigate}
        state={{ movieDetails }}
      >
        <span>
          <img width="40%" src={movieDetails.poster} alt={movieDetails.title} />
        </span>
      </Link>
      {/* <button
        className="friend-watched-container"
        onClick={handleMovieNavigate}
      >
        <span>
          <img width="40%" src={movieDetails.poster} alt={movieDetails.title} />
        </span>
      </button> */}
    </>
  );
}
