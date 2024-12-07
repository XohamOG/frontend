// src/components/PositionSelector.js
import React, { useState } from 'react';
import '../styles/PositionSelector.css';

const PositionSelector = ({ onChange }) => {
  // Positions array
  const positions = [
    { label: 'ATT', value: 'Attacker' },
    { label: 'DEF', value: 'Defender' },
    { label: 'GK', value: 'Goalkeeper' },
  ];

  const [selectedPosition, setSelectedPosition] = useState('');

  const handleClick = (position) => {
    setSelectedPosition(position.value); // Update selected position
    onChange(position.value); // Notify parent of the change
  };

  return (
    <div className="position-selector">
      {positions.map((position) => (
        <span
          key={position.value}
          className={`position-label ${selectedPosition === position.value ? 'selected' : ''}`}
          onClick={() => handleClick(position)}
        >
          {position.label}
        </span>
      ))}
    </div>
  );
};

export default PositionSelector;