import React, {useState, useEffect} from "react";
import './index.css'
import Card from "../../components/card.jsx"

const Home = () => {
  const [contentBasedRec, setContentBasedRec] = useState([])

  const getContentBasedRecommend = async () => {
    try {

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {

  }, [])

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

      <div className="popular-film">
        <div className="title-body">What's Popular</div>
        <div className="div-item">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>    

      {/* <div className="banner">

      </div> */}
      <div className="popular-film">
        <div className="title-body">Content Based</div>
        <div className="div-item">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>    
      <div className="popular-film">
        <div className="title-body">Trending</div>
        <div className="div-item">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>    
    </div>
  </div>

)};

export default Home;
