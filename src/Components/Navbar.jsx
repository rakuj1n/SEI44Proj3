import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as userService from "../utilities/users-service";

export default function Navbar({ user, setUser }) {
  const pathname = useLocation().pathname;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = () => {
    userService.logOut();
    setUser(null);
  };

  return (
    <nav>
      <div className="user-nav">
        <div className="user-dropdown">
          <button className="user-nav-button" onClick={toggleDropdown}>
            {user && (
              <img
                src={user.picture}
                alt="User Profile"
                className="profile-picture"
              />
            )}
            User Menu
          </button>
          <div className="navbar-container">
            {isDropdownOpen && (
              <div className="dropdown-box">
                {!user && pathname === "/" ? (
                  <button className="user-nav-login">
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to="/login"
                    >
                      Login
                    </Link>
                  </button>
                ) : (
                  <>
                    {user && (
                      <p style={{ textAlign: "center" }}>Hello, {user.name}</p>
                    )}
                    {pathname !== "/mainpage" && (
                      <button className="user-nav-home">
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to="/mainpage"
                        >
                          Home
                        </Link>
                      </button>
                    )}
                    {user &&
                      pathname !== `/users/${user._id}` &&
                      pathname !== `/users/${user._id}/settings` && (
                        <button className="user-nav-myprofile">
                          <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/users/${user._id}`}
                          >
                            My Profile
                          </Link>
                        </button>
                      )}
                    {user && pathname !== `/users/${user._id}/friends` && (
                      <button className="user-nav-myfriends">
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to={`/users/${user._id}/friends`}
                        >
                          My Friends
                        </Link>
                      </button>
                    )}
                    {user &&
                      pathname !== `/users/${user._id}` &&
                      pathname !== `/users/${user._id}/settings` && (
                        <button className="user-nav-settings">
                          <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/users/${user._id}/settings`}
                          >
                            Settings
                          </Link>
                        </button>
                      )}
                    {user && (
                      <button
                        className="user-nav-logout"
                        onClick={handleLogOut}
                      >
                        <Link
                          style={{ textDecoration: "none", color: "inherit" }}
                          to="/"
                        >
                          Log Out
                        </Link>
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
