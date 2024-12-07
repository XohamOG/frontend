// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import SelectPlayer from '../styles/SelectPlayer'; // Correct import
import AddPlayerForm from './AddPlayerForm';
import TeamList from './TeamList';
import '../styles/HomePage.css';

const HomePage = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayer] = useState([]);
  const [teams, setTeams] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/players/')
      .then((response) => {
        setPlayers(
          response.data.map((player) => ({
            value: player.id,
            label: `${player.name} (${player.position})`,
          }))
        );
      })
      .catch((error) => {
        console.error('Error fetching players:', error);
      });
  }, []);

  const handleAddPlayer = (newPlayer) => {
    axios
      .post('http://localhost:8000/api/players/', newPlayer)
      .then(() => {
        setMessage('Player added successfully!');
        window.location.reload(); // Reload to update players
      })
      .catch((error) => {
        console.error('Error adding player:', error);
        setMessage('Error adding player!');
      });
  };

  // Filter out the selected players from the options
  const filteredPlayers = players.filter(
    (player) => !selectedPlayers.some((selected) => selected.value === player.value)
  );

  return (
    <div className="homepage">
      <div className="menu-tile">
        <h1 className="header">Team Generator</h1>
        <AddPlayerForm onAddPlayer={handleAddPlayer} />
      </div>

      <div className="menu-tile">
        <h2>Select Players</h2>
        <Select
          options={filteredPlayers}
          onChange={(selectedOptions) => setSelectedPlayer(selectedOptions || [])}
          placeholder="Search and select players..."
          isMulti
          styles={SelectPlayer} // Apply custom styles here
        />
        <div className="selected-players">
          {selectedPlayers.map((player) => (
            <span key={player.value} className="selected-player-badge">
              {player.label}
            </span>
          ))}
        </div>
      </div>

      <div className="menu-tile">
        <button
          onClick={() =>
            axios
              .post('http://localhost:8000/api/teams/', {
                selected_players: selectedPlayers.map((player) => player.value),
              })
              .then((response) => setTeams(response.data))
              .catch((error) => console.error('Error generating teams:', error))
          }
          className="btn-secondary"
          disabled={selectedPlayers.length === 0}
        >
          Generate Teams
        </button>
        {teams && <TeamList teams={teams} />}
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default HomePage;
