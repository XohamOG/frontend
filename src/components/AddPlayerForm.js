// src/components/AddPlayerForm.js
import React, { useState } from 'react';
import PositionSelector from '../components/PositionSelector';
import RatingStars from '../components/RatingStars';
import '../styles/AddPlayerForms.css';

const AddPlayerForm = ({ onAddPlayer }) => {
  const [newPlayer, setNewPlayer] = useState({ name: '', position: '', rating: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlayer(newPlayer); // Pass the new player to the parent component
    setNewPlayer({ name: '', position: '', rating: 0 }); // Reset form after submitting
  };

  // Check if the form is complete (name, position, and rating are selected)
  const isFormValid = newPlayer.name && newPlayer.position && newPlayer.rating > 0;

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
      <RatingStars
        rating={newPlayer.rating}
        onRatingChange={(rating) => setNewPlayer({ ...newPlayer, rating })}
      />
      <button type="submit" disabled={!isFormValid}>Add Player</button>
    </form>
  );
};

export default AddPlayerForm;
