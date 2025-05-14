import React from "react";

export default function WeatherCard({ weatherData }) {
  return (
    <div key={weatherData.id} className="weather-card">
      <h1>{weatherData.CityName}</h1>
      <h2>{weatherData.Country}</h2>
      <p>Humidity: {weatherData.Humidity}</p>
      <p>Temperature: {weatherData.Temperature}</p>
    </div>
  );
}
