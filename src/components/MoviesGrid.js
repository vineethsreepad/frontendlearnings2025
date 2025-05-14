import React, { usesState, useEffect, useState } from "react";
import "../styles.css";
import MovieCard from "./MoviesCard";
import Header from "./Header";

export default function MoviesGrid({ movies, watchList, toggleWatchList }) {
  // Grouped useState hooks for better organization

  const [searchTerm, setSearchTerm] = useState(""); // Search term

  // Filters
  const [genre, setGenre] = useState("All Genres");
  const [rating, SetRating] = useState("All");

  // The useEffect hook is used to perform side effects in function components
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // The handleSearchChange function is called when the user types in the search bar
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  // The handleGenreChange function is called when the user selects a genre from the dropdown
  const handleRatingChange = (e) => {
    SetRating(e.target.value);
  };

  // Match the Filters here

  const matchesGenre = (movie, genre) => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        return movie.rating >= 7;
      case "Ok":
        return movie.rating >= 4 && movie.rating < 7;
      case "Bad":
        return movie.rating < 4;
      default:
        return false;
    }
  };

  // The filteredMovies variable will contain the movies that match the search term
  const filteredMovies = movies.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchSearchTerm(movie, searchTerm) &&
      matchesRating(movie, rating)
  );

  // For each movie, we will create a card
  // and display the movie title, image, and description
  // We will use the map function to iterate over the movies array
  // and create a card for each movie
  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies.."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Filter bar */}

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre </label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Comedy</option>
            <option>Horror</option>
          </select>
        </div>

        <div className="filter-slot">
          <label>Rating </label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      {/* List the movies here */}

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
    </div>
  );
}
