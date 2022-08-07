// Imports
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import * as actionType from '../../constants/types';
import { getUsersBySearch } from "../../actions/users";
import logo from "../../images/logo.png";
import Form from "../Form/Form"

// Component
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [search, setSearch] = useState("");
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
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

  useEffect(() => {
    setToggleForm(false)
  }, [navigate]);

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
            <>
              <Link to="/">
                <svg className={window.location.pathname === "/" && !toggleForm ? "nav-icon-filled" : "nav-icon-unfilled"} role="img" viewBox="0 0 24 24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path></svg>
              </Link>
              <Link className="nav-user" to="">
                <svg aria-label="Messenger" className="nav-icon-filled" role="img" viewBox="0 0 24 24"><path className="nav-icon-messenger" d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z"></path><path className="nav-icon-rule" d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z"></path></svg>
              </Link>

              {/* Toggle Form */}
              <button className="nav-user" onClick={() => setToggleForm(true)}>
                {toggleForm ? (
                  <svg aria-label="New post" className="nav-icon-filled" role="img" viewBox="0 0 24 24"><path d="M12.003 5.545l-.117.006-.112.02a1 1 0 00-.764.857l-.007.117V11H6.544l-.116.007a1 1 0 00-.877.876L5.545 12l.007.117a1 1 0 00.877.876l.116.007h4.457l.001 4.454.007.116a1 1 0 00.876.877l.117.007.117-.007a1 1 0 00.876-.877l.007-.116V13h4.452l.116-.007a1 1 0 00.877-.876l.007-.117-.007-.117a1 1 0 00-.877-.876L17.455 11h-4.453l.001-4.455-.007-.117a1 1 0 00-.876-.877zM8.552.999h6.896c2.754 0 4.285.579 5.664 1.912 1.255 1.297 1.838 2.758 1.885 5.302L23 8.55v6.898c0 2.755-.578 4.286-1.912 5.664-1.298 1.255-2.759 1.838-5.302 1.885l-.338.003H8.552c-2.754 0-4.285-.579-5.664-1.912-1.255-1.297-1.839-2.758-1.885-5.302L1 15.45V8.551c0-2.754.579-4.286 1.912-5.664C4.21 1.633 5.67 1.05 8.214 1.002L8.552 1z"></path></svg>
                ) : (
                  <svg aria-label="New Post" className="nav-icon-filled" role="img" viewBox="0 0 24 24"><path className="nav-icon-stroke" d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"></path><line className="nav-icon-stroke" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line className="nav-icon-stroke" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                )
                }
               </button>
               {toggleForm && (
                 <div className="form-container">
                  {document.body.style.overflow = "hidden"}
                  <div className="form-background" onClick={() => setToggleForm(false)}></div>
                  <Form />
                 </div>
              )}
              <Link className="nav-user" to="">
                <svg aria-label="Find People" className="nav-icon-filled" role="img" viewBox="0 0 24 24"><polygon className="nav-icon-stroke" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"></polygon><polygon className="nav-icon-rule" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle className="nav-icon-stroke" cx="12.001" cy="12.005" r="10.5"></circle></svg>
              </Link>
              <Link className="nav-user" to="">
                <svg aria-label="Activity Feed" className="nav-icon-filled" role="img" viewBox="0 0 24 24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
              </Link>

              {/* Toggle Nav */}
              <div className="nav-user" onClick={() => setToggleNav((state) => !state)}>
                <div className={toggleNav ? "nav-user-circle" : undefined}></div>
                {user.result.imageUrl ? (
                  <img className="nav-user-img" src={user.result.imageUrl} alt={user.result.name} />
                ) : (
                  <div className="nav-user-character">{user.result.name.charAt(0)}</div>
                )}
               {toggleNav && (
                 <div className="nav-toggle-show">
                    <div className="nav-toggle-hide"></div>
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
            </>
          ) : (
            window.location.pathname !== "/auth" ? <Link to="/auth">Sing in</Link> : undefined
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
