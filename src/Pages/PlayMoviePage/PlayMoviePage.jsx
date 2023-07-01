import { useEffect, useState } from "react";
import KinoloungeNavBar from "../../Components/KinoloungePage/KinoloungeNavbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function PlayMoviePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ownsMovie, setOwnsMovie] = useState(false);
  useEffect(() => {
    if (state?.movieDetails?.title === "The Witcher") {
      console.log("owns");
      setOwnsMovie(true);
    }
  }, []);

  //   const movieId=useParams();
  const price = 4.99;
  const currency = "S$";

  const handleClick = () => {
    console.log("Return click");
    navigate("/kinolounge");
  };

  const handleBuy_Rent = () => {
    console.log("ownsmovie", ownsMovie);
    if (ownsMovie) {
      console.log("play");
      //   Then navigate to reviews
    } else {
      console.log("to rent");
      navigate("/payments", {
        state: {
          currency,
          price,
        },
      });
    }
  };
  // to fill/replace in props
  const poster = state.movieDetails.poster;
  const movieTitle = state.movieDetails.title;
  const CAST = state.movieDetails.actor.join(",");
  const DIRECTOR = state.movieDetails.director;
  const details = state.movieDetails.details;
  //   const LANGUAGE = "language_props";

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
