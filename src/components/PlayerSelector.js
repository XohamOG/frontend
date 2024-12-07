import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const PlayerSelector = ({ setSelectedPlayers }) => {
  const [players, setPlayers] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  // Fetch players from the API
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/players/')
      .then((response) => {
        const allPlayers = response.data;
        setPlayers(allPlayers);
        setFilteredPlayers(allPlayers); // Initially show all players
      })
      .catch((error) => {
        console.error('Error fetching players:', error);
      });
  }, []);

  // Filter players based on selected positions
  useEffect(() => {
    if (selectedPositions.length === 0) {
      setFilteredPlayers(players); // Show all players if no positions are selected
    } else {
      const filtered = players.filter(player =>
        selectedPositions.includes(player.position)
      );
      setFilteredPlayers(filtered); // Show only players that match the selected positions
    }
  }, [selectedPositions, players]);

  const handlePositionChange = (e) => {
    const value = e.target.value;
    setSelectedPositions((prev) =>
      prev.includes(value) ? prev.filter((pos) => pos !== value) : [...prev, value]
    );
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Position Selector */}
      <h2>Select Positions</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {['Attacker', 'Defender', 'Goalkeeper'].map((position) => (
          <div
            key={position}
            onClick={() => handlePositionChange({ target: { value: position } })}
            style={{
              padding: '10px 20px',
              backgroundColor: selectedPositions.includes(position) ? '#007BFF' : '#ddd',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            {position}
          </div>
        ))}
      </div>

      {/* Select Players */}
      <h2>Select Players</h2>
      <Select
        options={filteredPlayers.map((player) => ({
          value: player.id,
          label: `${player.name} (${player.position})`,
        }))}
        onChange={(selectedOptions) => setSelectedPlayers(selectedOptions || [])}
        placeholder="Search and select players..."
        isMulti
      />
    </div>
  );
};

export default PlayerSelector;
