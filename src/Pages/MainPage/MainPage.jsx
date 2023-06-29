import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className="user-nav">
        <div className="user-profile">
          <img src="user-profile-image.jpg" alt="User Profile" />
        </div>
        <div className="user-dropdown">
          <button className="user-nav-button" onClick={toggleDropdown}>
            User Options
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to="/my-account">My Account</Link>
              <Link to="/my-friends">My Friends</Link>
            </div>
          )}
        </div>
      </div>

      <div className="movies-carousel">
        {/* Carousel component to display movies */}
        <Carousel>{/* Render movie images and details */}</Carousel>
      </div>

      <div className="kinolounge">
        <Link to="/kinolounge" className="kinolounge-link">
          Kinolounge
        </Link>
        <button className="movies-button">Movies</button>
        <button className="promotions-button">Promotions</button>
      </div>

      <div className="now-showing-carousel">
        {/* Carousel component to display now showing movies */}
        <Carousel>{/* Render now showing movie images and details */}</Carousel>
      </div>

      <div className="promotion-section">
        {/* Carousel component to display promotional items */}
        <Carousel>{/* Render promotional item images */}</Carousel>
      </div>
    </div>
  );
};

export default MainPage;
