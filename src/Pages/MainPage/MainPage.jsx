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
    </div>
  );
};

export default MainPage;
