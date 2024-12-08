import React from 'react';
import '../styles/TeamList.css'; // Ensure to import the updated styles

const TeamList = ({ teams }) => {
  return (
    <div className="team-container">
      <div className="team">
        <h3 className="team-header">Team 1</h3>
        <ul>
          {teams.team1.map((player, index) => (
            <li key={index} className="player">
              {player}
            </li>
          ))}
        </ul>
      </div>
      <div className="team">
        <h3 className="team-header">Team 2</h3>
        <ul>
          {teams.team2.map((player, index) => (
            <li key={index} className="player">
              {player}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamList;
