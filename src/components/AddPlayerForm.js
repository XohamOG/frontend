// src/components/AddPlayerForm.js
import React, { useState } from 'react';
import PositionSelector from '../components/PositionSelector';
import RatingStars from '../components/RatingStars';
import '../styles/AddPlayerForms.css';

const AddPlayerForm = ({ onAddPlayer }) => {
  const [newPlayer, setNewPlayer] = useState({ name: '', position: '', rating: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlayer(newPlayer);
    setNewPlayer({ name: '', position: '', rating: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="add-player-form">
      <input
        type="text"
        placeholder="Player Name"
        value={newPlayer.name}
        onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
        required
      />
      <PositionSelector onChange={(position) => setNewPlayer({ ...newPlayer, position })} />
      <RatingStars onRate={(rating) => setNewPlayer({ ...newPlayer, rating })} />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default AddPlayerForm;
