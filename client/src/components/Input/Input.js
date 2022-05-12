// Imports
import React, { useState } from "react";

// Component
const Input = ({ type, name, onChange, value }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  
  const Placeholder = () => {
    return name === "firstName"
      ? "First name"
      : name === "lastName"
      ? "Last name"
      : name === "email"
      ? "Email"
      : name === "password"
      ? "Password"
      : name === "confirmPassword"
      ? "Confirm password"
      : null;
  };

  return (
    <div className="input-container">
      <label className="input-label">
        <span
          className={
            value.length === 0
              ? "input-placeholder"
              : "input-placeholder input-placeholder-nonempty"
          }
        >
          <Placeholder />
        </span>
        <input
          className={value.length === 0 ? "input" : "input input-nonempty"}
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          onChange={onChange}
          value={value}
          required
        />
      </label>
      <div className="input-password-container">
        {name === "password" && value.length >= 1 && (
        <div className="input-password">
          <button className="input-password-btn" type="button" onClick={handleShowPassword}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default Input;
