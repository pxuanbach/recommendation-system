function prepareMovies(moviesMetaData) {
  let MOVIES_IN_LIST = zip(moviesMetaData);
  let MOVIES_BY_ID = MOVIES_IN_LIST.reduce(byId, {});

  return {
    MOVIES_BY_ID,
    MOVIES_IN_LIST,
  };
}

export function byId(moviesById, movie) {
  moviesById[movie.movieId] = movie;
  return moviesById;
}

export function zip(movies) {
  return Object.keys(movies).map((mId) => ({
    ...movies[mId],
  }));
}

export default prepareMovies;
