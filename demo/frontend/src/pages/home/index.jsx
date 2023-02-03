import React, { useState, useEffect, useContext } from "react";
import "./index.css";
import Card from "../../components/card.jsx";
import GenreCard from "../../components/genreCard";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from '@mui/material/Stack';
import axiosInstance from "../../services/httpService";
import {
  getRatedGenresOfUserEndPoint,
  getContentBasedUserIdRecommendEndPoint,
  getModelBasedUserRecommendEndPoint,
} from "../../services/endpointService";
import { UserContext } from "../../UserContext";

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
  {
    value: 11,
    label: "11",
  },
  {
    value: 12,
    label: "12",
  },
  {
    value: 13,
    label: "13",
  },
  {
    value: 14,
    label: "14",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 16,
    label: "16",
  },
  {
    value: 17,
    label: "17",
  },
  {
    value: 18,
    label: "18",
  },
  {
    value: 19,
    label: "19",
  },
  {
    value: 20,
    label: "20",
  },
];
function valuetext(value) {
  return `${value}`;
}
const Home = () => {
  const {user } = useContext(UserContext)
  const [numItems, setNumItems] = useState(10);
  const [genreWatched, setGenreWatched] = useState([]);
  const [contentBasedRec, setContentBasedRec] = useState([]);
  const [modelBasedRec, setModelBasedRec] = useState([]);

  const getGenreWatched = async () => {
    try {
      const res = await axiosInstance.get(
        getRatedGenresOfUserEndPoint({
          userId: user.userId,
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
        getContentBasedUserIdRecommendEndPoint({
          userId: user.userId,
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
        getModelBasedUserRecommendEndPoint({
          userId: user.userId,
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
          <Box fullWidth sx={{marginX: 2, marginTop: 2 }}>
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
              max={20}
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

        <div className="banner"></div>
        
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
