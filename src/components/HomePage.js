// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import AddPlayerForm from './AddPlayerForm';
import TeamList from './TeamList';
import SelectPlayers from '../styles/SelectPlayers'; // Import SelectPlayers styles
import '../styles/HomePage.css';

const HomePage = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teams, setTeams] = useState(() => {
    // Load teams from local storage if available
    const savedTeams = localStorage.getItem('teams');
    return savedTeams ? JSON.parse(savedTeams) : null;
  });
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

  const handleRemovePlayer = (playerToRemove) => {
    setSelectedPlayers(selectedPlayers.filter((player) => player !== playerToRemove));
  };

  const generateTeams = () => {
    axios
      .post('http://localhost:8000/api/teams/', {
        selected_players: selectedPlayers.map((player) => player.value),
      })
      .then((response) => {
        const generatedTeams = response.data;
        setTeams(generatedTeams);
        // Save the generated teams to local storage
        localStorage.setItem('teams', JSON.stringify(generatedTeams));
      })
      .catch((error) => console.error('Error generating teams:', error));
  };

  return (
    <div className="homepage">
      <div className="menu-tile">
        <h1 className="header">Team Generator</h1>
        <AddPlayerForm onAddPlayer={handleAddPlayer} />
      </div>

      <div className="menu-tile">
        <h2>Select Players</h2>
        <Select
          options={players}
          styles={SelectPlayers} // Apply custom styles
          onChange={(selectedOptions) => setSelectedPlayers(selectedOptions || [])}
          placeholder="Search and select players..."
          isMulti
        />
        <div className="selected-players">
          {selectedPlayers.map((player) => (
            <span key={player.value} className="selected-player-badge">
              {player.label}
              <button onClick={() => handleRemovePlayer(player)} className="remove-player">
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="menu-tile">
        <button
          onClick={generateTeams}
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
