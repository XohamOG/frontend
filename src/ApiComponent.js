import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the Django API
    axios.get('http://localhost:8000/api/players/')
      .then(response => {
        setData(response.data);  // Store the data from the response in the state
        setLoading(false);        // Update the loading state
      })
      .catch(error => {
        setError(error);          // If there's an error, set it in the error state
        setLoading(false);        // Update the loading state
      });
  }, []); // Empty dependency array means it runs only once after component mounts

  if (loading) {
    return <div>Loading...</div>;  // Show loading indicator while data is being fetched
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // Show error message if something goes wrong
  }

  return (
    <div>
      <h1>Data from Django API</h1>
      <ul>
        {/* Render the data fetched from the API */}
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiComponent;
