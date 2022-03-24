// Imports
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import * as actionType from '../../constants/types';
import { getUsersBySearch } from "../../actions/users";
import "./Navbar.scss";
import logo from "../../images/logo.png";

// Component
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [search, setSearch] = useState("");
  const [toggleNav, setToggleNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const searchUsers = () => {
    if (search.trim()) {
      dispatch(getUsersBySearch({search}));
    } else {
      navigate("/");
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchUsers();
    }
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
        <div className="nav-search">
          <div className="nav-search-btn">
            <svg className="nav-search-icon" role="img" viewBox="0 0 24 24"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"></path><line x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
          </div>
          <input className="nav-search-input" type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} placeholder="Search" autoCapitalize="none"/>
        </div>
        <div className="nav-menu">
          {user ? (
            <div onClick={() => setToggleNav((state) => !state)}>
              {user.result.imageUrl ? (
                <img className="nav-user-img" src={user.result.imageUrl} alt={user.result.name} />
              ) : (
                <div>{user.result.name.charAt(0)}</div>
              )}
              {toggleNav && (
                <button onClick={logout}>Logout</button>
              )}
            </div>
          ) : (
            <Link to="/auth">Sing in</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
