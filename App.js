import React, { useState } from 'react';
import './App1.css';

function App() {
  const [urls, setUrls] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setUrls(e.target.value);
  };

  const fetchNumbers = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8008/numbers?${urls}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setNumbers(data.numbers);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Number Management Service</h1>
      <h1>Enter the  number here</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter URLs separated by '&' (e.g., url=http://example.com&url=http://another.com)"
          value={urls}
          onChange={handleInputChange}
        />
        <button onClick={fetchNumbers}>Check Numbers</button>
      </div>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="number-list">
          <h2>Combine Unique Numbers</h2>
          <ul>
            {numbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;