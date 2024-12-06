import React from 'react';

import ApiComponent from './ApiComponent';  // Correct path, assuming ApiComponent is in the same directory

function App() {
  return (
    <div className="App">
      <ApiComponent />  {/* Display the data from Django API */}
    </div>
  );
}

export default App;
