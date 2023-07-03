import { useEffect, useState } from "react";
import KinoloungeNavBar from "../../Components/KinoloungePage/KinoloungeNavbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import Loading from "../../Components/Loading";

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

  const backgroundStyle = {
    backgroundImage: `url(${poster})`,
    backgroundSize: "cover",

    position: "absolute",
    // width: "auto",
    // height: "auto",
  };
  const containerStyle = {
    // filter: "none",
    // filter: `blur(8px)`,
  };

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
      navigate("/checkout", {
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
    return <Loading />;
    // return <p>loading</p>;
  }

  return (
    <>
      {/* <>play/rent movie page</>; */}
      <KinoloungeNavBar />
      <div className="BackgroundContainer" style={backgroundStyle}>
        {/* <div className="BackgroundContainer" > */}
        <div className="PlayRentPageContainer">
          <img width="30%" src={poster} alt="pic" />
          <h2>{movieTitle}</h2>

          <button onClick={handleBuy_Rent}>
            {ownsMovie ? "Play" : `Rent ${currency}${price}`}
          </button>
          <div>{details}</div>
          <div>MAIN CAST &nbsp;{CAST}</div>
          <div>DIRECTOR &nbsp; {DIRECTOR}</div>
          <button onClick={handleClick} className="return-button">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
