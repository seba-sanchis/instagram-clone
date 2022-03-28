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
            <div className="nav-user" onClick={() => setToggleNav((state) => !state)}>
              <div className={toggleNav && "nav-user-circle"}></div>
              {user.result.imageUrl ? (
                <img className="nav-user-img" src={user.result.imageUrl} alt={user.result.name} />
              ) : (
                <div>{user.result.name.charAt(0)}</div>
              )}
              {toggleNav && (
                <div className="nav-toggle-show">
                  <div className="nav-tools-container">
                    <div className="nav-tools-pointer"></div>
                    <div className="nav-user-tools">
                      <Link className="nav-tool-btn" to="">
                        <svg className="nav-tool-icon" role="img" viewBox="0 0 24 24"><circle className="nav-icon-profile" cx="12.004" cy="12.004" r="10.5"></circle><path className="nav-icon-profile" d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"></path><circle className="nav-icon-profile" cx="12.006" cy="9.718" r="4.109"></circle></svg>
                        <div className="nav-tool-description">Profile</div>
                      </Link>
                      <Link className="nav-tool-btn" to="">
                        <svg className="nav-tool-icon" role="img" viewBox="0 0 24 24"><circle className="nav-icon-settings" cx="12" cy="12" r="8.635"></circle><path className="nav-icon-settings" d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"></path></svg>
                        <div className="nav-tool-description">Settings</div>
                      </Link>
                      <hr className="nav-tool-divider"></hr>
                      <div className="nav-tool-btn">
                        <button className="nav-tool-description" onClick={logout}>Log Out</button>
                      </div>
                    </div>
                  </div>
                </div>
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
