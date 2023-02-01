import React from "react";
import "./cardCast.css";


const CardCast = ({cast, isCast=true}) => {
  return (
    <div className="container-card-cast">
        <div className="card-cast">
            <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face${cast.profile_path}`} alt="movie pic" />
        </div>
        <div className="div-detail-cast">
            <div className="name-cast">{cast.name}</div>
            <div className="position-cast">{isCast ? cast.character : cast.department}</div>
        </div>
    </div>
)};

export default CardCast;
