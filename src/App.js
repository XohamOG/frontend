import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';  // Import SignupForm
import LoginForm from './components/LoginForm';    // Import LoginForm
import Logout from './components/Logout';          // Import Logout
import HomePage from './components/HomePage';      // Import HomePage
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle login success
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Links */}
        {isAuthenticated ? (
          <nav>
            <ul className="navbar">
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </nav>
        ) : null}

        {/* Define Routes */}
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={<LoginForm onLoginSuccess={handleLogin} />}
          />
          <Route path="/signup" element={<SignupForm />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={<Logout onLogout={handleLogout} />}
          />

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
