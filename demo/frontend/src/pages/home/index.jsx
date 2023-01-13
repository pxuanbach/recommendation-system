import React from "react";
import './index.css'
const Home = () => {
  return ( 
  <div className="container">
    <div className="body">
      <div className="div-search">
        <h2 className="title">Welcome.</h2>
        <h3 className="title-1">Millions of movies, TV shows and people to discover. Explore now.</h3>
        <div className="search">
          <input className="input" type="text" name="name" placeholder="Search for a movie, tv show, person,..." />
          <div className="btn-search">
            Search
          </div>

        </div>
      </div>
    </div>
  </div>

)};

export default Home;
