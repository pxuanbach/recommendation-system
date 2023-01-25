import React from "react";
import "./cardCast.css";


const CardCast = () => {
  return (
    <div className="container-card-cast">
        <div className="card-cast">
            <img src={require('../image/cast.jpg')} alt="movie pic" />
        </div>
        <div className="div-detail-cast">
            <div className="name-cast">Antonio Banderas</div>
            <div className="position-cast">Puss in Boots (voice)</div>
        </div>
    </div>
)};

export default CardCast;
