import { Link } from "react-router-dom";

export default function FriendsWatchedCard({ movieDetails }) {
  return (
    <>
      <Link
        to={`/kinolounge/${movieDetails._id}/`}
        className="friend-watched-container"
        state={{ movieDetails }}
      >
        <span>
          <img width="40%" src={movieDetails.poster} alt={movieDetails.title} />
        </span>
      </Link>
    </>
  );
}
