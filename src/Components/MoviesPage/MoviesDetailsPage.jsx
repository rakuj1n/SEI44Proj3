import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@mui/material/Container";
import MovieTheatresShowing from "./MovieTheatresShowing";
import Loading from "../Loading";
import sendRequest from "../../utilities/send-request";

const MoviesDetailsPage = ({ user }) => {
  const [status, setStatus] = useState("idle");
  const [account, setAccount] = useState(null);
  const userId = user._id;
  // console.log("user_moviesDetailsPage", user);
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const { state } = useLocation();
  console.log("state__MoviesDetailsPage", state);
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [showTheatres, setShowTheatres] = useState(false);
  const navigate = useNavigate();
  // Wes
  const movieId = state._id;
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
    }
    console.log("owned", ownedArr);
  }
  let ownsMovie = ownedArr.includes(movieId);
  console.log(ownsMovie);

  const price = 4.99;
  const currency = "S$";
  // Wes
  const fetchMovie = async (movieTitle) => {
    try {
      const response = await fetch(
        `/api/movies?title=${encodeURIComponent(movieTitle)}`
      );
      if (response.ok) {
        const data = await response.json();
        const selectedMovie = data.movies.find(
          (movie) => movie.title === movieTitle
        );
        setMovie(selectedMovie);
      } else {
        console.error("Failed to fetch movie details");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovie(title);
  }, [title]);

  if (!movie) {
    return <Loading />;
  }

  const handleBuyNow = () => {
    setShowTheatres(true);
  };

  const handleRent = () => {
    navigate(`/checkout`, {
      state: {
        currency,
        price,
        movieTitle: movie.title,
        poster: movie.poster,
        movieId: movieId,
      },
    });
  };

  const handlePlay = () => {
    const stateToPass = { item: state };
    console.log("play_statetopass", stateToPass);
    navigate(`/kinolounge/${movieId}/comments`, {
      state: {
        state: stateToPass,
      },
    });
  };

  const buyOrRentButton = movie.nowShowing ? (
    <button className="buy-now-button" onClick={handleBuyNow}>
      Buy Tickets Now
    </button>
  ) : ownsMovie ? (
    <button onClick={handlePlay}>Play Movie</button>
  ) : (
    <button className="rent-button" onClick={handleRent}>
      {`Rent ${currency}${price}`}
    </button>
  );

  return (
    <Container maxWidth="lg">
      <div className="movie-details">
        <div className="movieImageContainer">
          <small>{movie.title}</small>
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
        </div>
        <div className="movieTitleContainer">
          <h1 className="title">{movie.title}</h1>
          <div>{buyOrRentButton}</div>
        </div>
      </div>
      <div className="movieDescriptionContainer">
        <div className="movieDetails">
          <div className="mainDetails">
            <h2 className="detailsText">Synopsis</h2>
            <p>{movie.details}</p>
          </div>
          <div className="mainDetails">
            <h2 className="detailsText">Main Cast</h2>
            <p>{movie.actor.join(", ")}</p>
          </div>
        </div>
        <div className="movieDetails">
          <div className="subDetails">
            <h4 className="detailsText">Director</h4>
            <p>{movie.director}</p>
          </div>
          <div className="subDetails">
            <h4 className="detailsText">Genre</h4>
            <p>{movie.genre.sort().join(", ")}</p>
          </div>
        </div>
      </div>

      <div className="comments">
        <hr />
        <p className="comments-heading">
          <strong>Comments</strong>
        </p>
        {movie.comments.length > 0 ? (
          <Slider {...carouselSettings}>
            {movie.comments.map((comment) => (
              <div key={comment._id}>
                <p>{comment.comment}</p>
                <p>By: {comment.userId.name}</p>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No Comments Yet</p>
        )}
      </div>
      {showTheatres && (
        <MovieTheatresShowing
          movieTitle={movie.title}
          moviePoster={movie.poster}
          movieId={movie._id}
        />
      )}
    </Container>
  );
};

export default MoviesDetailsPage;
