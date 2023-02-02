const prefix = "/api";

const getRatedGenresOfUserEndPoint = (param) =>
  `${prefix}/users/${param.userId}/genres`;

const getContentBasedRecommendEndPoint = (param) =>
  `${prefix}/recommend/content-based/?title=${param.title}&num_items=${
    param.numItems || 10
  }`;

const getContentBasedUserIdRecommendEndPoint = (param) =>
  `${prefix}/recommend/content-based/${param.userId}?num_items=${
    param.numItems || 10
  }`;

const getModelBasedUserRecommendEndPoint = (param) =>
  `${prefix}/recommend/model-based/users/${param.userId}?num_items=${
    param.numItems || 10
  }`;

const getMoviesEndPoint = (param) => {
  let path = `${prefix}/movies?skip=${param.skip}&limit=${param.limit}&show_type=${param.showType || "all"}`
  if (param.userId) path = path + `&user_id=${param.userId}`
  if (param.genres) {
    param.genres.forEach(genre => {
      path = path + `&genres=${genre}`
    })
  }
  return path
};

const getMovieByIdEndPoint = (param) => `${prefix}/movies/${param.movieId}`;

const getUserByIdEndPoint = (param) => `${prefix}/users/${param.userId}`;

const getGenresEndPoint = (param) => `${prefix}/genres`

const getUserBasedEndPoint = (param) =>
  `http://localhost:5000/api/v1/predict-user-based/${param.userId}?count=${
    param.numItems || 10
  }`;
const getItemBasedEndPoint = (param) =>
  `http://localhost:5000/api/v1/predict-item-based/${param.userId}?count=${
    param.numItems || 10
  }`;
export {
  getRatedGenresOfUserEndPoint,
  getContentBasedRecommendEndPoint,
  getContentBasedUserIdRecommendEndPoint,
  getModelBasedUserRecommendEndPoint,
  getMoviesEndPoint,
  getMovieByIdEndPoint,
  getUserByIdEndPoint,
  getUserBasedEndPoint,
  getItemBasedEndPoint,
  getGenresEndPoint
};
