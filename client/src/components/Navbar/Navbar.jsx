// Imports
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import * as actionType from '../../constants/actionTypes';
import { getUsersBySearch } from "../../actions/users";

// Component
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [search, setSearch] = useState("");
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
    <div>
      <Link to="/">Home</Link>
      <div>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} placeholder="Search" autoCapitalize="none"/>
      </div>
      <div>
        {user ? (
          <div>
            {user.result.imageUrl ? (
              <img src={user.result.imageUrl} alt={user.result.name} />
            ) : (
              <div>{user.result.name.charAt(0)}</div>
            )}
            <div>{user.result.name}</div>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <Link to="/auth">Sing in</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
