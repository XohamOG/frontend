import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Get the API URL from environment variables
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const ApiComponent = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch players from the API
    axios.get(`${apiUrl}/api/players/`)
      .then(response => {
        setPlayers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // Show loading message or spinner
  if (loading) {
    return <div>Loading players...</div>;
  }

  // Show error message with retry button
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Players List</h1>
      <ul>
        {players.length === 0 ? (
          <p>No players found.</p>
        ) : (
          players.map(player => (
            <li key={player.id}>
              {player.name} - {player.position}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ApiComponent;
