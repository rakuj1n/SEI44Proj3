import { Link } from "react-router-dom";
import * as userService from "../utilities/users-service";
import React, { useState } from "react";

export default function Navbar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav>
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
              <p>Hello, {user.name}</p>
              <Link to={`/users/${user._id}`}>My Profile</Link>
              <Link to={`/users/${user._id}/friends`}>My Friends</Link>
              <Link to={`/users/${user._id}/settings`}>Settings</Link>
              <Link to="" onClick={handleLogOut}>
                Log Out
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
