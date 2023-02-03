import React, { useState, useEffect, useContext } from "react";
import "./index.css";
import Sort from "../../components/sort.jsx";
import Filter from "../../components/filter.jsx";
import CardMovies from "../../components/cardMovies";
import axiosInstance from "../../services/httpService";
import { getMoviesEndPoint, getGenresEndPoint } from "../../services/endpointService";
import { UserContext } from "../../UserContext";

const Movies = () => {
  const { user } = useContext(UserContext);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genresSelected, setGenresSelected] = useState(new Set());
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(18);
  const [showType, setShowType] = useState("all");

  const handleChangeShowType = (value) => {
    // console.log(value)
    setIsLoadMore(false);
    setMovies([]);
    setShowType(value);
  };

  const handleSelectionChanged = (name) => {
    // treat state as immutable
    // React only does a shallow comparison so we need a new Set
    const newSet = new Set(genresSelected);
    if (newSet.has(name)) newSet.delete(name);
    else newSet.add(name);
    setIsLoadMore(false);
    setMovies([]);
    setGenresSelected(newSet);
  }

  const getMovies = async () => {
    try {
      const res = await axiosInstance.get(
        getMoviesEndPoint({
          skip: skip,
          limit: limit,
          showType: showType,
          userId: user?.userId,
          genres: genresSelected
        })
      );
      const data = res.data;
      if (data.page >= data.total_page) {
        setIsLoadMore(false);
      } else {
        setIsLoadMore(true);
      }
      const mergeMovies = movies.concat(data.data);
      setMovies(mergeMovies);
    } catch (err) {
      console.log(err);
    }
  };

  const getGenres = async () => {
    try {
      const res = await axiosInstance.get(
        getGenresEndPoint()
      );
      const data = res.data.genres;
      setGenres(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadMore = (e) => {
    e.preventDefault();
    setSkip(skip + limit);
  };

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    getMovies();
  }, [skip, showType, genresSelected])

  return (
    <div className="container">
      <div className="body">
        <h1 className="title-movies">Popular Movies</h1>
        <div className="body-movies">
          <div className="div-left">
            {/* <div className="div-sort">
              <h2 className="title-sort">Sort</h2>
              <Sort/>
            </div> */}
            <div className="div-sort">
              <h2 className="title-sort">Filter</h2>
              <div className="div-filter">
                <Filter
                  user={user}
                  handleChangeShowType={handleChangeShowType}
                  genres={genres}
                  handleSelectionChanged={handleSelectionChanged}
                  selected={genresSelected}
                />
              </div>
            </div>
          </div>

          <div className="div-right">
            <div className="body-right">
              {movies &&
                movies.map((movie) => (
                  <CardMovies
                    key={movie.movieId}
                    showType={showType}
                    movie={movie}
                  />
                ))}
            </div>
            {isLoadMore && <button onClick={handleLoadMore}>Load more</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
