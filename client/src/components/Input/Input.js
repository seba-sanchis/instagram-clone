// Imports
import React from "react";

import "./Input.scss"

// Component
const Input = ({ type, name, onChange, value }) => {

  const Placeholder = () => {
    return name === "firstName" ? "First name"
    : name === "lastName" ? "Last name"
    : name === "email" ? "Email"
    : name === "password" ? "Password"
    : name === "confirmPassword" ? "Confirm password"
    : null;
  };

  return (
    <div className="input-container">
      <label className="input-label">
        <span className={ value.length === 0 ? "input-placeholder" : "input-placeholder input-placeholder-nonempty"}><Placeholder /></span>
        <input className={ value.length === 0 ? "input" : "input input-nonempty"}
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          required
        />
      </label>
      <div></div>
    </div>
  );
};

export default Input;
