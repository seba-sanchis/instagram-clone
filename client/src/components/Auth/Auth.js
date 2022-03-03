// Import
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import { signin, signup} from "../../actions/auth";
import { AUTH } from '../../constants/actionTypes';
import Input from "../Input/Input";

// Variables
const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }

// Component
const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      console.log(form, "auth component")
      dispatch(signup(form, navigate))
    } else {
      dispatch(signin(form, navigate))
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert("Google Sign In was unsuccessful. Try again later");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  return (
    <div>
      <div>{isSignup ? "Sign Up" : "Sign In"}</div>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <Input type="text" name="firstName" onChange={handleChange} />
            <Input type="text" name="lastName" onChange={handleChange} />
          </>
        )}
        <Input type="email" name="email" onChange={handleChange} />
        <div>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
          />
          <button type="button" onClick={handleShowPassword}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {isSignup && (
          <Input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
          />
        )}
        <button type="submit">{ isSignup ? "Sign Up" : "Sign In" }</button>
        <GoogleLogin
          clientId="247965213317-pijt97o4jejvqjdss4aqb048jhbobf5p.apps.googleusercontent.com"
          render={(renderProps) => (
            <button type="button" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Sign In</button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleError}
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
