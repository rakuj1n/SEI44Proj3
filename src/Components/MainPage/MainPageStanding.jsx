import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../Navbar";

const MainPageStanding = () => {
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
      console.error(error.message);
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
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchPromotions();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Movies Carousel */}
      <div className="movies-carousel">
        <p></p>
        {movies.length > 0 ? (
          <Slider {...carouselSettings}>
            {movies
              .filter((movie) => movie.nowShowing)
              .map((movie) => (
                <div key={movie.title} className="image-container">
                  <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <img
                      src={movie.poster2}
                      alt={movie.title}
                      style={{
                        border: "2px solid black",
                        borderColor: "solid black",
                        objectFit: "cover",
                        width: "90%",
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
                      style={{ maxWidth: "200px", maxHeight: "300px" }}
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
                      style={{ maxWidth: "200px", maxHeight: "300px" }}
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
          <Slider slidesToShow={6} slidesToScroll={1}>
            {promotions.map((promotion) => (
              <div className="movie-item" key={promotion._id}>
                <Link to={`/promotions/${encodeURIComponent(promotion.title)}`}>
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    style={{ maxWidth: "200px", maxHeight: "300px" }}
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
                    style={{ maxWidth: "200px", maxHeight: "300px" }}
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
          <Slider slidesToShow={6} slidesToScroll={1}>
            {movies
              .filter((movie) => !movie.nowShowing)
              .map((movie) => (
                <div key={movie.title}>
                  <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={{ maxWidth: "200px", maxHeight: "300px" }}
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
                      style={{ maxWidth: "200px", maxHeight: "300px" }}
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

export default MainPageStanding;
