import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddPlayerForm from "./components/AddPlayerForm";
import ApiComponent from "./ApiComponent";
import TeamFormation from "./TeamFormation";
import SignupForm from './components/SignupForm';  // Import SignupForm
import LoginForm from './components/LoginForm';    // Import LoginForm
import Logout from './components/Logout';          // Import Logout

function App() {
  return (
    <Router>
       {/* Navigation Links */}
       <nav>
          <ul>
            <li><Link to="/">Home</Link></li>           {/* Link to HomePage */}
            <li><Link to="/signup">Signup</Link></li>   {/* Link to SignupPage */}
            <li><Link to="/login">Login</Link></li>     {/* Link to LoginPage */}
            <li><Link to="/logout">Logout</Link></li>   {/* Link to LogoutPage */}
          </ul>
        </nav>
      <div>
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/add-player" element={<AddPlayerForm />} />
          <Route path="/players" element={<ApiComponent />} />
          <Route path="/teams" element={<TeamFormation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
