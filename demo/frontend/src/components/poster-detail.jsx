import React, { useEffect, useState } from "react";
import "./poster-detail.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { processingRuntime } from "../services/movieService";
import dayjs from "dayjs";

const PosterDetail = ({movie}) => {
  return (
    <div className="poster">
      <img src={movie.backdrop_path} alt="poster" />
      <div className="container-detail-movie">
        <div className="detail-movie">
          <div className="image-movie">
            <img src={movie.poster_path} alt="movie pic" />
          </div>
          <div className="content-movie">
            <div className="name-movie">
              {movie.title}
            </div>
            <div className="genre-movie">
              Genre: {movie.genres.replaceAll("|", ", ")}
            </div>
            <div className="date-start">Release Date: {dayjs(movie.release_date).format("DD/MM/YYYY")}</div>
            <div className="time">Duration: {processingRuntime(movie.runtime)}</div>
            <div className="rate-movie">
              Rating:
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                  padding: 0.5,
                  paddingLeft: 2,
                }}
              >
                <Rating name="read-only" value={movie.vote_average} readOnly />
              </Box>
              {movie.vote_average.toFixed(1)}
            </div>
            <div className="genre-movie">
              Vote Count: {movie.vote_count}
            </div>
            <div className="overview">
              Overview
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PosterDetail;
