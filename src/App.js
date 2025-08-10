import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

// Get API key from environment variable
const API_KEY = process.env.REACT_APP_API_KEY; 
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);

      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading weather data...</p>}
      {error && <p className="error">{error}</p>}

      <WeatherCard weatherData={weatherData} />
    </div>
  );
}

export default App;