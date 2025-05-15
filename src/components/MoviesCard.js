import React from "react";
import "../styles.css";

export default function MoviesCard({ movie, iswatchListed, toggleWatchList }) {
  const handleError = (e) => {
    e.target.src = "images/default.jpg"; // Set a default image if the original fails to load
  };

  // Function to determine the class based on rating
  // This function takes a rating as an argument and returns a class name based on the rating value
  const getRatingClass = (rating) => {
    if (rating >= 8) return "rating-good";
    else if (rating >= 5) return "rating-ok";
    else return "rating-bad";
  };

  return (
    <div key={movie.id} className="movie-card">
      <img
        src={`images/${movie.image}`}
        alt={movie.title}
        onError={handleError}
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div>
          <span className="movie-card-genre">{movie.genre}</span>
          <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>
        <p>{movie.description}</p>
        <label className="switch">
          <input type="=checkbox"></input>
          <span className="slider">
            <span className="slider-label">
              {iswatchListed ? "In WatchList" : "Add to WatchList"}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
//
