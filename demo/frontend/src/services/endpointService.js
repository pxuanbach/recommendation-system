const prefix = "/api";

const getRatedGenresOfUserEndPoint = (param) => `${prefix}/users/${param.userId}/genres`

const getContentBasedRecommendEndPoint = (param) =>
  `${prefix}/recommend/content-based/${param.userId}?num_items=${param.numItems || 10
  }`;

const getModelBasedRecommendEndPoint = (param) =>
  `${prefix}/recommend/model-based/${param.userId}?num_items=${param.numItems || 10
  }`;

const getMovieByIdEndPoint = (param) => `${prefix}/movies/${param.movieId}`

export {
  getRatedGenresOfUserEndPoint,
  getContentBasedRecommendEndPoint,
  getModelBasedRecommendEndPoint,
  getMovieByIdEndPoint,
}