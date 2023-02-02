import axios from "axios";

export function extractTopMovie(recommendations, MOVIES_BY_ID, count) {
  recommendations = recommendations.filter(
    (recommendation) => MOVIES_BY_ID[recommendation.movieId]
  );

  recommendations = recommendations.map((mr) => ({
    movie: MOVIES_BY_ID[mr.movieId],
    score: mr.score,
    posterPath: MOVIES_BY_ID[mr.movieId].posterPath,
  }));

  return recommendations.slice(0, count);
}

export function getFilmDetail(movies, links) {
  return movies.map((movieItem) => {
    const themeId = getThemeByMovieId(movieItem.movie.movieId, links);
    return getApiDetailFilm(themeId);
  });
}

export function getThemeByMovieId(movieId, links) {
  return links.find((link) => {
    return link.movieId == movieId;
  }).tmdbId;
}

async function getApiDetailFilm(themeMovieId) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${themeMovieId}?api_key=840ea034bc52334a273a5c37067c860b&language=en-US`;
  let res = await axios.get(apiUrl);
  const data = res.data;
  let dataRes = {
    overview: data["overview"],
    poster_path: "https://image.tmdb.org/t/p/w500/" + data["poster_path"],
    backdrop_path: "https://image.tmdb.org/t/p/w1280/" + data["backdrop_path"],
    release_date: data["release_date"],
    runtime: data["runtime"],
    original_title: data["original_title"],
    status: data["status"],
    vote_average: data["vote_average"],
    vote_count: data["vote_count"],
    budget: data["budget"],
    tmdb_id: data["id"],
    revenue: data["revenue"],
  };
  return dataRes;
}
