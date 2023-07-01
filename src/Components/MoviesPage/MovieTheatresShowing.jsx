import { useNavigate } from "react-router-dom";

export default function MovieTheatresShowing() {
  const theatres = [
    "Shaw Theatres Lido",
    "Shaw Theatres Balestier",
    "Shaw Theatres Jewel",
    "Shaw Theatres Paya Lebar Quarter",
  ];

  const timings = [
    ["10:50 AM", "11:35 AM", "11:50 AM", "12:20 PM", "01:50 PM", "02:15 PM"],
    ["10:30 AM", "11:15 AM", "01:30 PM", "02:15PM", "03:20 PM", "04:10 PM"],
    ["10:30 AM", "11:15 AM", "12:25 PM", "01:20 PM", "03:00 PM", "03:25 PM"],
    ["10:20 AM", "11:00 AM", "12:10 PM", "01:20 PM", "02:00 PM", "03:10 PM"],
  ];

  const navigate = useNavigate();

  function handleClick() {
    navigate("/movies/:movieId/seat-selection");
  }

  return (
    <div className="container">
      <p>Theatre</p>
      <p>Timing</p>
      <div>
        {theatres.map((theatre) => (
          <div className="theatre" key={theatre}>
            {theatre}
          </div>
        ))}
      </div>
      <div>
        {timings.map((timing) => (
          <div>
            {timing.map((time) => (
              <div
                className="cell"
                key={time}
                value={time}
                onClick={handleClick}
              >
                {time}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
