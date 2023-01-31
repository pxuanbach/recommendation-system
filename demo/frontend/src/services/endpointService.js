const prefix = "/api";

const getRatedGenresOfUserEndPoint = (param) => `${prefix}/users/${param.userId}/genres`

const getContentBasedRecommendEndPoint = (param) =>
  `${prefix}/recommend/content-based/${param.userId}?num_items=${param.numItems || 10
  }`;

const getModelBasedRecommendEndPoint = (param) =>
  `${prefix}/recommend/model-based/${param.userId}?num_items=${param.numItems || 10
  }`;

const getMoviesEndPoint = (param) => {
  let path = `${prefix}/movies?skip=${param.skip}&limit=${param.limit}&show_type=${param.showType || "all"}`
  if (param.userId) path = path + `&user_id=${param.userId}`
  return path
}

const getMovieByIdEndPoint = (param) => `${prefix}/movies/${param.movieId}`

const getUserByIdEndPoint = (param) => `${prefix}/users/${param.userId}`

export {
  getRatedGenresOfUserEndPoint,
  getContentBasedRecommendEndPoint,
  getModelBasedRecommendEndPoint,
  getMoviesEndPoint,
  getMovieByIdEndPoint,
  getUserByIdEndPoint,
}