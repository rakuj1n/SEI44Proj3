import { useState } from "react";
import KinoloungeNavBar from "../../Components/KinoloungeNavbar";
import { useNavigate, useParams } from "react-router-dom";

export default function PlayMoviePage() {
  const navigate = useNavigate();
  const [ownsMovie, setOwnsMovie] = useState(false);
  //   const movieId=useParams();
  const price = 4.99;
  const currency = "S$";

  const handleClick = () => {
    console.log("Return click");
  };

  const handleBuy_Rent = () => {
    console.log("ownsmovie", ownsMovie);
    if (ownsMovie) {
      console.log("play");
    } else {
      console.log("to rent");
      // navigate("/payments", state:{price});
      navigate("/payments", {
        state: {
          currency,
          price,
        },
      });
    }
  };
  // to fill/replace in props
  const CAST = "cast_props";
  const DIRECTOR = "director_props";
  const LANGUAGE = "language_props";

  return (
    <>
      <>play/rent movie page</>;
      <KinoloungeNavBar />
      <div className="PlayRentPageContainer">
        <img src="https://picsum.photos/id/237/200/300" alt="pic" />
        <p>Title</p>

        <button onClick={handleBuy_Rent}>
          {ownsMovie ? "Play" : `Rent ${currency}${price}`}
        </button>
      </div>
      <div>MAIN CAST {CAST}</div>
      <div>DIRECTOR {DIRECTOR}</div>
      <div>LANGUAGE {LANGUAGE}</div>
      <button onClick={handleClick} className="return">
        Cancel
      </button>
    </>
  );
}
