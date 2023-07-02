import { useEffect, useState } from "react";
import KinoloungeNavBar from "../../Components/KinoloungePage/KinoloungeNavbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function PlayMoviePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ownsMovie, setOwnsMovie] = useState(false);

  //To pull movie owns or not from db
  useEffect(() => {
    if (state?.movieDetails?.title === "The Witcher" || "Warrior") {
      console.log("owns");
      setOwnsMovie(true);
    }
  }, []);

  const { movieId } = useParams();
  console.log("movieId", movieId);
  const price = 4.99;
  const currency = "S$";

  // to fill/replace in props
  const poster = state.movieDetails.poster;
  const movieTitle = state.movieDetails.title;
  const CAST = state.movieDetails.actor.join(",");
  const DIRECTOR = state.movieDetails.director;
  const details = state.movieDetails.details;
  //   const LANGUAGE = "language_props";

  const handleClick = () => {
    console.log("Return click");
    navigate("/kinolounge");
  };

  const handleBuy_Rent = () => {
    console.log("ownsmovie", ownsMovie);
    if (ownsMovie) {
      console.log("play");
      navigate(`/kinolounge/${movieId}/comments`, {
        state: {
          state,
        },
      });
      //   Then navigate to reviews and commments
    } else {
      console.log("to rent");
      navigate("/payments", {
        state: {
          currency,
          price,
          movieTitle,
          poster,
        },
      });
    }
  };

  return (
    <>
      <>play/rent movie page</>;
      <KinoloungeNavBar />
      <div className="PlayRentPageContainer">
        <img src={poster} alt="pic" />
        <p>{movieTitle}</p>

        <button onClick={handleBuy_Rent}>
          {ownsMovie ? "Play" : `Rent ${currency}${price}`}
        </button>
      </div>
      <div>{details}</div>
      <div>MAIN CAST {CAST}</div>
      <div>DIRECTOR {DIRECTOR}</div>
      {/* <div>LANGUAGE {LANGUAGE}</div> */}
      <button onClick={handleClick} className="return">
        Cancel
      </button>
    </>
  );
}
