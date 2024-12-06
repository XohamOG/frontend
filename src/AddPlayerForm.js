import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPlayerForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  // Fetch players from the API for search functionality
  useEffect(() => {
    if (searchTerm) {
      axios.get(`http://localhost:8000/api/players/?search=${searchTerm}`)
        .then(response => {
          setPlayers(response.data);  // Update the list of players based on the search term
        })
        .catch(error => {
          setError('Error fetching players: ' + error.message);
        });
    } else {
      setPlayers([]);  // Reset player list when search term is cleared
    }
  }, [searchTerm]);

  // Handle form submission to either add a new player or select an existing one
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedPlayer) {
      // Player is selected from the search list, no need to add a new player
      setSuccess(`Player "${selectedPlayer.name}" selected for team formation.`);
      setName('');
      setPosition('');
      setSelectedPlayer(null);
    } else {
      // Add new player to the database
      const newPlayer = {
        name: name,
        position: position,
      };

      axios.post('http://localhost:8000/api/players/', newPlayer)
        .then(response => {
          setSuccess('Player added successfully!');
          setName('');
          setPosition('');
        })
        .catch(error => {
          setError('Error adding player: ' + error.message);
        });
    }
  };

  return (
    <div>
      <h2>Add or Select a Player</h2>

      {/* Search for existing players */}
      <div>
        <label>Search for Player: </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a player..."
        />
        {players.length > 0 && (
          <ul>
            {players.map((player) => (
              <li key={player.id} onClick={() => setSelectedPlayer(player)}>
                {player.name} ({player.position})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* If no player is selected, show the form to add a new player */}
      {!selectedPlayer && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Position: </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

      {/* Feedback */}
      {success && <div>{success}</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default AddPlayerForm;
