import React, { useEffect, useState } from "react";
import "../styles.css";
import WeatherCard from "./WeatherCard";
import WeatherHeader from "./WeatherHeader";

export default function WeatherInformation() {
  const [weather, setWeather] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [temperature, setTemperature] = useState("All");
  const [humidity, setHumidity] = useState("All");

  useEffect(() => {
    // fetch the weather data from json file
    fetch("weatherInformation.json")
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, []);

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const handleHumidityChange = (e) => {
    setHumidity(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const matchesTemperature = (weather, temperature) => {
    debugger;
    return (
      temperature === "All" ||
      (temperature === "Hot" && parseInt(weather.Temperature) > 30) ||
      (temperature === "Cold" && parseInt(weather.Temperature) < 15) ||
      (temperature === "Warm" &&
        parseInt(weather.Temperature) >= 15 &&
        parseInt(weather.Temperature) <= 30)
    );
  };

  const matchSearchTerm = (weather, searchTerm) => {
    return weather.CityName.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredWeather = weather.filter((weather) => {
    return (
      matchesTemperature(weather, temperature) &&
      matchSearchTerm(weather, searchTerm)
    );
  });

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search Weather"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Temperature</label>
          <select
            className="filter-dropdown"
            value={temperature}
            onChange={handleTemperatureChange}
          >
            <option>All</option>
            <option>Hot</option>
            <option>Cold</option>
            <option>Warm</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Humidity</label>
          <select
            className="filter-dropdown"
            value={humidity}
            onChange={handleHumidityChange}
          >
            <option>All</option>
            <option>High</option>
            <option>Low</option>
            <option>Medium</option>
          </select>
        </div>
      </div>

      <div className="weather-information">
        {filteredWeather.map((weatherData) => (
          <WeatherCard
            weatherData={weatherData}
            key={weatherData.id}
          ></WeatherCard>
        ))}
      </div>
    </div>
  );
}
