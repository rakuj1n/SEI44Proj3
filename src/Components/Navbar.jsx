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
      <div>
        <div className="kinolounge">
          <Link to="/mainpage" className="home-link">
            <img
              src="https://www.pngkey.com/png/full/107-1071221_in-may-2011-after-a-seven-month-and.png"
              alt="Home"
              className="home_logo"
              style={{
                width: "250px",
                height: "50px",
                marginRight: "5px",
              }}
            />
          </Link>
          <Link to="/kinolounge" className="kinolounge-link">
            <img
              src="https://kinolounge.shaw.sg/images/common/logo_homepage.png"
              alt="Home"
              className="kinolounge_logo"
              style={{
                width: "200px",
                height: "50px",
                marginRight: "5px",
              }}
            />
          </Link>
          <Link to="/movies" className="movies-button">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRESTZo0HcrNCF65UCh-7DhHLb8WYvl5S02Q&usqp=CAU.png"
              alt="Home"
              className="movies_logo"
              style={{
                width: "50px",
                height: "50px",
                marginRight: "5px",
              }}
            />
          </Link>
          <Link to="/promotions" className="promotions-button">
            <img
              src="https://w7.pngwing.com/pngs/402/607/png-transparent-black-loudspeaker-illustration-computer-icons-promotion-promo-miscellaneous-angle-text-thumbnail.png"
              alt="Home"
              className="promotion_logo"
              style={{
                width: "50px",
                height: "50px",
                marginRight: "5px",
              }}
            />
          </Link>
        </div>
      </div>
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
      <hr></hr>
    </nav>
  );
}
