import React, {useState, useEffect} from "react";
import './index.css'
import Card from "../../components/card.jsx"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '5',
  },
  {
    value: 20,
    label: '6',
  },
  {
    value: 40,
    label: '7',
  },
  {
    value: 60,
    label: '8',
  },
  {
    value: 80,
    label: '9',
  },
  {
    value: 100,
    label: '10',
  },
];
function valuetext(value) {
  return `${value}`;
}
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

      <div className="div-score">
        <div className="title-body">Recommended movie number</div>
        <Box sx={{ width: 600, marginLeft: 2, marginTop: 2 }}>
        <Slider
          aria-label="Custom marks"
          defaultValue={30}
          getAriaValueText={valuetext}
          step={20}
          // valueLabelDisplay="auto"
          marks={marks}
        />
      </Box>
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
