// Imports
import React from "react";
import { Link } from "react-router-dom";

// Component
const Navbar = () => {
  const user = null;

  return (
    <div>
      <Link to="/">Home</Link>
      <div>
        {user ? (
          <div>
            <img src={user.result.imageUrl} alt={user.result.name} />
            <div>{user.result.name}</div>
            <button>Logout</button>
          </div>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
