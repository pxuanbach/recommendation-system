import React from "react";
import "./genreCard.css";

const GenreCard = ({ genre }) => {
  return (
    <div className="genres-card">
      <div className="genres-card-content">{genre.name}</div>
      <div className="genres-card-count">{genre.count}</div>
    </div>
  );
};

export default GenreCard;
