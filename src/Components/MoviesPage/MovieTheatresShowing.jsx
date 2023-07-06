import { Link, useNavigate, useParams } from "react-router-dom";

export default function MovieTheatresShowing({
  movieTitle,
  moviePoster,
  movieId,
}) {
  const navigate = useNavigate();
  const { title } = useParams();
  const theatre = "Shaw Theatres Lido";
  const timing = "11:35 AM";

  function handleClick() {
    navigate(`/movies/${title}/seat-selection`, {
      state: {
        movieTitle: movieTitle,
        moviePoster: moviePoster,
        movieId: movieId,
        theatre: theatre,
        timing: timing,
      },
    });
  }

  return (
    <div>
      <div className="container">
        <div>
          <p>Theatre</p>
        </div>
        <div>
          <p>Timing</p>
        </div>
      </div>
      <div className="containerTheatre">
        <div className="theatre">{theatre}</div>
        <div className="cell" onClick={handleClick}>
          {timing}
        </div>
      </div>
    </div>
  );
}
