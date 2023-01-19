import React from "react";
import "./index.css"
import PosterDetail from "../../components/poster-detail";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const Detail = () => {
  const [value, setValue] = React.useState(5);
  return(
    <div style={{width: "100%"}}>
      <PosterDetail/>
      <div className="container">
        <div className="body">
          <div className="div-left-detail-movie">
            <div className="title-body">Top Billed Cast</div>
          </div>

          <div className="div-right-detail-movie">
            <div className="div-list-icon">
              <div className="list-icon-social">
                <i class="fab fa-facebook-square"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-instagram"></i>
              </div>
              <i class="far fa-link"></i>
            </div>
            <div className="div-spec-detail-movie">
              <div className="title-spec">Original Title</div>
              <div className="content-spec">Puss in Boots: The Last Wish</div>
              <div className="title-spec">Status</div>
              <div className="content-spec">Released</div>
              <div className="title-spec">Original Language</div>
              <div className="content-spec">Tiếng Anh</div>
              <div className="title-spec">Budget</div>
              <div className="content-spec">$90,000,000.00</div>
              <div className="title-spec">Revenue</div>
              <div className="content-spec">$254,000,000.00</div>
              <div className="title-spec">Keywords</div>
              <div className="div-keyword">
                <div className="keyword">fairy tale</div>
                <div className="keyword">talking dog</div>
                <div className="keyword">spin off</div>
                <div className="keyword">aftercreditsstinger</div>
                <div className="keyword">talking cat</div>
                <div className="keyword">fear of death</div>
              </div>
              <div className="title-spec">Content Score</div>
              <Box
                  sx={{
                      '& > legend': { mt: 2 }, padding: 0.5, paddingLeft: 0 , paddingTop: 1
                  }}
                  >
                      <Rating name="read-only" value={value} readOnly />
                  </Box>
            </div>
          </div>
        </div> 
      </div>
    </div>
  )
};

export default Detail;
