// Imports
import React from 'react';

// Component
const Input = ({ type, name, handleChange }) => {
  return (
    <div>
        <input type={type} name={name} onChange={handleChange} required autoFocus />
    </div>
  )
}

export default Input;