import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; // you should replace this with yours

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  async function fetchMyAPI() {
    let response = await axios.get(MOVIE_API_URL);
    setMovies(response.data.Search);
    setLoading(false);
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  const search = async searchValue => {
    setLoading(true);
    setErrorMessage(null);

    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`
    );
    if (response.data.Response === "True") {
      setMovies(response.data.Search);
      setLoading(false);
    } else {
      setErrorMessage(response.data.Error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header text="Ekin Alcar Movie Search" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
