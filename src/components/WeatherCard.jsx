import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  // Make sure we have data before trying to display it
  if (!weatherData) {
    return null;
  }

  return (
    <div className="weather-card">
      <h2>{weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Condition: {weatherData.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
        alt={weatherData.weather[0].description}
      />
    </div>
  );
};

export default WeatherCard;