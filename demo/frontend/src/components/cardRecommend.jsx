import React from "react";
import "./cardRecommend.css";
import dayjs from "dayjs";
import { Link, Navigate } from "react-router-dom";

const CardRecommend = ({ movie }) => {
  return (
    <Navigate to={`/movies/${movie.movieId}`} className="container-card-recommend">
      <div className="card-recommend">
        <img src={movie.backdrop_path} alt="movie pic" />
      </div>
      <div className="div-detail-recommend">
        <div className="name-movie-recommend">{movie.title}</div>
        <div className="date-movie-recommend">
          {dayjs(movie.release_date).format("DD/MM/YYYY")}
        </div>
      </div>
    </Navigate>
  );
};

export default CardRecommend;
