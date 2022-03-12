// Imports
import React from "react";

import "./Input.scss"

// Component
const Input = ({ type, name, onChange }) => {
  return (
    <div className="input-container">
      <label>
        <span>{}</span>
        <input className="input"
          type={type}
          name={name}
          onChange={onChange}
          required
        />
      </label>
      <div></div>
    </div>
  );
};

export default Input;
