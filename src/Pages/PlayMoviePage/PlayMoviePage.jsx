import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
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
  const CAST = movie?.actor?.join(", ");
  const DIRECTOR = movie.director;
  const GENRES = movie?.genre?.join(", ");
  const details = movie.details;

  const backgroundStyle = {
    backgroundImage: `url(${poster})`,
    backgroundSize: "cover",
    // position: "absolute",
    // width: "auto",
    height: "1500px",
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
      <KinoloungeNavBar />
      <Container maxWidth="lg">
        <div className="backgroundImg-playMovie" style={backgroundStyle}></div>
        <div className="PlayRentPageContent">
          <div className="kinoMovieContainer">
            <div className="kinoImageContainer">
              <img
                id="PlayRentPagePoster"
                src={poster}
                alt="pic"
                className="kinoMoviePoster"
              />
            </div>
            <div className="movieTitleContainer">
              <h1>{movieTitle}</h1>
              <button onClick={handleBuy_Rent}>
                {ownsMovie ? "Play Movie" : `Rent ${currency}${price}`}
              </button>
              <h3>{details}</h3>
              <div className="movieDetails">
                <div className="mainDetails">
                  <h4>MAIN CAST</h4>
                  <h4>{CAST}</h4>
                </div>
                <div className="mainDetails">
                  <h4>DIRECTOR</h4>
                  <h4>{DIRECTOR}</h4>
                </div>
                <div className="mainDetails">
                  <h4>GENRE</h4>
                  <h4>{GENRES}</h4>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleClick} className="return-button">
            Cancel
          </button>
        </div>
      </Container>
    </>
  );
}
