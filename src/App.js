import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddPlayerForm from './AddPlayerForm';
import ApiComponent from './ApiComponent';
import TeamFormation from './TeamFormation';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add-player">Add Player</Link>
          <Link to="/players">Players List</Link>
          <Link to="/teams">Generate Teams</Link>
        </nav>

        {/* Use Routes instead of Switch */}
        <Routes>
          <Route path="/" element={<h1>Welcome to the Team Generator</h1>} />
          <Route path="/add-player" element={<AddPlayerForm />} />
          <Route path="/players" element={<ApiComponent />} />
          <Route path="/teams" element={<TeamFormation players={[]} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
