// Import
import React, { useState } from "react";

import Input from "./Input";

// Component
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = () => {};

  const handleChange = () => {};

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  return (
    <div>
      <div>{isSignup ? "Sign Up" : "Sign In"}</div>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <Input type="text" name="firstName" onChange={handleChange} />
        )}
        <Input type="email" name="email" onChange={handleChange} />
        <label>
          <Input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} />
          <button type="button" onClick={handleShowPassword}>{showPassword ? "Hide" : "Show"}</button>
        </label>
        {isSignup && (
          <Input type="password" name="confirmPassword" onChange={handleChange} />
        )}
          <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
          <button type="button" onClick={switchMode}>
            {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
      </form>
    </div>
  );
};

export default Auth;
