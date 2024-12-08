import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import SelectPlayer from '../styles/SelectPlayer'; // Correct import
import AddPlayerForm from './AddPlayerForm';
import TeamList from './TeamList';
import MascotAvatar from './MascotAvatar'; // Import MascotAvatar component
import '../styles/HomePage.css';

const HomePage = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teams, setTeams] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [hoverTile, setHoverTile] = useState(null); // Track hover state for tiles

  useEffect(() => {
    // Fetch players from the API
    axios
      .get('http://localhost:8000/api/players/')
      .then((response) => {
        setPlayers(
          response.data.map((player) => ({
            value: player.id,
            label: `${player.name} (${player.position})`,
            seed: player.name, // Use player name as seed for mascot avatar
          }))
        );
      })
      .catch((error) => {
        console.error('Error fetching players:', error);
        setError('Failed to load players. Please try again later.');
      });
  }, []);

  const handleTileHover = (tileId) => {
    setHoverTile(tileId);
  };

  const handleTileLeave = () => {
    setHoverTile(null);
  };

  const handleAddPlayer = (newPlayer) => {
    setError('');
    setMessage('');

    if (!['Goalkeeper', 'Attacker', 'Defender', 'Player'].includes(newPlayer.position)) {
      setError('Invalid position. Please select a valid position.');
      return;
    }

    axios
      .post('http://localhost:8000/api/players/', newPlayer)
      .then(() => {
        setMessage('Player added successfully!');
        // Reload players without refreshing the page
        axios
          .get('http://localhost:8000/api/players/')
          .then((response) => {
            setPlayers(
              response.data.map((player) => ({
                value: player.id,
                label: `${player.name} (${player.position})`,
                seed: player.name,
              }))
            );
          })
          .catch((error) => {
            console.error('Error reloading players:', error);
            setError('Failed to reload players.');
          });
      })
      .catch((error) => {
        console.error('Error adding player:', error);
        setError('Failed to add player. Please try again.');
      });
  };

  const handleGenerateTeams = () => {
    setError('');
    setMessage('');

    axios
      .post('http://localhost:8000/api/teams/', {
        selected_players: selectedPlayers.map((player) => player.value),
      })
      .then((response) => setTeams(response.data))
      .catch((error) => {
        console.error('Error generating teams:', error);
        setError('Failed to generate teams. Please try again.');
      });
  };

  // Filter out the selected players from the options
  const filteredPlayers = players.filter(
    (player) => !selectedPlayers.some((selected) => selected.value === player.value)
  );

  return (
    <div className="homepage">
      <div
        className={`menu-tile ${hoverTile === 'add-player' ? 'hovered' : ''}`}
        onMouseEnter={() => handleTileHover('add-player')}
        onMouseLeave={handleTileLeave}
      >
        <h1 className="header">Team Generator</h1>
        <AddPlayerForm onAddPlayer={handleAddPlayer} />
      </div>

      <div
        className={`menu-tile ${hoverTile === 'select-players' ? 'hovered' : ''}`}
        onMouseEnter={() => handleTileHover('select-players')}
        onMouseLeave={handleTileLeave}
      >
        <h2>Select Players</h2>
        <Select
          options={filteredPlayers}
          onChange={(selectedOptions) => setSelectedPlayers(selectedOptions || [])}
          placeholder="Search and select players..."
          isMulti
          styles={SelectPlayer}
          formatOptionLabel={({ label, value }) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MascotAvatar seed={value} size={30} /> {/* Use the value as the seed */}
              <span style={{ marginLeft: '10px' }}>{label}</span>
            </div>
          )}
        />

        <div className="selected-players">
          {selectedPlayers.map((player) => (
            <span key={player.value} className="selected-player-badge">
              <MascotAvatar seed={player.value} size={30} /> {/* Use the player's value as the seed */}
                      {player.label}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`menu-tile ${hoverTile === 'generate-teams' ? 'hovered' : ''}`}
        onMouseEnter={() => handleTileHover('generate-teams')}
        onMouseLeave={handleTileLeave}
      >
        <button
          onClick={handleGenerateTeams}
          className="btn-secondary"
          disabled={selectedPlayers.length === 0}
        >
          Generate Teams
        </button>
        {teams && <TeamList teams={teams} />}
      </div>

      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}
    </div>
  );
};

export default HomePage;
