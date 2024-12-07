import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddPlayerForm from "./components/AddPlayerForm";
import ApiComponent from "./ApiComponent";
import TeamFormation from "./TeamFormation";
import "./App.css"; // Include the CSS

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/add-player" className="nav-link">Add Player</Link>
          <Link to="/players" className="nav-link">Players List</Link>
          <Link to="/teams" className="nav-link">Generate Teams</Link>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-player" element={<AddPlayerForm />} />
          <Route path="/players" element={<ApiComponent />} />
          <Route path="/teams" element={<TeamFormation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
