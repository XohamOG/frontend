// src/components/MascotAvatar.js
import React from 'react';

// Function to generate a mascot avatar URL
const generateMascotUrl = (seed) =>
  `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}`;

const MascotAvatar = ({ seed, size = 50 }) => {
  const avatarUrl = generateMascotUrl(seed);

  return (
    <img
      src={avatarUrl}
      alt={`Mascot for ${seed}`}
      width={size}
      height={size}
      style={{ borderRadius: '50%' }}
    />
  );
};

export default MascotAvatar;
