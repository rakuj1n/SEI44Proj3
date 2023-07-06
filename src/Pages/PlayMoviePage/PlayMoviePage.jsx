import { useEffect, useState } from "react";
import KinoloungeNavBar from "../../Components/KinoloungePage/KinoloungeNavbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import Loading from "../../Components/Loading";

export default function PlayMoviePage({ user }) {
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  // const { state } = useLocation();
  //   const [ownsMovie, setOwnsMovie] = useState(false);

  // console.log("passubgStae", state?.item);

  const userId = user._id;
  const { movieId } = useParams();

  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function getAccount() {
      setStatus("loading");
      try {
        const account = await sendRequest(`/api/users/${userId}`, "GET");
        setAccount(account);
        const movieFetchedDetails = await sendRequest(`/api/movies`, "GET");
        setMovie(
          movieFetchedDetails.movies.find((item) => item._id === movieId)
        );
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
    }
    console.log("owned", ownedArr);
  }
  let ownsMovie = ownedArr.includes(movieId);
  console.log(ownsMovie);

  const price = 4.99;
  const currency = "S$";

  const poster = movie.poster;
  const movieTitle = movie.title;
  const CAST = movie?.actor?.join(",");
  const DIRECTOR = movie.director;
  const GENRES = movie?.genre?.join(",");
  const details = movie.details;

  const backgroundStyle = {
    backgroundImage: `url(${poster})`,
    backgroundSize: "cover",
    // position: "absolute",
    // width: "auto",
    height: "2000px",
    // height: "100%",
    filter: `blur(8px)`,
  };

  const handleClick = () => {
    console.log("Return click");
    navigate("/kinolounge");
  };

  const handleBuy_Rent = async () => {
    console.log("ownsmovie", ownsMovie);
    if (ownsMovie) {
      console.log("play", movieId);

      try {
        await sendRequest(`/api/users/${user._id}/movies-watched`, "PUT", {
          movieId: movieId,
        });
      } catch (err) {
        console.log(err);
      }
      const item = movie;
      navigate(`/kinolounge/${movieId}/comments`, {
        state: {
          state: { item },
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
          movieId,
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
      <div className="backgroundImg-playMovie" style={backgroundStyle}></div>
      {/* <div id="PlayRentPageContentContainer"> */}
      {/* <div className="PlayRentPageContentContainer"> */}
      <div id="PlayRentPageContent">
        <img width="50%" src={poster} alt="pic" />
        <h2>{movieTitle}</h2>

        <button onClick={handleBuy_Rent}>
          {ownsMovie ? "Play Movie" : `Rent ${currency}${price}`}
        </button>
        <div>{details}</div>
        <div>GENRE &nbsp; {GENRES}</div>
        <div>MAIN CAST &nbsp;{CAST}</div>
        <div>DIRECTOR &nbsp; {DIRECTOR}</div>
        <button onClick={handleClick} className="return-button">
          Cancel
        </button>
      </div>
      {/* </div> */}
    </>
  );
}
