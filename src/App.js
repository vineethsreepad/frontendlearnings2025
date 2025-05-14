import "./App.css";
import React, { usesState, useEffect, useState } from "react";
import "./styles.css";
import WatchList from "./components/WatchList"; // Import the WatchList component
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid"; // Import the MoviesGrid component
import WeatherGrid from "./components/WeatherGrid";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import WeatherHeader from "./components/WeatherHeader";

function App() {
  const [movies, setMovies] = useState([]); // Movies data
  const [watchlist, setWatchList] = useState([]); // Watchlist data

  useEffect(() => {
    // Fetch the data from the API
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  // This is little complicated
  const toggleWatchList = (movieId) => {
    setWatchList((prev) =>
      prev.incluedes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };
  return (
    <div className="App">
      <div className="container">
        <Router>
          {window.location.pathname === "/" ||
          window.location.pathname === "/watchlist" ? (
            <Header></Header>
          ) : (
            <WeatherHeader></WeatherHeader>
          )}
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/weather">Weather</Link>
              </li>
              <li>
                <Link to="/watchlist">Watch List</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <MoviesGrid
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchList={toggleWatchList}
                ></MoviesGrid>
              }
            ></Route>
            <Route
              path="/watchlist"
              element={
                <WatchList
                  watchlist={watchlist}
                  movies={movies}
                  toggleWatchList={toggleWatchList}
                ></WatchList>
              }
            ></Route>
            <Route
              path="/weather"
              element={<WeatherGrid></WeatherGrid>}
            ></Route>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
