import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

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

    // Get the body element to change its class
    const body = document.body;
    body.className = ''; // Reset class initially

    try {
      const response = await fetch(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      
      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }
      
      const data = await response.json();
      setWeatherData(data);
      
      // Update body class based on weather condition
      const condition = data.weather[0].main;
      switch (condition) {
        case 'Clear':
          body.className = 'theme-clear';
          break;
        case 'Clouds':
          body.className = 'theme-clouds';
          break;
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
          body.className = 'theme-rain';
          break;
        case 'Snow':
          body.className = 'theme-snow';
          break;
        default:
          body.className = 'theme-default';
          break;
      }

    } catch (err) {
      setError(err.message);
      document.body.className = 'theme-default'; // Reset on error
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

  // Set a default theme when the app first loads
  useEffect(() => {
    document.body.className = 'theme-default';
  }, []);

  return (
    <div className="App">
      <h1>SkyCast</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name..."
        />
        <button type="submit">Search</button>
      </form>
      
      {loading && <p className="loading">Loading weather data...</p>}
      {error && <p className="error">{error}</p>}
      
      <WeatherCard weatherData={weatherData} />
    </div>
  );
}

export default App;