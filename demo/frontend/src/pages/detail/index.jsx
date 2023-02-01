import React, { useState, useEffect } from "react";
import "./index.css";
import PosterDetail from "../../components/poster-detail";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import CardCast from "../../components/cardCast";
import CardRecommend from "../../components/cardRecommend";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../services/httpService";
import { getMovieByIdEndPoint, getContentBasedRecommendEndPoint } from "../../services/endpointService";

const Detail = () => {
  const [value, setValue] = useState(5);
  const [isLoading, setIsloading] = useState(true);
  const [movie, setMovie] = useState();
  const [moviesRec, setMoviesRec] = useState([]);
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
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getMoviesRecommendations = async () => {
    try {
      const res = await axiosInstance.get(
        getContentBasedRecommendEndPoint({
          title: movie.title,
        })
      );
      const data = res.data;
      // console.log(data);
      setMoviesRec(data);
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  useEffect(() => {
    getMoviesRecommendations();
  }, [movie])

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
                      {movie.cast &&
                        movie.cast.map((cast) => (
                          <CardCast key={cast.id} cast={cast} />
                        ))}
                    </div>
                    {/* <div className="btn-view-full-cast">Full Cast & Crew</div> */}
                  </div>
                  <div className="div-list-cast">
                    <div className="title-body">Crew</div>
                    <div className="list-card-cast">
                      {movie.crew &&
                        movie.crew.map((crew) => (
                          <CardCast key={crew.id} cast={crew} isCast={false} />
                        ))}
                    </div>
                  </div>
                  <div className="div-list-cast">
                    <div className="title-body">Movie Content</div>
                    <p style={{ paddingTop: 10 }}>{movie.overview}</p>
                  </div>
                  <div className="div-list-cast">
                    <div className="title-body">Trailer</div>
                    <div className="div-trailer">
                      <img src={movie.backdrop_path} alt="movie pic" />
                    </div>
                  </div>
                  {/* <div className="div-list-cast">
                    <div className="title-body">Comment</div>
                  </div> */}
                  <div className="div-list-cast">
                    <div className="title-body">Recommendations</div>
                    <div className="list-card-cast">
                      {moviesRec && moviesRec.map((rec) => (
                        <CardRecommend key={rec.movieId} movie={rec}/>
                      ))}
                      {/* <CardRecommend />
                      <CardRecommend />
                      <CardRecommend />
                      <CardRecommend />
                      <CardRecommend /> */}
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
                    <div className="content-spec">{movie.original_title}</div>
                    <div className="title-spec">Status</div>
                    <div className="content-spec">{movie.status}</div>
                    <div className="title-spec">Original Language</div>
                    <div className="content-spec">{movie.language}</div>
                    <div className="title-spec">Budget</div>
                    <div className="content-spec">
                      {movie.budget
                        ? `$${new Intl.NumberFormat().format(movie.budget)}`
                        : "-"}
                    </div>
                    <div className="title-spec">Revenue</div>
                    <div className="content-spec">
                      {movie.revenue
                        ? `$${new Intl.NumberFormat().format(movie.revenue)}`
                        : "-"}
                    </div>
                    <div className="title-spec">Keywords</div>
                    <div className="div-keyword">
                      {movie.keywords &&
                        movie.keywords.map((keyword) => (
                          <div key={keyword.id} className="keyword">
                            {keyword.name}
                          </div>
                        ))}
                      {/* <div className="keyword">fairy tale</div>
                      <div className="keyword">talking dog</div>
                      <div className="keyword">spin off</div>
                      <div className="keyword">aftercreditsstinger</div>
                      <div className="keyword">talking cat</div>
                      <div className="keyword">fear of death</div> */}
                    </div>
                    {/* <div className="title-spec">Content Score</div>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                        padding: 0.5,
                        paddingLeft: 0,
                        paddingTop: 1,
                      }}
                    >
                      <Rating name="read-only" value={value} readOnly />
                    </Box> */}
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
