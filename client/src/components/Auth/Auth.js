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

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
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

  const googleError = (res) => {
    console.log(res);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const re = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

  const submitStyle = 
    (isSignup && form.firstName.length >= 1 && form.lastName.length >= 1 && form.email.match(re) && form.password.length >= 6 && form.confirmPassword.length >= 6)
    || (!isSignup && form.email.match(re) && form.password.length >= 6)
    ? "auth-submit"
    : "auth-submit auth-submit-disabled";

  const submitAction = 
  (isSignup && form.firstName.length >= 1 && form.lastName.length >= 1 && form.email.match(re) && form.password.length >= 6 && form.confirmPassword.length >= 6)
  || (!isSignup && form.email.match(re) && form.password.length >= 6);

  return (
    <main className="auth-main">
      <article className="auth-container">
        <div className="auth">
          <div className="auth-form-container">
            <img className="auth-logo" src={logo} alt="logo" />
            <form className="auth-form" onSubmit={handleSubmit}>
              {isSignup && (
                <>
                  <Input type="text" name="firstName" onChange={handleChange} value={form.firstName} />
                  <Input type="text" name="lastName" onChange={handleChange} value={form.lastName} />
                </>
              )}
              <Input type="email" name="email" onChange={handleChange} value={form.email} />
              <Input
                type="password"
                 name="password"
                onChange={handleChange}
                value={form.password}
              />
              {isSignup && (
                <Input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={form.confirmPassword}
                />
              )}
              <button className={submitStyle} type="submit" disabled={!submitAction}>{ isSignup ? "Sign up" : "Log in" }</button>
              <div className="auth-divider">
                <div className="auth-divider-line"></div>
                <div className="auth-divider-text">OR</div>
                <div className="auth-divider-line"></div>
              </div>

              {/* Google OAuth 2.0 */}
              <div className="auth-google-login">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Log in with Google"
                  className="auth-google-oauth"
                  theme="dark"
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </form>
          </div>
          <div className="auth-form-container">
            {isSignup
              ? <div className="auth-account">Have an account? <button className="auth-account-btn" type="button" onClick={switchMode}>Log in</button></div>
              : <div className="auth-account">Don't have an account? <button className="auth-account-btn" type="button" onClick={switchMode}>Sign up</button></div>}
          </div>
        </div>
      </article>
    </main>
  );
};

export default Auth;
