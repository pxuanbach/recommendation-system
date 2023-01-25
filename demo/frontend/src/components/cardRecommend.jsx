import React from "react";
import "./cardRecommend.css";


const CardRecommend = () => {
  return (
    <div className="container-card-recommend">
        <div className="card-recommend">
            <img src={require('../image/avata.jpg')} alt="movie pic" />
        </div>
        <div className="div-detail-recommend">
            <div className="name-movie-recommend">Avata: Dòng Chảy Của Nước</div>
            <div className="date-movie-recommend">14/12/2022</div>
        </div>
    </div>
)};

export default CardRecommend;
