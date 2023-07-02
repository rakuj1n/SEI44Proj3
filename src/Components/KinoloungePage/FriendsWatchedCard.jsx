import { useNavigate } from "react-router-dom";

export default function FriendsWatchedCard({ movieDetails }) {
  console.log("details", movieDetails);
  const navigate = useNavigate();
  const handleMovieNavigate = () => {
    navigate(`/kinolounge/${movieDetails._id}/`, {
      state: {
        movieDetails,
      },
    });
  };

  return (
    <>
      {/* <Link to={`/kinolounge/${movieDetails._id}`}>
        <span>
          <img src={movieDetails.poster} alt={movieDetails.title} />
        </span>
      </Link> */}
      <button
        className="friend-watched-container"
        onClick={handleMovieNavigate}
      >
        <span>
          <img src={movieDetails.poster} alt={movieDetails.title} />
        </span>
      </button>
    </>
  );
}
