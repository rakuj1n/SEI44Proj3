import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as userService from "../utilities/users-service";
import TheatersIcon from "@mui/icons-material/Theaters";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar({ user, setUser, profilePic }) {
  const navigate = useNavigate();
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

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <nav>
      <div className="user-nav">
        <div></div>
        <div className="holding">
          <div className="main-nav-bar">
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
                alt="Kinolounge"
                className="kinolounge_logo"
                style={{
                  width: "200px",
                  height: "50px",
                  marginRight: "5px",
                }}
              />
            </Link>
            <Link to="/movies" className="movies-button">
              <TheatersIcon
                sx={{ color: "white" }}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "5px",
                }}
              />
            </Link>
            <Link to="/promotions" className="promotions-button">
              <AttachMoneyIcon
                sx={{ color: "white" }}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "5px",
                }}
              />
            </Link>
          </div>
        </div>
        <div className="user-dropdown">
          <button className="user-nav-button" onClick={toggleDropdown}>
            {user && (
              <img
                src={profilePic}
                alt="User Profile"
                className="profile-picture"
              />
            )}
            {!user ? (
              <>
                <span className="sign-in-text" onClick={handleSignIn}>
                  Sign In
                </span>
              </>
            ) : (
              <MenuIcon
                sx={{ color: "white" }}
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                }}
              />
            )}
          </button>
          <div className="navbar-container">
            {isDropdownOpen && user && (
              <div className="dropdown-box">
                <h6 style={{ textAlign: "center" }}>Hello, {user.name}</h6>
                {pathname !== "/mainpage" && (
                  <Link
                    className="user-nav-home"
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/mainpage"
                  >
                    <div>Home</div>
                  </Link>
                )}
                {pathname !== `/users/${user._id}` &&
                  pathname !== `/users/${user._id}/settings` && (
                    <Link
                      className="user-nav-myprofile"
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/users/${user._id}`}
                    >
                      <div>My Profile</div>
                    </Link>
                  )}
                {pathname !== `/users/${user._id}/friends` && (
                  <Link
                    className="user-nav-myfriends"
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/users/${user._id}/friends`}
                  >
                    <div>My Friends</div>
                  </Link>
                )}
                {pathname !== `/users/${user._id}` &&
                  pathname !== `/users/${user._id}/settings` && (
                    <Link
                      className="user-nav-settings"
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/users/${user._id}/settings`}
                    >
                      <div>Settings</div>
                    </Link>
                  )}
                <Link
                  className="user-nav-logout"
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/"
                >
                  <div onClick={handleLogOut}>Log Out</div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr></hr>
    </nav>
  );
}
