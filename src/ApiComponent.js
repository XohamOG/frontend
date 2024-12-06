import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiComponent = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/players/')
      .then(response => {
        setPlayers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Players List</h1>
      <ul>
        {players.map(player => (
          <li key={player.id}>{player.name} - {player.position}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiComponent;
