import React from "react";
import "./index.css"
import Sort from "../../components/sort.jsx"
import Filter from "../../components/filter.jsx"
import CardMovies from "../../components/cardMovies";

const Movies = () => {
  return (
    <div className="container">
      <div className="body">
        <h1 className="title-movies">Popular Movies</h1>
        <div className="body-movies">
          <div className="div-left">
            <div className="div-sort">
              <h2 className="title-sort">Sort</h2>
              <Sort/>
            </div>
            <div className="div-sort">
              <h2 className="title-sort">Filter</h2>
              <div className="div-filter">
                <Filter/>
              </div>
            </div>
          </div>

          <div className="div-right">
            <div className="body-right">
              <CardMovies/>
              <CardMovies/>
              <CardMovies/>
              <CardMovies/>
              <CardMovies/>
              <CardMovies/>
              <CardMovies/>
              <CardMovies/>
              <CardMovies/>
              <CardMovies/>
              <CardMovies/>
              <CardMovies/>
              <CardMovies/>
              <CardMovies/>
            </div>
          </div>
        </div>
      </div>
    </div>
)};

export default Movies;
