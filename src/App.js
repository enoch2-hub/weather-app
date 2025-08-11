import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [themeClass, setThemeClass] = useState('theme-default');

  const getThemeClass = (condition) => {
    switch (condition) {
      case 'Clear':
        return 'theme-clear';
      case 'Clouds':
        return 'theme-clouds';
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm':
        return 'theme-rain';
      case 'Snow':
        return 'theme-snow';
      default:
        return 'theme-default';
    }
  };

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setThemeClass('theme-default'); // Reset theme when new search begins

    try {
      const response = await fetch(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      
      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setThemeClass(getThemeClass(data.weather[0].main));
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
    <div className={`App ${themeClass}`}>
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