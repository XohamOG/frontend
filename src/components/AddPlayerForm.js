// src/components/AddPlayerForm.js
import React, { useState } from 'react';
import PositionSelector from '../components/PositionSelector';
import RatingStars from '../components/RatingStars';
import '../styles/AddPlayerForms.css';

const AddPlayerForm = ({ onAddPlayer }) => {
  const [newPlayer, setNewPlayer] = useState({ name: '', position: '', rating: 0 });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPlayer.name || !newPlayer.position || newPlayer.rating <= 0) {
      setError('Please fill in all fields.');
      return;
    }

    // Pass the new player data back to HomePage component
    onAddPlayer(newPlayer);
    setNewPlayer({ name: '', position: '', rating: 0 });
    setError(''); // Clear error if form is valid
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
      {/* Change onRate to onRatingChange */}
      <RatingStars rating={newPlayer.rating} onRatingChange={(rating) => setNewPlayer({ ...newPlayer, rating })} />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default AddPlayerForm;
