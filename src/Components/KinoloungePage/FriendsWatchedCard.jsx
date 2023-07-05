import { Link } from "react-router-dom";

export default function FriendsWatchedCard({ movieDetails }) {
  const item = movieDetails;
  console.log("item_friendsWatchedCard", item);
  return (
    <>
      <Link
        to={`/kinolounge/${movieDetails._id}/`}
        className="friend-watched-container"
        state={{ item }}
      >
        <span>
          <img width="40%" src={movieDetails.poster} alt={movieDetails.title} />
        </span>
      </Link>
    </>
  );
}
