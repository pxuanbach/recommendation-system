import React, { useState, useEffect } from "react";
import "./index.css";
import PosterDetail from "../../components/poster-detail";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import CardCast from "../../components/cardCast";
import CardRecommend from "../../components/cardRecommend";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../services/httpService";
import { getMovieByIdEndPoint } from "../../services/endpointService";
import { processingRuntime } from "../../services/movieService";

const Detail = () => {
  const [value, setValue] = useState(5);
  const [isLoading, setIsloading] = useState(true);
  const [movie, setMovie] = useState();
  const { movieId } = useParams();

  const getMovieDetail = async () => {
    try {
      const res = await axiosInstance.get(
        getMovieByIdEndPoint({
          movieId: movieId,
        })
      );
      const data = res.data;
      // console.log(data);
      setMovie(data);
      setIsloading(false)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {isLoading ? (
        <></>
      ) : (
        <>
          <PosterDetail movie={movie} />
          <div className="container">
            <div className="body">
              <div style={{ display: "flex" }}>
                <div className="div-left-detail-movie">
                  <div className="div-list-cast">
                    <div className="title-body">Top Billed Cast</div>
                    <div className="list-card-cast">
                      <CardCast />
                      <CardCast />
                      <CardCast />
                      <CardCast />
                      <CardCast />
                      <CardCast />
                      <CardCast />
                      <CardCast />
                      <CardCast />
                    </div>
                    <div className="btn-view-full-cast">Full Cast & Crew</div>
                  </div>
                  <div className="div-list-cast">
                    <div className="title-body">Movie Content</div>
                    <p style={{ paddingTop: 10 }}>
                      Puss phát hiện ra rằng niềm đam mê phiêu lưu mạo hiểm của
                      anh đã gây ra hậu quả: Anh đã đốt cháy 8 trong số 9 mạng
                      sống của mình, bây giờ chỉ còn lại đúng một mạng. Anh ta
                      bắt đầu một cuộc hành trình để tìm Điều ước cuối cùng thần
                      thoại trong Rừng Đen nhằm khôi phục lại chín mạng sống của
                      mình. Chỉ còn một mạng sống, đây có lẽ sẽ là cuộc hành
                      trình nguy hiểm nhất của Puss.
                    </p>
                  </div>
                  <div className="div-list-cast">
                    <div className="title-body">Trailer</div>
                    <div className="div-trailer">
                      <img
                        src={require("../../image/trailer.jpeg")}
                        alt="movie pic"
                      />
                    </div>
                  </div>
                  <div className="div-list-cast">
                    <div className="title-body">Comment</div>
                  </div>
                  <div className="div-list-cast">
                    <div className="title-body">Recommendations</div>
                    <div className="list-card-cast">
                      <CardRecommend />
                      <CardRecommend />
                      <CardRecommend />
                      <CardRecommend />
                      <CardRecommend />
                    </div>
                  </div>
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
                    <div className="content-spec">
                      Puss in Boots: The Last Wish
                    </div>
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
                        "& > legend": { mt: 2 },
                        padding: 0.5,
                        paddingLeft: 0,
                        paddingTop: 1,
                      }}
                    >
                      <Rating name="read-only" value={value} readOnly />
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
