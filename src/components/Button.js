// src/components/Button.js
import React from 'react';
import '../styles/Button.css';

const Button = ({ onClick, children, disabled }) => {
  return (
    <button className="custom-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
