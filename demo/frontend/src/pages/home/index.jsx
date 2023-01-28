import React, { useState, useEffect } from "react";
import "./index.css";
import Card from "../../components/card.jsx";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import axiosInstance from "../../services/httpService";
import {
  getContentBasedRecommendEndPoint,
  getModelBasedRecommendEndPoint,
} from "../../services/endpointService";

const marks = [
  {
    value: 0,
    label: "5",
  },
  {
    value: 20,
    label: "6",
  },
  {
    value: 40,
    label: "7",
  },
  {
    value: 60,
    label: "8",
  },
  {
    value: 80,
    label: "9",
  },
  {
    value: 100,
    label: "10",
  },
];
function valuetext(value) {
  return `${value}`;
}
const Home = () => {
  const [contentBasedRec, setContentBasedRec] = useState([]);
  const [modelBasedRec, setModelBasedRec] = useState([]);

  const getContentBasedRecommend = async () => {
    try {
      const res = await axiosInstance.get(
        getContentBasedRecommendEndPoint({
          userId: 5,
          numItems: 10,
        })
      );
      const data = res.data;
      console.log(data);
      setContentBasedRec(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getModelBasedRecommend = async () => {
    try {
      const res = await axiosInstance.get(
        getModelBasedRecommendEndPoint({
          userId: 5,
          numItems: 10,
        })
      );
      const data = res.data;
      console.log(data);
      setModelBasedRec(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContentBasedRecommend();
    getModelBasedRecommend();
  }, []);

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
