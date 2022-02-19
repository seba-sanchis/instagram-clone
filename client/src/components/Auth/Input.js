// Imports
import React from "react";

// Component
const Input = ({ type, name, onChange }) => {
  return (
    <div>
      <label>
        <input
          type={type}
          name={name}
          onChange={onChange}
          required
        />
      </label>
    </div>
  );
};

export default Input;
