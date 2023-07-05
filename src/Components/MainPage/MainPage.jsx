import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch("/api/movies");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.movies);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPromotions = async () => {
    try {
      const response = await fetch("/api/promotions");
      if (!response.ok) {
        throw new Error("Failed to fetch promotions");
      }
      const data = await response.json();
      setPromotions(data.promotions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchPromotions();
  }, []);

  return (
    <div>
      {/* Side Nav Bar */}
      <div className="kinolounge">
        <Link to="/kinolounge" className="kinolounge-link">
          Kinolounge
        </Link>
        <Link to="/movies" className="movies-button">
          Movies
        </Link>
        <Link to="/promotions" className="promotions-button">
          Promotions
        </Link>
      </div>

      {/* Movies Carousel */}
      <div className="movies-carousel">
        <p></p>
        {movies.length > 0 ? (
          <Slider {...carouselSettings}>
            {movies
              .filter((movie) => movie.nowShowing)
              .map((movie) => (
                <div key={movie.title}>
                  <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        border: "2px solid black",
                        borderColor: "solid black",
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Link>
                </div>
              ))}
          </Slider>
        ) : (
          <p>No movies available for the carousel</p>
        )}
      </div>

      {/* Now Showing */}
      <div className="now-showing-carousel">
        <h2>Now Showing</h2>
        <hr></hr>
        {movies.length > 4 ? (
          <Slider slidesToShow={4} slidesToScroll={1}>
            {movies
              .filter((movie) => movie.nowShowing)
              .map((movie) => (
                <div key={movie.title}>
                  <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={{
                        maxWidth: "200px",
                        maxHeight: "300px",
                        border: "2px solid black",
                        borderColor: "solid black",
                      }}
                    />
                  </Link>
                </div>
              ))}
          </Slider>
        ) : (
          <div className="movies-row">
            {movies
              .filter((movie) => movie.nowShowing)
              .map((movie) => (
                <div key={movie.title} className="movie-item">
                  <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={{
                        maxWidth: "200px",
                        maxHeight: "300px",
                        border: "2px solid red",
                        borderColor: "solid red",
                      }}
                    />
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Promotion */}
      <div className="promotion-section">
        <h2>Promotions</h2>
        <hr></hr>
        {promotions.length > 4 ? (
          <Slider slidesToShow={4} slidesToScroll={1}>
            {promotions.map((promotion) => (
              <div className="movie-item" key={promotion._id}>
                <Link to={`/promotions/${encodeURIComponent(promotion.title)}`}>
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "300px",
                      border: "2px solid white",
                      borderColor: "solid white",
                    }}
                  />
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="movies-row">
            {promotions.map((promotion) => (
              <div className="movie-item" key={promotion._id}>
                <Link to={`/promotions/${encodeURIComponent(promotion.title)}`}>
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "300px",
                      border: "2px solid white",
                      borderColor: "solid white",
                    }}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Kinolounge */}
      <div className="kinolounge-carousel">
        <h2>KinoLounge</h2>
        <hr></hr>
        {movies.length > 4 ? (
          <Slider slidesToShow={4} slidesToScroll={1}>
            {movies
              .filter((movie) => !movie.nowShowing)
              .map((movie) => (
                <div key={movie.title}>
                  <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={{
                        maxWidth: "200px",
                        maxHeight: "300px",
                        border: "2px solid blue",
                        borderColor: "solid blue",
                      }}
                    />
                  </Link>
                </div>
              ))}
          </Slider>
        ) : (
          <div className="movies-row">
            {movies
              .filter((movie) => !movie.nowShowing)
              .map((movie) => (
                <div key={movie.title} className="movie-item">
                  <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={{
                        maxWidth: "200px",
                        maxHeight: "300px",
                        border: "2px solid blue",
                        borderColor: "solid blue",
                      }}
                    />
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
