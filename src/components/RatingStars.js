// src/components/RatingStars.js
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/RatingStars.css';

const RatingStars = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleClick = (value) => {
    onRatingChange(value); // Pass the rating to the parent component
  };

  const handleMouseEnter = (value) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`star ${i <= (hoveredRating || rating) ? 'filled' : ''}`}
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        />
      );
    }
    return stars;
  };

  return <div className="rating">{renderStars()}</div>;
};

export default RatingStars;
