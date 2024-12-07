// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import AddPlayerForm from './AddPlayerForm'; // Assuming AddPlayerForm is in the same components folder
import TeamList from './TeamList'; // Assuming TeamList is in the same components folder

import '../styles/HomePage.css';

const HomePage = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teams, setTeams] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch players from the API
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/players/')
      .then((response) => {
        setPlayers(response.data.map((player) => ({ value: player.id, label: `${player.name} (${player.position})` })));
      })
      .catch((error) => {
        console.error('Error fetching players:', error);
      });
  }, []); // Empty dependency array means this effect runs only once when the component mounts.

  // Handle generating teams
  const handleGenerateTeams = () => {
    axios
      .post('http://localhost:8000/api/teams/', { selected_players: selectedPlayers.map((player) => player.value) })
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error('Error generating teams:', error);
      });
  };

  // Function to handle adding a player
  const handleAddPlayer = (newPlayer) => {
    // Map short position values to full names
    const positionMapping = {
      'ATT': 'Attacker',
      'DEF': 'Defender',
      'GK': 'Goalkeeper',
    };

    const mappedPlayer = {
      ...newPlayer,
      position: positionMapping[newPlayer.position] || newPlayer.position, // Default to current if not found
    };

    // Send the player data to the server
    axios
      .post('http://localhost:8000/api/players/', mappedPlayer)
      .then((response) => {
        console.log('New player added:', response.data);
        setMessage('Player added successfully!');

        // Reload the page to reflect the newly added player
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding player:', error);
        setMessage('Error adding player!');
      });
  };

  return (
    <div className="homepage">
      <h1 className="header">Team Generator</h1>

      {/* Add Player Form */}
      <AddPlayerForm onAddPlayer={handleAddPlayer} setMessage={setMessage} />

      <div className="select-players">
        <h2>Select Players</h2>
        {/* Dropdown for Searching Players */}
        <Select
          options={players}
          onChange={(selectedOptions) => setSelectedPlayers(selectedOptions || [])}
          placeholder="Search and select players..."
          isMulti
        />

        {/* Display Selected Players Below */}
        <div className="selected-players">
          {selectedPlayers.map((player) => (
            <span key={player.value} className="selected-player-badge">
              {player.label}
            </span>
          ))}
        </div>
      </div>

      {/* Generate Teams Button */}
      <button
        onClick={handleGenerateTeams}
        className="btn-secondary"
        disabled={selectedPlayers.length === 0}
      >
        Generate Teams
      </button>

      {/* Display Teams */}
      {teams && <TeamList teams={teams} />}

      {/* Message Feedback */}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default HomePage;
