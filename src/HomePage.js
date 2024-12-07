import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { FaStar } from 'react-icons/fa';

const HomePage = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teams, setTeams] = useState(null);
  const [newPlayer, setNewPlayer] = useState({ name: '', position: '', rating: 0 });
  const [message, setMessage] = useState('');
  const [selectedPositions, setSelectedPositions] = useState([]);
  
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

  const handleAddPlayer = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/players/', newPlayer)
      .then((response) => {
        setMessage('Player added successfully!');
        setPlayers((prev) => [...prev, { value: response.data.id, label: `${response.data.name} (${response.data.position})` }]);
        setNewPlayer({ name: '', position: '', rating: 0 });
      })
      .catch((error) => {
        setMessage(`Error adding player: ${error.message}`);
      });
  };

  const handlePositionChange = (position) => {
    setSelectedPositions((prev) =>
      prev.includes(position) ? prev.filter((pos) => pos !== position) : [...prev, position]
    );
  };

  const handleRatingClick = (rating) => {
    setNewPlayer({ ...newPlayer, rating });
  };

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
      <form onSubmit={handleAddPlayer} className="add-player">
        <h2>Add Player</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
            required
          />
        </div>

        {/* Position Selection as Clickable Labels */}
        <div className="form-group">
          <h4>Select Positions</h4>
          <div className="position-container">
            {['ATT', 'DEF', 'GK'].map((position) => (
              <div
                key={position}
                className={`position-label ${selectedPositions.includes(position) ? 'selected' : ''}`}
                onClick={() => handlePositionChange(position)}
              >
                {position}
              </div>
            ))}
          </div>
          
          {/* Display selected positions */}
          <div>
            <h4>Selected Positions:</h4>
            <ul>
              {selectedPositions.map((position, index) => (
                <li key={index}>{position}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rating Component */}
        <div className="form-group">
          <label>Rating (1 to 5 stars):</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => handleRatingClick(star)}
                style={{
                  color: star <= newPlayer.rating ? '#ffc107' : '#e4e5e9',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                }}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary">
          Add Player
        </button>
      </form>

      {/* Select Players Section */}
      <div className="select-players">
        <h2>Select Players</h2>
        <Select
          options={players}
          onChange={(selectedOptions) => setSelectedPlayers(selectedOptions || [])}
          placeholder="Search and select players..."
          isMulti
        />

        {/* Display Selected Players Below */}
        <div className="selected-players">
          {selectedPlayers.map((player) => (
            <span key={player.value} className="selected-player">
              {player.label}
            </span>
          ))}
        </div>
      </div>

      {/* Generate Teams Button */}
      <button onClick={handleGenerateTeams} className="btn-secondary">
        Generate Teams
      </button>

      {/* Display Teams */}
      {teams && (
        <div className="teams">
          <div className="team">
            <h3>Team 1</h3>
            <ul>
              {teams.team1.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
          <div className="team">
            <h3>Team 2</h3>
            <ul>
              {teams.team2.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Message Feedback */}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default HomePage;
