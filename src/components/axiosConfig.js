import axios from 'axios';

// Create an axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Use your API base URL
  headers: {
    'Content-Type': 'application/json', // Default header for JSON API
  },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiry or invalid token
      localStorage.removeItem('authToken'); // Clear token
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiClient;
