import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPlayerForm = () => {
  const [players, setPlayers] = useState([]); // Store all players from the database
  const [selectedPlayers, setSelectedPlayers] = useState([]); // Store selected players for team generation
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [teams, setTeams] = useState(null); // Store generated teams
  const [message, setMessage] = useState(''); // Success/Error messages

  // Fetch players from the database
  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = () => {
    axios.get('http://localhost:8000/api/players/')
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        setMessage('Error fetching players: ' + error.message);
      });
  };

  // Add a new player to the database
  const handleAddPlayer = (e) => {
    e.preventDefault();
    const newPlayer = { name, position };

    axios.post('http://localhost:8000/api/players/', newPlayer)
      .then(response => {
        setMessage('Player added successfully!');
        setName('');
        setPosition('');
        fetchPlayers(); // Refresh player list
      })
      .catch(error => {
        setMessage('Error adding player: ' + error.message);
      });
  };

  // Handle player selection
  const togglePlayerSelection = (player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter(p => p !== player));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  // Generate teams (logic can be updated later)
  const generateTeams = () => {
    if (selectedPlayers.length < 2) {
      setMessage('Select at least 2 players to generate teams.');
      return;
    }

    // Placeholder logic for splitting into two teams
    const midpoint = Math.ceil(selectedPlayers.length / 2);
    const team1 = selectedPlayers.slice(0, midpoint);
    const team2 = selectedPlayers.slice(midpoint);

    setTeams({ team1, team2 });
    setMessage('Teams generated successfully!');
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Team Divider</h1>

      {/* Add Player Form */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Add a Player</h2>
        <form onSubmit={handleAddPlayer} className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mr-2"
            required
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border p-2 mr-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Player</button>
        </form>
      </div>

      {/* Select Players */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Select Players</h2>
        <div className="border p-4">
          {players.map(player => (
            <div key={player.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedPlayers.includes(player)}
                onChange={() => togglePlayerSelection(player)}
                className="mr-2"
              />
              <span>{player.name} ({player.position})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Teams Button */}
      <div>
        <button
          onClick={generateTeams}
          className="bg-green-500 text-white px-4 py-2">
          Generate Teams
        </button>
      </div>

      {/* Display Teams */}
      {teams && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Generated Teams</h2>
          <div className="mb-4">
            <h3 className="text-xl font-bold">Team 1</h3>
            <ul>
              {teams.team1.map((player, index) => (
                <li key={index}>{player.name} ({player.position})</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">Team 2</h3>
            <ul>
              {teams.team2.map((player, index) => (
                <li key={index}>{player.name} ({player.position})</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Display Message */}
      {message && (
        <div className="mt-4 text-red-500">{message}</div>
      )}
    </div>
  );
};

export default AddPlayerForm;
