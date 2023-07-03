import { Link, useLocation } from "react-router-dom";
import * as userService from "../utilities/users-service";
import React, { useState, useEffect } from "react";

export default function Navbar({ user, setUser }) {
  const pathname = useLocation().pathname;
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

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
              {pathname !== "/mainpage" && (
                <button>
                  <Link to="/mainpage">Home</Link>
                </button>
              )}
              {pathname !== `/users/${user._id}` &&
                pathname !== `/users/${user._id}/settings` && (
                  <button>
                    <Link to={`/users/${user._id}`}>My Profile</Link>
                  </button>
                )}
              <button>
                <Link to={`/users/${user._id}/friends`}>My Friends</Link>
              </button>
              {pathname !== `/users/${user._id}` &&
                pathname !== `/users/${user._id}/settings` && (
                  <button>
                    <Link to={`/users/${user._id}/settings`}>Settings</Link>
                  </button>
                )}
              <button>
                <Link to="" onClick={handleLogOut}>
                  Log Out
                </Link>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
