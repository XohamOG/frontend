import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import apiClient from '../components/axiosConfig';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/token/', {
        username,
        password,
      });

      const { access, refresh, username: user } = response.data; // Use fields returned by the JWT view
      localStorage.setItem("authToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("username", user);
      console.log("Login successful:", response.data);
      onLoginSuccess();
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Invalid credentials.');
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
        <a href="/signup">Don't have an account? Sign Up</a>
      </form>
    </div>
  );
};

export default LoginForm;
