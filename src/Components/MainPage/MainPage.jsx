import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const MainPage = ({ user }) => {
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
          {isDropdownOpen &&
            user && ( // Ensure user is defined
              <div className="dropdown-content">
                <Link to={`/users/${user.id}`}>My Profile</Link>
                <Link to={`/users/${user.id}/friends`}>My Friends</Link>
                <Link to={`/users/${user.id}/settings`}>Settings</Link>
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
        <Link to="/movies" className="movies-button">
          Movies
        </Link>
        <Link to="/promotions" className="promotions-button">
          Promotions
        </Link>
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
