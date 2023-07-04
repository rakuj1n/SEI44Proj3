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
            User Options
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              {!user && pathname === "/" ? (
                <button>
                  <Link to="/login">Login</Link>
                </button>
              ) : (
                <>
                  {user && (
                    <div className="user-profile">
                      <img
                        src={user.picture}
                        alt="User Profile"
                        className="profile-picture"
                      />
                    </div>
                  )}
                  {user && <p>Hello, {user.name}</p>}
                  {pathname !== "/mainpage" && (
                    <button>
                      <Link to="/mainpage">Home</Link>
                    </button>
                  )}
                  {user &&
                    pathname !== `/users/${user._id}` &&
                    pathname !== `/users/${user._id}/settings` && (
                      <button>
                        <Link to={`/users/${user._id}`}>My Profile</Link>
                      </button>
                    )}
                  {user && pathname !== `/users/${user._id}/friends` && (
                    <button>
                      <Link to={`/users/${user._id}/friends`}>My Friends</Link>
                    </button>
                  )}
                  {user &&
                    pathname !== `/users/${user._id}` &&
                    pathname !== `/users/${user._id}/settings` && (
                      <button>
                        <Link to={`/users/${user._id}/settings`}>Settings</Link>
                      </button>
                    )}
                  {user && (
                    <button onClick={handleLogOut}>
                      <Link to="/">Log Out</Link>
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
