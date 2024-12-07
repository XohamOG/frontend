import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

const HomePage = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teams, setTeams] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all players from the API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/players/")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        setError("Error fetching players: " + error.message);
      });
  }, []);

  // Handle form submission to add a new player
  const handleAddPlayer = (e) => {
    e.preventDefault();
    const newPlayer = { name, position };

    axios
      .post("http://localhost:8000/api/players/", newPlayer)
      .then((response) => {
        setPlayers((prevPlayers) => [...prevPlayers, response.data]);
        setSuccess("Player added successfully!");
        setName("");
        setPosition("");
      })
      .catch((error) => {
        setError("Error adding player: " + error.message);
      });
  };

  // Handle team generation
  const handleGenerateTeams = () => {
    if (selectedPlayers.length < 2) {
      setError("Select at least 2 players to form teams.");
      return;
    }

    const shuffled = [...selectedPlayers].sort(() => 0.5 - Math.random());
    const midpoint = Math.ceil(shuffled.length / 2);

    setTeams({
      team1: shuffled.slice(0, midpoint),
      team2: shuffled.slice(midpoint),
    });
    setError("");
  };

  return (
    <div className="homepage">
      <h1 className="header">Team Formation App</h1>

      {/* Add Player Form */}
      <div className="add-player">
        <h2>Add a New Player</h2>
        <form onSubmit={handleAddPlayer}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Add Player
          </button>
        </form>
      </div>

      {/* Select Players */}
      <div className="select-players">
        <h2>Select Players</h2>
        {players.length > 0 ? (
          <ul>
            {players.map((player) => (
              <li key={player.id}>
                <label>
                  <input
                    type="checkbox"
                    value={player.id}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setSelectedPlayers((prevSelected) =>
                        isChecked
                          ? [...prevSelected, player]
                          : prevSelected.filter((p) => p.id !== player.id)
                      );
                    }}
                  />
                  {player.name} ({player.position})
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p>No players available. Add some to get started!</p>
        )}
      </div>

      {/* Generate Teams Button */}
      <button
        className="btn-secondary"
        onClick={handleGenerateTeams}
        disabled={players.length === 0}
      >
        Generate Teams
      </button>

      {/* Display Teams */}
      {teams && (
        <div className="teams">
          <div className="team">
            <h3>Team 1</h3>
            <ul>
              {teams.team1.map((player) => (
                <li key={player.id}>{player.name}</li>
              ))}
            </ul>
          </div>
          <div className="team">
            <h3>Team 2</h3>
            <ul>
              {teams.team2.map((player) => (
                <li key={player.id}>{player.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Feedback Messages */}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default HomePage;
