import React from "react";
import "./index.css"
import PosterDetail from "../../components/poster-detail";

const Detail = () => {
  return(
    <div style={{width: "100%"}}>
      <PosterDetail/>
      <div className="container">
        <div className="body">
          <div className="title-body">Top Billed Cast</div>
        </div> 
      </div>
    </div>
  )
};

export default Detail;
