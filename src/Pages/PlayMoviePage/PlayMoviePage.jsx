import { useEffect, useState } from "react";
import KinoloungeNavBar from "../../Components/KinoloungePage/KinoloungeNavbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import sendRequest from "../../utilities/send-request";

export default function PlayMoviePage({ user }) {
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const { state } = useLocation();
  //   const [ownsMovie, setOwnsMovie] = useState(false);

  const userId = user._id;
  const { movieId } = useParams();

  useEffect(() => {
    async function getAccount() {
      setStatus("loading");
      try {
        const account = await sendRequest(`/api/users/${userId}`, "GET");
        setAccount(account);
      } catch (err) {
        console.log(err);
      }
      setStatus("success");
    }
    getAccount();
  }, [userId]);

  let ownedArr = [];
  if (status === "success") {
    for (let i = 0; i < account?.rentedMovies.length; i++) {
      ownedArr.push(account?.rentedMovies[i]._id);
      console.log("success", account?.rentedMovies[i]._id);
    }
    console.log("owned", ownedArr);
  }
  let ownsMovie = ownedArr.includes(movieId);
  console.log(ownsMovie);

  console.log("movieId", movieId);
  const price = 4.99;
  const currency = "S$";

  const poster = state.movieDetails.poster;
  const movieTitle = state.movieDetails.title;
  const CAST = state.movieDetails.actor.join(",");
  const DIRECTOR = state.movieDetails.director;
  const details = state.movieDetails.details;

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

  if (status === "loading") {
    return <p>loading</p>;
  }

  return (
    <>
      <>play/rent movie page</>;
      <KinoloungeNavBar />
      <div className="PlayRentPageContainer">
        <img width="30%" src={poster} alt="pic" />
        <p>{movieTitle}</p>

        <button onClick={handleBuy_Rent}>
          {ownsMovie ? "Play" : `Rent ${currency}${price}`}
        </button>
      </div>
      <div>{details}</div>
      <div>MAIN CAST {CAST}</div>
      <div>DIRECTOR {DIRECTOR}</div>
      <button onClick={handleClick} className="return-button">
        Cancel
      </button>
    </>
  );
}
