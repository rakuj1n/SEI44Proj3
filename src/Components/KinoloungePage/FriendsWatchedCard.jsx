import { useNavigate } from "react-router-dom";

export default function FriendsWatchedCard({ movieDetails }) {
  console.log("details", movieDetails);
  const navigate = useNavigate();
  const handleMovieNavigate = () => {
    navigate("/kinolounge/movie/", {
      state: {
        movieDetails,
      },
    });
  };

  return (
    // to={"}"
    <>
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
