// src/components/TeamList.js
import React from 'react';

const TeamList = ({ teams }) => {
  return (
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
  );
};

export default TeamList;
