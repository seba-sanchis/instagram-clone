// Import
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "./Input";

// Component
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = () => {};

  const handleChange = () => {};

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type:"AUTH", data: { result, token } });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try again later");
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
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
          />
          <button type="button" onClick={handleShowPassword}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </label>
        {isSignup && (
          <Input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
          />
        )}
        <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
        <GoogleLogin
          clientId="247965213317-pijt97o4jejvqjdss4aqb048jhbobf5p.apps.googleusercontent.com"
          render={(renderProps) => (
            <button type="button" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Sign In</button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
        <button type="button" onClick={switchMode}>
          {isSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
