import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/SignupForm.css";

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSignup = () => {
    setError('');
    setMessage('');
    setIsLoading(true);

    if (!username || !password || !confirmPassword) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    axios
      .post(`${apiUrl}/signup/`, { username, password })
      .then((response) => {
        setMessage('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        
        if (error.response?.data?.detail === 'User with this username already exists') {
          setError('This username is already taken. Please choose a different one.');
        } else {
          setError(error.response?.data?.detail || 'Signup failed. Please try again.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="signup-page">
      <form
        className="signup-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <h2>Sign Up</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default SignupForm;
