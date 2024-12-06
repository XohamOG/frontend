import React, { useState } from 'react';
import axios from 'axios';


const TeamFormation = ({ players }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teams, setTeams] = useState(null);

  const handlePlayerSelect = (playerId) => {
    setSelectedPlayers((prevSelected) => {
      if (prevSelected.includes(playerId)) {
        return prevSelected.filter(id => id !== playerId);
      } else {
        return [...prevSelected, playerId];
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:8000/api/teams/', { selected_players: selectedPlayers })
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('Error generating teams:', error);
      });
  };

  return (
    <div>
      <h2>Generate Teams</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Select Players: </label>
          <div>
            {players.map(player => (
              <div key={player.id}>
                <input 
                  type="checkbox" 
                  checked={selectedPlayers.includes(player.id)} 
                  onChange={() => handlePlayerSelect(player.id)} 
                />
                {player.name} - {player.position}
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Generate Teams</button>
      </form>

      {teams && (
        <div>
          <h3>Team 1</h3>
          <ul>
            {teams.team1.map(player => (
              <li key={player}>{player}</li>
            ))}
          </ul>
          <h3>Team 2</h3>
          <ul>
            {teams.team2.map(player => (
              <li key={player}>{player}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamFormation;
