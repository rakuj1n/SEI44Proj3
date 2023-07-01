import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainPage = ({ user }) => {
  // const carouselSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  // };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [movies, setMovies] = useState([]);

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
                <div key={movie._id} className="movie-item">
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
      </div>
    </div>
  );
};

export default MainPage;
