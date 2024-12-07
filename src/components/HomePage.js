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
  }, []);

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

  return (
    <div className="homepage">
      <h1 className="header">Team Generator</h1>

      {/* Add Player Form */}
      <AddPlayerForm setMessage={setMessage} />

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