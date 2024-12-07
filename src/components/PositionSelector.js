// src/components/PositionSelector.js
import React, { useState } from 'react';
import '../styles/PositionSelector.css';

const PositionSelector = ({ onChange }) => {
  const positions = ['ATT', 'DEF', 'GK'];
  const [selectedPosition, setSelectedPosition] = useState('');

  const handleClick = (position) => {
    setSelectedPosition(position);
    onChange(position);
  };

  return (
    <div className="position-selector">
      {positions.map((position) => (
        <span
          key={position}
          className={`position-label ${selectedPosition === position ? 'selected' : ''}`}
          onClick={() => handleClick(position)}
        >
          {position}
        </span>
      ))}
    </div>
  );
};

export default PositionSelector;
