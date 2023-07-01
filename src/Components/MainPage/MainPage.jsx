import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainPage = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [promotions, setPromotions] = useState([
    "https://shawsgqk.gumlet.io/fetch/https://snow-shaw-cdn.azureedge.net/prd/content/images/promotions/default/en-sg/Promotion-photo-1687924767873?w=145&dpr=1.3",
    "https://shawsgqk.gumlet.io/fetch/https://snow-shaw-cdn.azureedge.net/prd/content/images/promotions/default/en-sg/17-photo-1686025585705?w=145&dpr=1.3",
    "https://shawsgqk.gumlet.io/fetch/https://snow-shaw-cdn.azureedge.net/prd/content/images/promotions/default/en-sg/Promotion-photo-1673924882580?w=145&dpr=1.3",
    "https://shawsgqk.gumlet.io/fetch/https://snow-shaw-cdn.azureedge.net/prd/content/images/promotions/default/en-sg/19-photo-1681977760547?w=145&dpr=1.3",
    "https://shawsgqk.gumlet.io/fetch/https://snow-shaw-cdn.azureedge.net/prd/content/images/promotions/default/en-sg/Promotion-photo-1673925224046?w=145&dpr=1.3",
    "https://shawsgqk.gumlet.io/fetch/https://snow-shaw-cdn.azureedge.net/prd/content/images/promotions/default/en-sg/Promotion-photo-1686022927461?w=145&dpr=1.3",
    "https://shawsgqk.gumlet.io/fetch/https://snow-shaw-cdn.azureedge.net/prd/content/images/promotions/default/en-sg/Promotion-photo-1673925312075?w=145&dpr=1.3",
    "https://shawsgqk.gumlet.io/fetch/https://snow-shaw-cdn.azureedge.net/prd/content/images/promotions/default/en-sg/Promotion-photo-1673937754657?w=145&dpr=1.3",
    "https://shawsgqk.gumlet.io/fetch/https://snow-shaw-cdn.azureedge.net/prd/content/images/promotions/default/en-sg/Promotion-photo-1673937965216?w=145&dpr=1.3",
    "https://shawsgqk.gumlet.io/fetch/https://snow-shaw-cdn.azureedge.net/prd/content/images/promotions/default/en-sg/Promotion-photo-1673938041767?w=145&dpr=1.3",
    "https://shawsgqk.gumlet.io/fetch/https://snow-shaw-cdn.azureedge.net/prd/content/images/promotions/default/en-sg/Promotion-photo-1673938708790?w=145&dpr=1.3",
  ]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/movies");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.movies);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="user-nav">
        <div className="user-dropdown">
          <button className="user-nav-button" onClick={toggleDropdown}>
            User Options
          </button>
          {isDropdownOpen && user ? (
            <div className="dropdown-content">
              <div className="user-profile">
                <img
                  src={user.picture}
                  alt="User Profile"
                  className="profile-picture"
                />
              </div>
              <Link to={`/users/${user._id}`}>My Profile</Link>
              <Link to={`/users/${user._id}/friends`}>My Friends</Link>
              <Link to={`/users/${user._id}/settings`}>Settings</Link>
            </div>
          ) : null}
        </div>
      </div>

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

      <div className="now-showing-carousel">
        <h2>Now Showing</h2>
        {movies.length > 4 ? (
          <Slider slidesToShow={4} slidesToScroll={1}>
            {movies
              .filter((movie) => movie.nowShowing)
              .map((movie) => (
                <div key={movie._id}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{ maxWidth: "200px", maxHeight: "300px" }}
                  />
                </div>
              ))}
          </Slider>
        ) : (
          <div className="movies-row">
            {movies
              .filter((movie) => movie.nowShowing)
              .map((movie) => (
                <div key={movie.title} className="movie-item">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{ maxWidth: "200px", maxHeight: "300px" }}
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="promotion-section">
        <h2>Promotions</h2>
        {promotions.length > 4 ? (
          <Slider slidesToShow={4} slidesToScroll={1}>
            {promotions.map((promotion, index) => (
              <div key={index}>
                <img
                  src={promotion}
                  alt={`Promotion ${index + 1}`}
                  style={{ maxWidth: "200px", maxHeight: "300px" }}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="movies-row">
            {promotions.map((promotion, index) => (
              <div className="movie-item" key={index}>
                <img
                  src={promotion}
                  alt={`Promotion ${index + 1}`}
                  style={{ maxWidth: "200px", maxHeight: "300px" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
