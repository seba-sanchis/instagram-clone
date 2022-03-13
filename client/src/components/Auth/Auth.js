// Import
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import { signin, signup} from "../../actions/auth";
import { AUTH } from '../../constants/actionTypes';
import Input from "../Input/Input";
import "./Auth.scss";
import logo from "../../images/logo.png";


// Variables
const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

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
    <main>
      <article className="auth-container">
        {/* <div>{isSignup ? "Sign up" : "Log In"}</div> */}
        <div className="auth">
          <div className="auth-form-container">
            <img className="auth-logo" src={logo} />
            <form className="auth-form" onSubmit={handleSubmit}>
              {isSignup && (
                <>
                  <Input type="text" name="firstName" onChange={handleChange} value={form.firstName} />
                  <Input type="text" name="lastName" onChange={handleChange} value={form.lastName} />
                </>
              )}
              <Input type="email" name="email" onChange={handleChange} value={form.email} />
              <div className="auth-password">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={form.password}
                />
                <button className="auth-password-btn" type="button" onClick={handleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {isSignup && (
                <Input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={form.confirmPassword}
                />
              )}
              <button className="auth-submit-enabled" type="submit">{ isSignup ? "Sign up" : "Log in" }</button>
              <div className="auth-divider">
                <div className="auth-divider-line"></div>
                <div className="auth-divider-text">OR</div>
                <div className="auth-divider-line"></div>
              </div>
              <GoogleLogin
                clientId="247965213317-pijt97o4jejvqjdss4aqb048jhbobf5p.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button type="button" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Sign In</button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
            </form>
          </div>
          <div className="auth-form-container">
            {isSignup
              ? <div>Have an account? <button type="button" onClick={switchMode}>Log in</button></div>
              : <div>Don't have an account? <button type="button" onClick={switchMode}>Sign up</button></div>}
          </div>
        </div>
      </article>
    </main>
  );
};

export default Auth;
