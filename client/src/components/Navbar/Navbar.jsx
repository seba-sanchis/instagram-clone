// Imports
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

// Component
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/");

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

  return (
    <div>
      <Link to="/">Home</Link>
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
