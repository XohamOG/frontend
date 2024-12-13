import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LogoutForm.css";

const LogoutPage = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session and navigate to login
    onLogout();
    navigate('/login');
  };

  return (
    <div className="login-page logout-page">
      <div className="login-form">
        <h2>Goodbye!</h2>
        <p className="logout-message">You have been logged out successfully.</p>
        <button className="logout-button" onClick={handleLogout}>
          Log Back In
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
