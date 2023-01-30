import React, { useState, useEffect } from "react";
import "./index.css";
import Card from "../../components/card.jsx";
import GenreCard from "../../components/genreCard";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from '@mui/material/Stack';
import axiosInstance from "../../services/httpService";
import {
  getRatedGenresOfUserEndPoint,
  getContentBasedRecommendEndPoint,
  getModelBasedRecommendEndPoint,
} from "../../services/endpointService";

const marks = [
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
];
function valuetext(value) {
  return `${value}`;
}
const Home = () => {
  const userId = 318
  const [numItems, setNumItems] = useState(7);
  const [genreWatched, setGenreWatched] = useState([]);
  const [contentBasedRec, setContentBasedRec] = useState([]);
  const [modelBasedRec, setModelBasedRec] = useState([]);

  const getGenreWatched = async () => {
    try {
      const res = await axiosInstance.get(
        getRatedGenresOfUserEndPoint({
          userId: userId,
        })
      );
      let data = res.data.data;
      const sortedData = data.sort((a, b) => b.count - a.count)
      setGenreWatched(sortedData);
    } catch (err) {
      console.log(err);
    }
  };

  const getContentBasedRecommend = async () => {
    try {
      const res = await axiosInstance.get(
        getContentBasedRecommendEndPoint({
          userId: userId,
          numItems: numItems,
        })
      );
      const data = res.data;
      // console.log(data);
      setContentBasedRec(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getModelBasedRecommend = async () => {
    try {
      const res = await axiosInstance.get(
        getModelBasedRecommendEndPoint({
          userId: userId,
          numItems: numItems,
        })
      );
      const data = res.data;
      // console.log(data);
      setModelBasedRec(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGenreWatched();
  }, [])

  useEffect(() => {
    getContentBasedRecommend();
    getModelBasedRecommend();
  }, [numItems]);

  return (
    <div className="container">
      <div className="body">
        <div className="div-search">
          <h2 className="title">Welcome.</h2>
          <h3 className="title-1">
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
          <div className="search">
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Search for a movie, tv show, person,..."
            />
            <div className="btn-search">Search</div>
          </div>
        </div>
        <div className="div-score">
          <div className="title-body">Movie genre watched</div>
          <div style={{
            display: 'flex',
            width: '100%', 
            flexWrap: 'wrap',
            gap: '0px 12px'
          }}>
            {genreWatched && genreWatched.map((genre, index) => (
              <GenreCard key={index} genre={genre}/>
            ))}
          </div>
        </div>
        <div className="div-score">
          <div className="title-body">Recommended movie number</div>
          <Box sx={{width: 800, marginLeft: 2, marginTop: 2 }}>
            <Slider
              value={numItems}
              onChangeCommitted={(_, v) => setNumItems(v)}
              aria-label="Custom marks"
              defaultValue={7}
              getAriaValueText={valuetext}
              step={1}
              // valueLabelDisplay="auto"
              marks={marks}
              min={5}
              max={10}
            />
          </Box>
        </div>

        <div className="popular-film">
          <div className="title-body">Content Based</div>
          <div className="div-item">
            {contentBasedRec &&
              contentBasedRec.map((rec) => (
                <Card key={rec.movieId} recommend={rec} />
              ))}
          </div>
        </div>

        {/* <div className="banner">

      </div> */}
        <div className="popular-film">
          <div className="title-body">Model Based</div>
          <div className="div-item">
            {modelBasedRec &&
              modelBasedRec.map((rec) => (
                <Card key={rec.movieId} recommend={rec} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
