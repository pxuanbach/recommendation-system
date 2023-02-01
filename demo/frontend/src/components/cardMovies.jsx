import React from "react";
import "./cardMovies.css";
import { Box, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const CardMovies = ({ showType, movie }) => {
  return (
    <Link to={`/movies/${movie.movieId}`} className="container-card-movies">
      <img src={movie.poster_path} className="poster-card-movies" />
      <div className="detail-card-movies">
        <div className="name-card-movies">{movie.title}</div>
        <div className="time-card-movies">
          {dayjs(movie.release_date).format("DD/MM/YYYY")}
        </div>
        {showType === "have" ? <Box
          sx={{
            "& > legend": { mt: 2 },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            marginBottom: 1
          }}
        >
          <Rating name="read-only" value={movie.rating} readOnly />
          {movie.rating}
        </Box> : <></>}
      </div>
    </Link>
  );
};

export default CardMovies;
