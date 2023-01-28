import React from "react";
import "./card.css";


const Card = ({recommend}) => {
  return (
    <div className="container-card">
        <img className="card" 
        src={recommend?.poster_path}/>
        <div className="div-detail">
            <div className="name-item">{recommend?.title}</div>
            <div className="time-item">{recommend?.release_date}</div>
        </div>
    </div>
)};

export default Card;
