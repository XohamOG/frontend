import React, { useState } from 'react';
import axios from 'axios';

const AddPlayerForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPlayer = {
      name: name,
      position: position,
    };

    axios.post('http://localhost:8000/api/players/', newPlayer)
      .then(response => {
        setSuccess('Player added successfully!');
        setName('');
        setPosition('');
      })
      .catch(error => {
        setError('Error adding player: ' + error.message);
      });
  };

  return (
    <div>
      <h2>Add a New Player</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Position: </label>
          <input 
            type="text" 
            value={position} 
            onChange={(e) => setPosition(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Player</button>
      </form>

      {success && <div>{success}</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default AddPlayerForm;
