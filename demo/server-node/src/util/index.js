function getMovieIndexByTitle(MOVIES_IN_LIST, query) {
  const index = MOVIES_IN_LIST.map((movie) => movie.title).indexOf(query);

  if (!index) {
    throw new Error("Movie not found");
  }

  const { title, movieId } = MOVIES_IN_LIST[index];
  return { index, title, movieId };
}

export function addUserRating(userId, searchTitle, rating, MOVIES_IN_LIST) {
  const { movieId, title } = getMovieIndexByTitle(MOVIES_IN_LIST, searchTitle);

  return {
    userId,
    rating,
    movieId: movieId,
    title,
  };
}
