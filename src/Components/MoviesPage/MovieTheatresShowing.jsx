import { useNavigate, useParams } from "react-router-dom";

export default function MovieTheatresShowing({ movieTitle, moviePoster }) {
  const navigate = useNavigate();
  const { title } = useParams();
  const theatre = "Shaw Theatres Lido";
  const timing = "11:35 AM";

  function handleClick() {
    navigate(`/movies/${title}/seat-selection`, {
      state: {
        movieTitle: movieTitle,
        moviePoster: moviePoster,
        theatre: theatre,
        timing: timing,
      },
    });
  }

  return (
    <div className="container">
      <p>Theatre</p>
      <p>Timing</p>
      <div>
        <div className="theatre">{theatre}</div>
      </div>
      <div>
        <div className="cell" onClick={handleClick}>
          {timing}
        </div>
      </div>
    </div>
  );
}
